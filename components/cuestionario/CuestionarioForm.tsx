"use client"
import { Cuestionario, CuestionarioCreate } from '@/models/Cuestionario'
import { CuestionarioService } from '@/services/CuestionarioService'
import { Button, Card, CardBody, CardHeader, Checkbox, Input, Textarea } from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { form } from 'framer-motion/client'
import React, { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { FaArrowDown, FaArrowUp, FaTrashAlt } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'
import LoadingBg from '../UI/LoadingBg'

type Props = {
    id?: string
}

type DatosForm = {
    titulo: string,
    descripcion: string,
    preguntas: {
        enunciado: string,
        orden: number,
        opciones: {
            texto: string,
            es_correcta: boolean
        }[]
    }[]
}

const CuestionarioForm = (
    {id}: Props
) => {
    const queryClient = useQueryClient();

    const {
        control,
        formState: {
            errors,
            isSubmitting
        },
        handleSubmit,
        setValue,
        getValues,
        setError
    } = useForm<DatosForm>({
        defaultValues: {
            titulo: '',
            descripcion: '',
            preguntas: []
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        criteriaMode: 'all',
        shouldFocusError: true
    });

    const {
        data: cuestionario,
        isFetching: isCuestionarioFetching
    } = useQuery({
        queryKey: ['cuestionario', id],
        queryFn: () => CuestionarioService.getCuestionario(Number(id)),
        enabled: !!id,
    })

    useEffect(() => {
        if (cuestionario) {
            fillForm(cuestionario);
        }
    }, [cuestionario])

    const {
        fields: preguntasFields,
        append: appendPregunta,
        remove: removePregunta,
        swap: movePregunta
    } = useFieldArray({
        control,
        name: 'preguntas',
        rules: {
            required: 'Este campo es requerido',
            validate: (value) => {
                if (value.length < 2) {
                    return 'Debe tener al menos dos preguntas';
                }
                return true;
            }
        }
    });

    const createCuestionario = useMutation({
        mutationFn: (body: CuestionarioCreate) => CuestionarioService.createCuestionario(body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['cuestionarios']
            });
            await queryClient.refetchQueries({
                queryKey: ['cuestionarios']
            });
        },
        onError: (error) => {
            console.error(error)
            setError('root', {
                type: 'manual',
                message: 'Ocurrió un error al guardar el cuestionario'
            })
        }
    });

    const updateCuestionario = useMutation({
        mutationFn: (body: CuestionarioCreate) => CuestionarioService.updateCuestionario(Number(id), body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['cuestionarios']
            });
            await queryClient.refetchQueries({
                queryKey: ['cuestionarios']
            });
        },
        onError: (error) => {
            console.error(error)
            setError('root', {
                type: 'manual',
                message: 'Ocurrió un error al guardar el cuestionario'
            })
        }
    });

    const onSubmitForm = async (data: DatosForm) => {
        const body: CuestionarioCreate = {
            ...data,
            fk_topico: 1,
            fk_usuario: 2
        }
        if (id) {
            await updateCuestionario.mutateAsync(body);
        } else {
            await createCuestionario.mutateAsync(body);
        }
    }

    const handleMovePregunta = (fromIndex: number, toIndex: number) => {
        movePregunta(fromIndex, toIndex);

        const preguntas = getValues('preguntas');
        const updatedPreguntas = preguntas.map((pregunta, index) => ({
            ...pregunta,
            orden: index + 1,
        }));

        setValue('preguntas', updatedPreguntas);
    };

    const fillForm = (cuestionario: Cuestionario) => {
        setValue('titulo', cuestionario.titulo);
        setValue('descripcion', cuestionario.descripcion);
        setValue('preguntas', cuestionario.preguntas.map((pregunta) => ({
            enunciado: pregunta.enunciado,
            orden: pregunta.orden,
            opciones: pregunta.opciones.map((opcion) => ({
                texto: opcion.texto,
                es_correcta: opcion.es_correcta
            }))
        })));
    }

    return (
        <Card className='relative'>
            <CardHeader>
                <div className='sticky top-20 flex justify-between items-center w-full'>
                    <p
                        className='text-2xl font-bold text-primary px-1'
                    >
                        {id ? 'Editar' : 'Crear'} cuestionario
                    </p>
                    <Button
                        onClick={() => appendPregunta({enunciado: '', orden: preguntasFields.length, opciones: []})}
                        className='bg-primary text-white'
                    >
                        Agregar pregunta <IoIosAdd className='text-2xl font-bold'/>
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <form noValidate onSubmit={handleSubmit(onSubmitForm)}
                    className='flex flex-col gap-4'
                >
                    <Controller
                        name="titulo"
                        control={control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label='Título'
                                placeholder='Título del cuestionario'
                                isInvalid={!!errors.titulo}
                                isRequired
                                errorMessage={errors.titulo?.message}
                                name={field.name}
                            />
                        )}
                    />
                    <Controller
                        name="descripcion"
                        control={control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field }) => (
                            <Textarea
                                label='Descripción'
                                placeholder='Descripción del cuestionario'
                                {...field}
                                name={field.name}
                                isInvalid={!!errors.descripcion}
                                errorMessage={errors.descripcion?.message}
                                isRequired
                            />
                        )}
                    />
                    <div className='flex flex-col gap-4'>   
                        {preguntasFields.map((pregunta, preguntaIndex) => {
                            return (
                                <PreguntaField
                                    key={pregunta.id}
                                    control={control}
                                    errors={errors}
                                    setValue={setValue}
                                    removePregunta={removePregunta}
                                    movePregunta={handleMovePregunta}
                                    preguntasFields={preguntasFields}
                                    preguntaIndex={preguntaIndex}
                                />
                            );
                        })}
                    </div>
                    {errors.root && (
                        <p className='text-red-500 text-sm'>
                            {errors.root.message}
                        </p>
                    )}
                    <Button
                        type='submit'
                        className='bg-primary text-white'
                        isLoading={isSubmitting}
                    >
                        Guardar
                    </Button>
                </form>
            </CardBody>
            <LoadingBg isLoading={isCuestionarioFetching} />
        </Card>
    )
}

