"use client"
import { Cuestionario } from '@/models/Cuestionario'
import { CuestionarioService } from '@/services/CuestionarioService';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

type Props = {
    cuestionario: Omit<Cuestionario, "preguntas">;
    is_editable?: boolean;
}

const CuestionarioCard = (
    { cuestionario, is_editable = false }: Props
) => {
    const queryClient = useQueryClient();

    const deleteCuestionario = useMutation({
        mutationFn: () => CuestionarioService.deleteCuestionario(cuestionario.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['cuestionarios']
            });
            await queryClient.refetchQueries({
                queryKey: ['cuestionarios']
            });
        }
    })

    return (
        <Card className='max-w-[300px] w-full'>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <p className='typography-h2'>
                        {cuestionario.titulo}
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                {cuestionario.descripcion}
            </CardBody>
            {
                is_editable ? (
                    <CardFooter>
                        <div className='flex justify-center items-center gap-4 w-full'>
                            <Link href={`/user/cuestionario/form/${cuestionario.id}`}>
                                <Button 
                                    color='primary'
                                >
                                    Editar
                                </Button>
                            </Link>
                            <Button 
                                color='danger'
                                onPress={() => deleteCuestionario.mutate()}
                            >
                                Eliminar
                            </Button>
                        </div>
                    </CardFooter>
                ) : (
                    <CardFooter className='flex justify-center items-center gap-4 w-full'>
                        <Link href={`/user/cuestionario/${cuestionario.id}`}>
                            <Button 
                                color='primary'
                            >
                                Ver
                            </Button>
                        </Link>
                    </CardFooter>
                )
            }
        </Card>
    )
}

export default CuestionarioCard