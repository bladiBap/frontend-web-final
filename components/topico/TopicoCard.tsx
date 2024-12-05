import { Topico } from '@/models/Topico'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

type Prop = {
    topico: Topico
}

const TopicoCard = (
    { topico }: Prop
) => {
    return (
        <Card className='max-w-[300px] w-full'>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <p className='typography-h2'>
                        {topico.nombre}
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                {topico.descripcion}
            </CardBody>
            <CardFooter>
                <Link href={`/topico/${topico.id}`}>
                    <Button color='primary'>
                        Ver más
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default TopicoCard