type PreguntaFieldProps = {
    control: any,
    errors: any,
    setValue: any,
    removePregunta: any,
    movePregunta: any,
    preguntasFields: any,
    preguntaIndex: number
}

function PreguntaField(
    {
        control, 
        errors, 
        preguntaIndex,
        removePregunta,
        movePregunta,
        preguntasFields,
        setValue
    }: PreguntaFieldProps
) {
    const {
        fields: opcionesFields,
        append: appendOpcion,
        remove: removeOpcion
    } = useFieldArray({
        control,
        name: `preguntas.${preguntaIndex}.opciones`,
        rules: {
            required: 'Este campo es requerido',
            minLength: {
                value: 2,
                message: 'Debe tener al menos dos opciones'
            }
        }
    });

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <p className='typography-h2 px-1'>
                    Pregunta {preguntaIndex + 1}
                </p>
                <div className='flex gap-2'>
                    {
                        preguntaIndex !== 0 && (
                            <Button
                                className='bg-primary text-white'
                                onClick={() => movePregunta(preguntaIndex, preguntaIndex - 1)}
                            >
                                <FaArrowUp />
                            </Button>
                        )
                    }
                    {
                        (preguntaIndex !== preguntasFields.length - 1 && preguntasFields.length > 1) && (
                            <Button
                                className='bg-primary text-white'
                                onClick={() => movePregunta(preguntaIndex, preguntaIndex + 1)}
                            >
                                <FaArrowDown />
                            </Button>
                        )
                    }
                    <Button
                        color='danger'
                        onClick={() => removePregunta(preguntaIndex)}
                    >
                        <FaTrashAlt />
                    </Button>
                </div>
            </div>
            <Controller
                name={`preguntas.${preguntaIndex}.enunciado`}
                control={control}
                rules={{ required: 'Este campo es requerido' }}
                render={({ field }) => (
                    <Input 
                        {...field}
                        label='Enunciado'
                        placeholder='Enunciado de la pregunta'
                        isInvalid={!!errors.preguntas?.[preguntaIndex]?.enunciado}
                        isRequired
                        errorMessage={errors.preguntas?.[preguntaIndex]?.enunciado?.message}
                        name={field.name}
                    />
                )}
            />
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
                {opcionesFields.map((opcion, opcionIndex) => (
                    <div className='flex flex-col gap-4' key={opcion.id}>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='text-lg font-bold text-primary px-1'>
                                Opción {opcionIndex + 1}
                            </p>
                            <Button
                                color='danger'
                                onClick={() => removeOpcion(opcionIndex)}
                            >
                                <FaTrashAlt />
                            </Button>
                        </div>
                        <div className='flex flex-col gap-4 sm:flex-row'>
                            <Controller
                                name={`preguntas.${preguntaIndex}.opciones.${opcionIndex}.texto`}
                                control={control}
                                rules={{ required: 'Este campo es requerido' }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label='Texto'
                                        placeholder='Texto de la opción'
                                        isInvalid={!!errors.preguntas?.[preguntaIndex]?.opciones?.[opcionIndex]?.texto}
                                        isRequired
                                        errorMessage={errors.preguntas?.[preguntaIndex]?.opciones?.[opcionIndex]?.texto?.message}
                                        name={field.name}
                                        className='w-full'
                                    />
                                )}
                            />
                            <Controller
                                name={`preguntas.${preguntaIndex}.opciones.${opcionIndex}.es_correcta`}
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                        name={field.name}
                                        isSelected={field.value}
                                        onValueChange={(e) => {
                                            opcionesFields.forEach((_, i) => {
                                                if (i !== opcionIndex) {
                                                    setValue(`preguntas.${preguntaIndex}.opciones.${i}.es_correcta`, false)
                                                }
                                            })
                                            field.onChange(e)
                                        }}
                                    >
                                        Es correcta
                                    </Checkbox>    
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button
                onClick={() => appendOpcion({texto: '', es_correcta: false})}
                className='bg-primary text-white'
            >
                Agregar opción <IoIosAdd className='text-2xl font-bold' />
            </Button>
        </div>
    )
}


export default CuestionarioForm