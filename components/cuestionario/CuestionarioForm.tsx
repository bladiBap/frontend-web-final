"use client"
import { Button, Card, CardBody, CardHeader, Checkbox, Input, Textarea } from '@nextui-org/react'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { FaArrowDown, FaArrowUp, FaTrashAlt } from 'react-icons/fa'
import { IoIosAdd } from 'react-icons/io'

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
    const {
        control,
        formState: {
            errors,
            isSubmitting
        },
        handleSubmit,
        setValue,
        getValues
    } = useForm<DatosForm>({
        defaultValues: {
            titulo: '',
            descripcion: '',
            preguntas: []
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        criteriaMode: 'firstError',
        shouldFocusError: true
    });

    const {
        fields: preguntasFields,
        append: appendPregunta,
        remove: removePregunta,
        move: movePregunta
    } = useFieldArray({
        control,
        name: 'preguntas',
        rules: {
            required: 'Este campo es requerido',
            minLength: {
                value: 1,
                message: 'Debe tener al menos una pregunta'
            }
        }
    });

    const onSubmitForm = async (data: DatosForm) => {
        console.log(data);
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

    return (
        <Card>
            <CardHeader>
                <p
                    className='text-2xl font-bold text-primary px-1'
                >
                    {id ? 'Editar' : 'Crear'} cuestionario
                </p>
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
                                    preguntaIndex={preguntaIndex}
                                />
                            );
                        })}
                        <Button
                            onClick={() => appendPregunta({enunciado: '', orden: preguntasFields.length, opciones: []})}
                            className='bg-primary text-white'
                        >
                            Agregar pregunta <IoIosAdd />
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

type PreguntaFieldProps = {
    control: any,
    errors: any,
    setValue: any,
    removePregunta: any,
    movePregunta: any,
    preguntaIndex: number
}

function PreguntaField(
    {
        control, 
        errors, 
        preguntaIndex,
        removePregunta,
        movePregunta,
        setValue
    }: PreguntaFieldProps
) {
    const {
        fields: opcionesFields,
        append: appendOpcion,
        remove: removeOpcion
    } = useFieldArray({
        control,
        name: `preguntas.${preguntaIndex}.opciones`
    });

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <p className='text-lg font-bold text-primary px-1'>
                    Pregunta {preguntaIndex + 1}
                </p>
                <div className='flex gap-2'>
                    <Button
                        className='bg-primary text-white'
                        onClick={() => movePregunta(preguntaIndex, preguntaIndex - 1)}
                        disabled={preguntaIndex === 0}
                    >
                        <FaArrowUp />
                    </Button>
                    <Button
                        className='bg-primary text-white'
                        onClick={() => movePregunta(preguntaIndex, preguntaIndex + 1)}
                        disabled={preguntaIndex === opcionesFields.length - 1}
                    >
                        <FaArrowDown />
                    </Button>
                    <Button
                        color='danger'
                        onClick={() => removePregunta(preguntaIndex)}
                    >
                        <FaTrashAlt />
                    </Button>
                </div>
            </div>
            <Controller
                name="enunciado"
                control={control}
                render={({ field }) => (
                    <Input 
                        {...field}
                        label='Enunciado'
                        placeholder='Enunciado de la pregunta'
                        isInvalid={!!errors.enunciado}
                        isRequired
                        errorMessage={errors.enunciado?.message}
                        name={field.name}
                    />
                )}
            />
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
                {opcionesFields.map((opcion, opcionIndex) => (
                    <div className='flex flex-col gap-4' key={opcion.id}>
                        <div className='flex flex-row justify-between'>
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
                                name={`opciones.${opcionIndex}.texto`}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label='Texto'
                                        placeholder='Texto de la opción'
                                        isInvalid={!!errors.texto}
                                        isRequired
                                        errorMessage={errors.texto?.message}
                                        name={field.name}
                                        className='w-full'
                                    />
                                )}
                            />
                            <Controller
                                name={`opciones.${opcionIndex}.es_correcta`}
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                        name={field.name}
                                        isSelected={field.value}
                                        onValueChange={(e) => {
                                            opcionesFields.forEach((_, i) => {
                                                if (i !== opcionIndex) {
                                                    setValue(`opciones.${i}.es_correcta`, false)
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
                Agregar opción <IoIosAdd />
            </Button>
        </div>
    )
}


export default CuestionarioForm