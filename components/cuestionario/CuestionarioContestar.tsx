"use client"
import { Cuestionario } from "@/models/Cuestionario"
import { Opcion } from "@/models/Opcion"
import { Pregunta } from "@/models/Pregunta"
import { MAXIMA_RACHA, PUNTOS_POR_PREGUNTA } from "@/utils/constants"
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import { useState } from "react"

type Props = {
    cuestionario: Cuestionario
}

const CuestionarioContestar = (
    { cuestionario } : Props
) => {
    const [preguntaIndex, setPreguntaIndex] = useState(0);
    const [racha, setRacha] = useState(1);
    const [puntosTotales, setPuntosTotales] = useState(0);

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
        totalPreguntas
    }: PreguntaProps
) => {
    const [isRespondida, setIsRespondida] = useState(false);

    const responder = (opcion: Opcion) => {
        setIsRespondida(true);
        if (opcion.es_correcta) {
            if (racha < MAXIMA_RACHA) {
                setRacha(racha + 1);
            }
            const puntos = PUNTOS_POR_PREGUNTA * racha;
            setPuntosTotales(puntosTotales + puntos);
        } else {
            setRacha(1);
        }
    }

    if (preguntaIndex !== pregunta.orden) {
        return null;
    }

    return (
        <div className="flex justify-center items-center">
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
                            {pregunta.opciones.map((opcion, index) => (
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
                                >
                                    {preguntaIndex < totalPreguntas ? 'Siguiente' : 'Finalizar'}
                                </Button>
                            )
                        }
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default CuestionarioContestar