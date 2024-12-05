"use client";
import { useEffect, useState } from 'react';
import { LogroService } from '@/services/logro/logro';
import { MisionService } from '@/services/mision/mision';
import { Card, CardBody, Image } from "@nextui-org/react";

//Logros
// [
//     {
//         "id": 1,
//         "nombre": "logro 1",
//         "descripcion": "este logro es de complerae 5 cuestionario",
//         "objetivo": 600,
//         "recompensa": 100,
//         "por_puntos": true,
//         "createdAT": "2024-12-05T19:09:16.094Z",
//         "updatedAt": "2024-12-05T19:09:16.094Z",
//         "is_deleted": false
//     },
//     {
//         "id": 2,
//         "nombre": "logro 2",
//         "descripcion": "este logro es de complerae 2 cuestionario",
//         "objetivo": 2,
//         "recompensa": 100,
//         "por_puntos": false,
//         "createdAT": "2024-12-05T19:09:31.995Z",
//         "updatedAt": "2024-12-05T19:09:31.995Z",
//         "is_deleted": false
//     }
// ]


//Misiones
// [
//     {
//         "id": 1,
//         "nombre": "mision 10",
//         "descripcion": "esta es la mision 10",
//         "objetivo": 2,
//         "por_puntos": false,
//         "recompensa": 1000,
//         "is_deleted": false,
//         "fk_powerup": 2,
//         "createdAT": "2024-12-05T18:01:03.375Z",
//         "updatedAt": "2024-12-05T18:21:16.556Z",
//         "powerup": {
//             "id": 2,
//             "fk_nivel": 1,
//             "nombre": "power 2",
//             "descripcion": "asdasd"
//         }
//     }
// ]

export default function MePage() {
    const [logros, setLogros] = useState([]);
    const [misiones, setMisiones] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resLogros = await LogroService.getAll();
            setLogros(resLogros);
            const resMisiones = await MisionService.getAll();
            setMisiones(resMisiones);
        }   
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-4 mt-10">
            <h1 className="typography-h1"> Misiones</h1>
            <Card className="p-4">
                <CardBody>
                    <div className="grid grid-cols-3">
                        {misiones?.map((mision, index) => (
                            <Card key={index}>
                                <CardBody>
                                    <h1 className="typography-h1">{mision.nombre}</h1>
                                    <p className="typography-p">{mision.descripcion}</p>
                                    <p className="typography-p">Objetivo: {mision.objetivo}</p>
                                    <p className="typography-p">Recompensa: {mision.recompensa}</p>
                                </CardBody>
                            </Card>
                        ))}
                        { misiones?.length === 0 && <p className="typography-p text-center">No hay misiones completadas</p>}
                    </div>
                </CardBody>
            </Card>
            
            <h1 className="typography-h1"> Logros</h1>
            <Card className="grid grid-cols-3 gap-4 p-4">
                {logros?.map((logro, index) => (
                    <Card key={index}>
                        <CardBody>
                            <h1 className="typography-h1">{logro.nombre}</h1>
                            <p className="typography-p">{logro.descripcion}</p>
                            <p className="typography-p">Objetivo: {logro.objetivo}</p>
                            <p className="typography-p">Recompensa: {logro.recompensa}</p>
                        </CardBody>
                    </Card>
                ))}
                { logros?.length === 0 && <p className="typography-p text-center">No hay logros completados</p>}    
            </Card>
        </div>
    );
}