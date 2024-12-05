"use client";
import { useEffect, useState } from "react";
import {
    Spinner,
    Button,
} from "@nextui-org/react";

import { useRouter } from 'next/navigation';
import { Topico } from "@/models/Topico";
import { TopicoService } from "@/services/topicos/TopicoService";
import ModalConfirm from "@/components/modal-confirm/modal-confirm";
import TableComponent from "@/components/table/table";

const columns = [{ uid: "nombre", name: "Nombre" }, { uid: "descripcion", name: "Descripción" }, { uid: "actions", name: "Acciones" }
];

export default function PageTopico() {
    const [topicos, setTopicos] = useState<Topico[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [topicoToDelete, setTopicoToDelete] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const fetchTopicos = async () => {
            try {
                const response = await TopicoService.getTopicos();
                setTopicos(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopicos();
    }, []);

    const handleEdit = (id: number) => {
        router.push(`/admin/topico/${id}`);
    };

    const handleDeleteConfirm = async () => {
        if (topicoToDelete !== 0) {
            try {
                await TopicoService.deleteTopico(topicoToDelete);
                setTopicos(topicos.filter((topico) => topico.id !== topicoToDelete));
                setDeleteModalVisible(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDelete = (id: number) => {
        setTopicoToDelete(id);
        setDeleteModalVisible(true);
    };

    const handleCreate = () => {
        router.push(`/admin/topico/new`);
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-medium">Topicos</h1>
                <Button color="primary" onClick={handleCreate} >
                    Crear Nuevo Topico
                </Button>
            </div>
            {loading ? (
                <Spinner size="lg" label="Cargando topicos..." />
            ) : (
                <TableComponent
                    items={[...topicos]}
                    columns={[...columns]}
                    onEdit={(item) => {
                        router.push(`/admin/topico/${item.id}`);
                    }}
                    onDelete={(item: any) => {
                        handleDelete(item.id);
                    }}
                />
            )}

            <ModalConfirm openModal={deleteModalVisible} onCloseModal={() => setDeleteModalVisible(false)} onClickConfirm={handleDeleteConfirm} textModal={"¿Estás seguro de que deseas eliminar este topico? Esta acción no se puede deshacer."} titleModal={"Confirmar Eliminación"} />

            {/* <Modal isOpen={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
                <ModalHeader>Confirmar Eliminación</ModalHeader>
                <ModalBody>
                    ¿Estás seguro de que deseas eliminar este nivel? Esta acción no se puede deshacer.
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteConfirm}>
                        Confirmar
                    </Button>
                    <Button color="secondary" onClick={() => setDeleteModalVisible(false)}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal> */}
        </div>
    );
}
