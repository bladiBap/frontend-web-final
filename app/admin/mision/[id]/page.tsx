"use client";
import { useEffect, useState } from "react";
import { MisionService } from '@/services/mision/mision';
import { Button, Input, Checkbox, Select, SelectItem, Selection} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { PowerupService } from '@/services/powerup/PowerupService';
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
    const [powerUp , setPowerUp] = useState<Selection>(new Set([]));
    const [powerUps , setPowerUps] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await getAllPowerUps()
            if (id !== 'new') {
                await getMision(id)
            }
        }
        fetchData()
    }, [id])

    const getAllPowerUps = async () => {
        try {
            const res = await PowerupService.getPowerup()
            setPowerUps(res)
        }catch (error) {
            showToast('No se pudo obtener los powerUps', 'error')
        }
    }

    const getMision = async (id: number) => {
        try {
            const res = await MisionService.getById(id)
            if (res) {
                setNombre(res.nombre)
                setDescripcion(res.descripcion)
                setObjetivo(res.objetivo)
                setPorPuntos(res.por_puntos)
                setRecompensa(res.recompensa)
                setPowerUp(new Set([res.fk_powerup+""]))
            }
        } catch (error) {
            showToast('No se pudo obtener la Mision', 'error')
            router.push('/admin/mision')
        }
        
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (!nombre || !descripcion || !objetivo || !recompensa || powerUp.size === 0) {
            showToast('Todos los campos son obligatorios', 'error')
            return
        }
        const logro = {
            nombre,
            descripcion,
            objetivo : parseInt(objetivo),
            por_puntos: porPuntos,
            recompensa : parseInt(recompensa),
            fk_powerup: powerUp.values().next().value
        }
        console.log(logro)
        sendLogro(logro)
    }

    const sendLogro = async (logro: any) => {
        try {
            if (id === 'new') {
                await MisionService.create(logro)
                showToast('Mision creado correctamente', 'success')
            } else {
                await MisionService.update(id, logro)
                showToast('Mision actualizado correctamente', 'success')
            }
            router.push('/admin/mision')
        } catch (error) {
            if (id === 'new') {
                showToast('No se pudo crear la mision', 'error')
            } else {
                showToast('No se pudo actualizar el mision', 'error')
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

                    <Select
                        className="flex-1"
                        label="PowerUp"
                        placeholder="Seleccione un PowerUp"
                        selectedKeys={powerUp}
                        onSelectionChange={setPowerUp}
                    >
                        { powerUps.length > 0 && powerUps.map((powerUp: any) => (
                            <SelectItem key={powerUp.id} value={powerUp.id}>
                                {powerUp.nombre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className="flex flex-row gap-4">
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