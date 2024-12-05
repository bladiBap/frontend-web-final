"use client";
import { useEffect, useState } from 'react';
import { UserService } from '@/services/usuario/user';
import { Card, CardBody, Image } from "@nextui-org/react";

export default function MePage() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await UserService.getAllInfo();
            setUser(res);
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-4 mt-10">
            <h1 className="typography-h1"> Datos del usuario</h1>
            <Card className="p-4">
                <CardBody>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-4">
                            <h1 className="typography-h1">{user.nombre} {user.apellido}</h1>
                            <p className="typography-p">Correo: {user.correo}</p>
                            <p className="typography-p">Rol: {user.rol}</p>
                            <p className="typography-p">Nivel: {user.nivel?.nombre}</p>
                            <p className="typography-p">Puntaje: {user.puntaje}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
            
            <Card className="grid grid-cols-3 gap-4 p-4">
                <div className="flex flex-col gap-3">
                    <h1 className="typography-h1 text-center">Misiones Completadas</h1>
                    <div className="grid grid-cols-1 gap-4">
                        {user.usuariomision?.map((mision, index) => (
                            <Card key={index}>
                                <CardBody>
                                    <h1 className="typography-h1">{mision.mision.nombre}</h1>
                                    <p className="typography-p">{mision.mision.descripcion}</p>
                                    <p className="typography-p">Objetivo: {mision.mision.objetivo}</p>
                                    <p className="typography-p">Recompensa: {mision.mision.recompensa}</p>
                                </CardBody>
                            </Card>
                        ))}
                        { user.usuariomision?.length === 0 && <p className="typography-p text-center">No hay misiones completadas</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="typography-h1 text-center">Logros Completados</h1>
                    <div className="grid grid-cols-1 gap-4">
                        {user.usuariologro?.map((logro, index) => (
                            <Card key={index}>
                                <CardBody>
                                    <h1 className="typography-h1">{logro.logro.nombre}</h1>
                                    <p className="typography-p">{logro.logro.descripcion}</p>
                                    <p className="typography-p">Objetivo: {logro.logro.objetivo}</p>
                                    <p className="typography-p">Recompensa: {logro.logro.recompensa}</p>
                                </CardBody>
                            </Card>
                        ))}
                        { user.usuariologro?.length === 0 && <p className="typography-p text-center">No hay logros completados</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="typography-h1 text-center">Mis powerups</h1>
                    <div className="grid grid-cols-1 gap-4">
                        {user.usuariopowerup?.map((powerup, index) => (
                            <Card key={index}>
                                <CardBody>
                                    <h1 className="typography-h1">{powerup.powerup.nombre}</h1>
                                    <p className="typography-p">{powerup.powerup.descripcion}</p>
                                </CardBody>
                            </Card>
                        ))}
                        { user.usuariopowerup?.length === 0 && <p className="typography-p text-center">No hay powerups</p>}
                    </div>
                </div>
            </Card>
        </div>
    );
}