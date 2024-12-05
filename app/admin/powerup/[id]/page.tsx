"use client";
import { useState, useEffect } from "react";
import {
    Input,
    Textarea,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Spinner,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { NivelService } from "@/services/nivel/NivelService";
import { PowerupService } from "@/services/powerup/PowerupService";
import { Nivel } from "@/models/Nivel";

interface Props {
    params: { id: any };
}

export default function FormPowerup({ params }: Props) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fk_nivel, setFk_nivel] = useState<number>(0);
    const [niveles, setNiveles] = useState<Nivel[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({ nombre: "", descripcion: "", nivel: "" });
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        const fetchNiveles = async () => {
            try {
                const response = await NivelService.getNiveles();
                setNiveles(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNiveles();

        if (id && id !== "new") {
            const fetchPowerup = async () => {
                try {
                    setLoading(true);
                    const response = await PowerupService.getPowerupById(id);
                    setNombre(response.nombre);
                    setDescripcion(response.descripcion);
                    setFk_nivel(response.fk_nivel);

                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPowerup();
        }

    }, [id]);

    const validateFields = () => {
        const newErrors = { nombre: "", descripcion: "", nivel: "" };

        if (!nombre.trim()) {
            newErrors.nombre = "El nombre es requerido.";
        }
        if (!descripcion.trim()) {
            newErrors.descripcion = "La descripción es requerida.";
        }
        if (fk_nivel === 0) {
            newErrors.nivel = "Debes seleccionar un nivel.";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateFields()) return;

        const payload = {
            nombre,
            descripcion,
            fk_nivel,
        };

        try {
            setLoading(true);
            if (id === "new") {
                await PowerupService.createPowerup(payload);
                router.push("/admin/powerup");
            } else {
                await PowerupService.updatePowerup(id, payload);
                router.push("/admin/powerup");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectionChange = (keys: any) => {
        const selectedId = Array.from(keys).pop();
        setFk_nivel(selectedId as number);
        setSelectedKeys(keys);
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card style={{ maxWidth: "600px", margin: "0 auto" }}>
                <CardHeader>
                    <h2>{id === "new" ? "Crear Powerup" : "Editar Powerup"}</h2>
                </CardHeader>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <CardBody style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
                        {loading ? (
                            <Spinner size="lg" label="Cargando..." />
                        ) : (
                            <>
                                <Input
                                    label="Nombre"
                                    placeholder="Nombre del Powerup"
                                    value={nombre}
                                    onChange={(e: any) => setNombre(e.target.value)}
                                    required
                                />
                                {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
                                <Textarea
                                    label="Descripción"
                                    placeholder="Descripción del Powerup"
                                    value={descripcion}
                                    onChange={(e: any) => setDescripcion(e.target.value)}
                                    required
                                />
                                {errors.descripcion && <p style={{ color: "red" }}>{errors.descripcion}</p>}
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button variant="bordered" className="capitalize">
                                            {niveles.find((nivel) => nivel.id === parseInt(fk_nivel.toString()))?.nombre || "Selecciona un nivel"}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Single selection example"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedKeys}
                                        onSelectionChange={handleSelectionChange}
                                    >
                                        {niveles.map((nivel) => (
                                            <DropdownItem key={nivel.id}>{nivel.nombre}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                {errors.nivel && <p style={{ color: "red" }}>{errors.nivel}</p>}
                            </>
                        )}
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" color="primary" disabled={loading}>
                            {id === "new" ? "Crear" : "Guardar"}
                        </Button>
                        <Button
                            type="button"
                            color="secondary"
                            onClick={() => router.push("/admin/powerup")}
                            disabled={loading}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancelar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
