"use client"
import { Cuestionario } from "@/models/Cuestionario"
import { Opcion } from "@/models/Opcion"
import { PowerupAvailables } from "@/models/Powerup"
import { Pregunta } from "@/models/Pregunta"
import { CuestionarioService } from "@/services/CuestionarioService"
import { PowerupService } from "@/services/powerup/PowerupService"
import { MAXIMA_RACHA, PUNTOS_POR_PREGUNTA } from "@/utils/constants"
import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { use, useEffect, useState } from "react"
import { set } from "react-hook-form"

type Props = {
    cuestionario: Cuestionario
}

const CuestionarioContestar = (
    { cuestionario }: Props
) => {
    const [preguntaIndex, setPreguntaIndex] = useState(0);
    const [racha, setRacha] = useState(1);
    const [puntosTotales, setPuntosTotales] = useState(0);
    const [powerups, setPowerups] = useState<PowerupAvailables[]>([]);

    useEffect(() => {
        const fetchPowerupsAvailables = async () => {
            try {
                const response = await PowerupService.getPowerupsByUser();
                setPowerups(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPowerupsAvailables();
    }, []);

    // useEffect(() => {
    //     const fetchPowerupsAvailables = async () => {
    //         try {
    //             const response = await PowerupService.getPowerupsByUser();
    //             setPowerups(response);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchPowerupsAvailables();
    // }, [powerups]);

    const handleSetPowerups = (newPowerups: PowerupAvailables[]) => {
        console.log(newPowerups);
        setPowerups(newPowerups);
    };

    return (
        <div>
            {preguntaIndex === 0 && (
                <>
                    <Card>
                        <CardHeader>
                            <p className="typography-h2">
                                Preparado para comenzar el cuestionario?
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Button
                                    onClick={() => setPreguntaIndex(1)}
                                    className="w-full col-span-2"
                                    color="primary"
                                >
                                    Comenzar
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </>
            )}
            {cuestionario.preguntas.map((pregunta, index) => (
                <CuestionarioPregunta
                    key={pregunta.id}
                    preguntaIndex={preguntaIndex}
                    setPreguntaIndex={setPreguntaIndex}
                    puntosTotales={puntosTotales}
                    setPuntosTotales={setPuntosTotales}
                    pregunta={pregunta}
                    racha={racha}
                    setRacha={setRacha}
                    totalPreguntas={cuestionario.preguntas.length}
                    powerups={powerups}
                    setPowerups={handleSetPowerups}
                />
            ))}
            {preguntaIndex === cuestionario.preguntas.length + 1 && (
                <>
                    <Card>
                        <CardHeader>
                            <p className="typography-h2">
                                Cuestionario finalizado
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <p className="typography-h3">Puntos totales: {puntosTotales}</p>
                            </div>
                        </CardBody>
                    </Card>
                </>
            )}
        </div>
    )
}

type PreguntaProps = {
    preguntaIndex: number;
    setPreguntaIndex: (index: number) => void;
    puntosTotales: number;
    setPuntosTotales: (puntos: number) => void;
    pregunta: Pregunta;
    racha: number;
    setRacha: (racha: number) => void;
    totalPreguntas: number;
    powerups: PowerupAvailables[];
    setPowerups: (powerups: PowerupAvailables[]) => void;
}

const CuestionarioPregunta = (
    {
        preguntaIndex,
        setPreguntaIndex,
        puntosTotales,
        setPuntosTotales,
        pregunta,
        racha,
        setRacha,
        totalPreguntas,
        powerups,
        setPowerups
    }: PreguntaProps
) => {
    const [preguntaState, setpreguntaState] = useState(pregunta);
    const [isRespondida, setIsRespondida] = useState(false);
    const [usedPowerups, setUsedPowerups] = useState<number[]>([]);
    const subirRespuesta = useMutation({
        mutationFn: CuestionarioService.responder,
    })

    const responder = (opcion: Opcion) => {
        setIsRespondida(true);
        if (opcion.es_correcta) {
            if (racha < MAXIMA_RACHA) {
                setRacha(racha + 1);
            }
            const puntos = PUNTOS_POR_PREGUNTA * racha;
            setPuntosTotales(puntosTotales + puntos);
            subirRespuesta.mutate({
                pregunta_id: pregunta.id,
                opcion_id: opcion.id,
                puntos
            });
        } else {
            setRacha(1);
            subirRespuesta.mutate({
                pregunta_id: pregunta.id,
                opcion_id: opcion.id,
                puntos: 0
            });
        }
    }

    const handleClick = async (powerupId: number, pregunta: Pregunta, userpowerupid : number) => {
        if (!usedPowerups.includes(powerupId)) {
            setUsedPowerups([...usedPowerups, powerupId]);
            if (powerupId === 2) {
                const incorrectas = pregunta.opciones.filter((op) => !op.es_correcta);
                const opcionesRestantes = [
                    ...incorrectas.slice(0, 1),
                    pregunta.opciones.find((op) => op.es_correcta)!
                ];
                setpreguntaState({ ...pregunta, opciones: opcionesRestantes });
                setPowerups(powerups.map((powerup) => {
                    if (powerup.powerup.id === powerupId) {
                        return { ...powerup, cantidad: powerup.cantidad - 1 };
                    }
                    return powerup;
                }));

                usedPowerups.push(powerupId);
                await PowerupService.usePowerup(userpowerupid);
            } else if (powerupId === 1) {
                const correcta = preguntaState.opciones.find((op) => op.es_correcta);
                if (correcta) {
                    responder(correcta);
                }
                setPowerups(powerups.map((powerup) => {
                    if (powerup.powerup.id === powerupId) {
                        return { ...powerup, cantidad: powerup.cantidad - 1 };
                    }
                    return powerup;
                }));
                usedPowerups.push(powerupId);
                await PowerupService.usePowerup(userpowerupid);
            }
        }
    }

    if (preguntaIndex !== pregunta.orden) {
        return null;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-4 w-full">
                    <Card>
                        <CardHeader className="flex flex-col gap-4">
                            <div className="flex justify-between items-center w-full">
                                <p className="typography-h3 text-black">
                                    Pregunta {preguntaIndex}/{totalPreguntas}
                                </p>
                                <p className="typography-h3 text-black">
                                    Puntos: {puntosTotales}
                                </p>
                                <p className="typography-h3 text-black">
                                    Racha: {racha}
                                </p>
                            </div>
                            <p className="typography-h1 w-full text-center">
                                {pregunta.enunciado}
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {preguntaState.opciones.map((opcion, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => responder(opcion)}
                                        disabled={isRespondida}
                                        color={isRespondida ? (opcion.es_correcta ? 'success' : 'danger') : 'primary'}
                                    >
                                        {opcion.texto}
                                    </Button>
                                ))}
                            </div>
                        </CardBody>
                        <CardFooter>
                            {
                                isRespondida && (
                                    <Button
                                        onClick={() => {
                                            setPreguntaIndex(preguntaIndex + 1);
                                        }}
                                        color="primary"
                                        className="w-full"
                                        isLoading={subirRespuesta.isPending}
                                    >
                                        {preguntaIndex < totalPreguntas ? 'Siguiente' : 'Finalizar'}
                                    </Button>
                                )
                            }
                        </CardFooter>
                    </Card>
                </div>

                {preguntaIndex !== 0 && (
                    <div className="w-full sm:w-1/4 bg-gray-100 p-4 rounded-lg">
                        <h3 className="typography-h3 mb-4 text-center">Power-ups</h3>
                        <ul className="flex flex-col gap-4">
                            {powerups.map((powerup) => (
                                <li key={powerup.powerup.id} className="bg-white p-3 rounded shadow">
                                    <Tooltip content={powerup.powerup.descripcion} placement="top" style={{ maxWidth: "200px" }}>
                                        <h4 className="typography-h4 mb-2 cursor-pointer">{powerup.powerup.nombre}</h4>
                                    </Tooltip>
                                    <Button
                                        onClick={() => handleClick(powerup.powerup.id, pregunta, powerup.id)}
                                        disabled={powerup.cantidad === 0 || usedPowerups.includes(powerup.powerup.id)}
                                        color={usedPowerups.includes(powerup.powerup.id) ? "default" : "primary"}
                                        className="w-full"
                                    >
                                        {usedPowerups.includes(powerup.powerup.id) ? "Usado" : "Usar"}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CuestionarioContestar