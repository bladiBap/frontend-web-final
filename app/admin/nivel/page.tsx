"use client";
import { useEffect, useState } from "react";
import {
    Spinner,
    Button,
} from "@nextui-org/react";

import { Nivel } from "@/models/Nivel";
import { NivelService } from "@/services/nivel/NivelService";
import { useRouter } from 'next/navigation';
import ModalConfirm from "@/components/modal-confirm/modal-confirm";
import TableComponent from "@/components/table/table";

const columns = [{ uid: "nombre", name: "Nombre" }, { uid: "descripcion", name: "Descripción" }, { uid: "actions", name: "Acciones" }
];

export default function PageNivel() {
    const [niveles, setNiveles] = useState<Nivel[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [nivelToDelete, setNivelToDelete] = useState<number>(0);
    const router = useRouter();

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
    }, []);

    const handleEdit = (id: number) => {
        router.push(`/admin/nivel/${id}`);
    };

    const handleDeleteConfirm = async () => {
        if (nivelToDelete !== 0) {
            try {
                await NivelService.deleteNivel(nivelToDelete);
                setNiveles(niveles.filter((nivel) => nivel.id !== nivelToDelete));
                setDeleteModalVisible(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDelete = (id: number) => {
        setNivelToDelete(id);
        setDeleteModalVisible(true);
    };

    const handleCreate = () => {
        router.push(`/admin/nivel/new`);
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-medium">Niveles</h1>
                <Button color="primary" onClick={handleCreate}>
                    Crear Nuevo Nivel
                </Button>
            </div>
            {loading ? (
                <Spinner size="lg" label="Cargando niveles..." />
            ) : (
                <TableComponent
                    items={[...niveles]}
                    columns={[...columns]}
                    onEdit={(item) => {
                        router.push(`/admin/nivel/${item.id}`);
                    }}
                    onDelete={(item: any) => {
                        handleDelete(item.id);
                    }}
                />
            )}

            <ModalConfirm openModal={deleteModalVisible} onCloseModal={() => setDeleteModalVisible(false)} onClickConfirm={handleDeleteConfirm} textModal={"¿Estás seguro de que deseas eliminar este nivel? Esta acción no se puede deshacer."} titleModal={"Confirmar Eliminación"} />
        </div>
    );
}
