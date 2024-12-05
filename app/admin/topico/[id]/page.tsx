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
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { TopicoService } from "@/services/topicos/TopicoService";

interface Props {
    params: { id: any };
}

export default function FormTopico({ params }: Props) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ nombre: "", descripcion: "" });
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        if (id && id !== "new") {
            const fetchTopico = async () => {
                try {
                    setLoading(true);
                    const response = await TopicoService.getTopicoById(id);
                    setNombre(response.nombre);
                    setDescripcion(response.descripcion);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchTopico();
        }
    }, [id]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateFields()) return;

        const payload = {
            nombre,
            descripcion,
        };

        try {
            setLoading(true);
            if (id === "new") {
                await TopicoService.createTopico(payload);
                router.push("/admin/topico");
            } else {
                await TopicoService.updateTopico(id, payload);
                router.push("/admin/topico");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const validateFields = () => {
        const newErrors = { nombre: "", descripcion: "" };

        if (!nombre.trim()) {
            newErrors.nombre = "El nombre es requerido.";
        }
        if (!descripcion.trim()) {
            newErrors.descripcion = "La descripción es requerida.";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== "");
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card style={{ maxWidth: "600px", margin: "0 auto" }}>
                <CardHeader>
                    <h2>{id === "new" ? "Crear Topico" : "Editar Topico"}</h2>
                </CardHeader>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <CardBody style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
                        {loading ? (
                            <Spinner size="lg" label="Cargando..." />
                        ) : (
                            <>
                                <Input
                                    label="Nombre"
                                    placeholder="Nombre del topico"
                                    value={nombre}
                                    onChange={(e: any) => setNombre(e.target.value)}
                                    required
                                />
                                {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
                                <Textarea
                                    label="Descripción"
                                    placeholder="Descripción del topico"
                                    value={descripcion}
                                    onChange={(e: any) => setDescripcion(e.target.value)}
                                    required
                                />
                                {errors.descripcion && (
                                    <p style={{ color: "red" }}>{errors.descripcion}</p>
                                )}
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
                            onClick={() => router.push("/admin/topico")}
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
