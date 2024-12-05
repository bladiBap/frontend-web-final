"use client"
import { Cuestionario } from '@/models/Cuestionario'
import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react'

import React, { useState } from 'react'
import CuestionarioContestar from './CuestionarioContestar'

type Props = {
    cuestionario: Cuestionario
}

const CuestionarioInfo = (
    { cuestionario } : Props
) => {
    const [tab, setTab] = useState<string>('contestar')

    return (
        <Card>
            <CardHeader>
                <p className="typography-h2">
                    {cuestionario.titulo}
                </p>
            </CardHeader>
            <CardBody className='flex flex-col gap-4'>
                <p className="typography-body1">
                    {cuestionario.descripcion}
                </p>
                <Tabs selectedKey={tab} fullWidth onSelectionChange={(key) => setTab(key as string)}
                >
                    <Tab key="contestar" title="Contestar">
                        <CuestionarioContestar cuestionario={cuestionario} />
                    </Tab>
                    <Tab key="resultados" title="Resultados">
                        <p>Resultados</p>
                    </Tab>
                    <Tab key="ranking" title="Ranking">
                        <p>Ranking</p>
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    )
}

export default CuestionarioInfo