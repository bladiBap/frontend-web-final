"use client";
import { useEffect, useState } from "react";
import { LogroService } from '@/services/logro/logro';
import { Button, Input, Checkbox } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import showToast from '@/utils/toast';

export default function FormLogro({ params } : any
) {
    const id = params.id;
    const router = useRouter();

    const [nombre , setNombre] = useState('')
    const [descripcion , setDescripcion] = useState('')
    const [objetivo , setObjetivo] = useState(0)
    const [porPuntos , setPorPuntos] = useState(false)
    const [recompensa , setRecompensa] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            if (id !== 'new') {
                await getLogro(id)
            }
        }
        fetchData()
    }, [id])

    const getLogro = async (id: number) => {
        try {
            const res = await LogroService.getById(id)
            if (res) {
                setNombre(res.nombre)
                setDescripcion(res.descripcion)
                setObjetivo(res.objetivo)
                setPorPuntos(res.por_puntos)
                setRecompensa(res.recompensa)
            }
        } catch (error) {
            showToast('No se pudo obtener el logro', 'error')
            router.push('/admin/logro')
        }
        
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (!nombre || !descripcion || !objetivo || !recompensa) {
            showToast('Todos los campos son obligatorios', 'error')
            return
        }
        const logro = {
            nombre,
            descripcion,
            objetivo : parseInt(objetivo),
            por_puntos: porPuntos,
            recompensa : parseInt(recompensa)
        }
        sendLogro(logro)
    }

    const sendLogro = async (logro: any) => {
        try {
            if (id === 'new') {
                await LogroService.create(logro)
                showToast('Logro creado correctamente', 'success')
            } else {
                await LogroService.update(id, logro)
                showToast('Logro actualizado correctamente', 'success')
            }
            router.push('/admin/logro')
        } catch (error) {
            if (id === 'new') {
                showToast('No se pudo crear el logro', 'error')
            } else {
                showToast('No se pudo actualizar el logro', 'error')
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium text-center w-full">Formulario de logro</h1>
            <form className="flex flex-col gap-4">
                <Input
                    label="Nombre"
                    value={nombre}
                    onValueChange={setNombre}
                />
                <Input
                    label="Descripción"
                    value={descripcion}
                    onValueChange={setDescripcion}
                />
                <div className="flex flex-row gap-4">
                    <Input
                        className="flex-1"
                        type="number"
                        label="Objetivo"
                        value={objetivo}
                        onValueChange={setObjetivo}
                    />
                    <Input
                        className="flex-1"
                        type="number"
                        label="Recompensa"
                        value={recompensa}
                        onValueChange={setRecompensa}
                    />
                    <Checkbox className="flex-1" isSelected={porPuntos} onValueChange={setPorPuntos}>
                        Es por puntos?
                    </Checkbox>
                </div>
                <Button
                    className="w-1/2 self-center"
                    type="submit"
                    onClick={onSubmit}
                >
                    Guardar
                </Button>
            </form>
        </div>
    )
}