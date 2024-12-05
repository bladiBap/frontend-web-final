"use client";
import { useEffect, useState } from "react";
import {
    Spinner,
    Button,
} from "@nextui-org/react";

import { useRouter } from 'next/navigation';
import { Powerup } from "@/models/Powerup";
import { PowerupService } from "@/services/powerup/PowerupService";
import ModalConfirm from "@/components/modal-confirm/modal-confirm";
import TableComponent from "@/components/table/table";

const columns = [{ uid: "nombre", name: "Nombre" }, { uid: "descripcion", name: "Descripción" }, { uid: "nivel", name: "Nivel" }, { uid: "actions", name: "Acciones" }
];

export default function PagePowerup() {
    const [powerups, setPowerups] = useState<Powerup[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [powerupToDelete, setPowerupToDelete] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const fetchPowerups = async () => {
            try {
                const response = await PowerupService.getPowerup();
                setPowerups(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPowerups();
    }, []);

    const handleEdit = (id: number) => {
        router.push(`/admin/powerup/${id}`);
    };

    const handleDeleteConfirm = async () => {
        if (powerupToDelete !== 0) {
            try {
                await PowerupService.deletePowerup(powerupToDelete);
                setPowerups(powerups.filter((powerup) => powerup.id !== powerupToDelete));
                setDeleteModalVisible(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDelete = (id: number) => {
        setPowerupToDelete(id);
        setDeleteModalVisible(true);
    };

    const handleCreate = () => {
        router.push(`/admin/powerup/new`);
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-medium">Powerups</h1>
                <Button color="primary" onClick={handleCreate}>
                    Crear Nuevo Powerup
                </Button>
            </div>

            {loading ? (
                <Spinner size="lg" label="Cargando powerups..." />
            ) : (
                <TableComponent
                    items={[...powerups]}
                    columns={[...columns]}
                    onEdit={(item) => {
                        router.push(`/admin/powerup/${item.id}`);
                    }}
                    onDelete={(item: any) => {
                        handleDelete(item.id);
                    }}
                />
            )}

            <ModalConfirm openModal={deleteModalVisible} onCloseModal={() => setDeleteModalVisible(false)} onClickConfirm={handleDeleteConfirm} textModal={"¿Estás seguro de que deseas eliminar este powerup? Esta acción no se puede deshacer."} titleModal={"Confirmar Eliminación"} />
        </div>
    );
}
