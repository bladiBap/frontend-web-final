"use client";
import { useEffect, useState } from "react";
import {MisionService} from "@/services/mision/mision";
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";
import showToast from "@/utils/toast";
import TableComponent from "@/components/table/table";
import ModalConfirm from '@/components/modal-confirm/modal-confirm';

const columns = [{uid: "nombre",name: "Nombre"},{uid: "descripcion",name: "Descripción"},{uid: "objetivo",name: "Objetivo"},{uid: "powerup", name: "PowerUp"},
    {uid: "por_puntos",name: "Es por Puntos"},{uid: "recompensa",name: "Recompensa"},{uid: "actions",name: "Acciones"}, 
];

export default function PageMision() {
    const router = useRouter();
    const [misiones, setMisiones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [mision, setMision] = useState({});

    const getAllLogros = async () => {
        MisionService.getAll().then((data) => {
            setMisiones(data);
        });
    };

    useEffect(() => {
        getAllLogros();
    }, []);

    const onConfirmDelete = async () => {
        const res = await MisionService.delete(logro.id);
        if(res) {
            getAllLogros();
            onClose();
            showToast("Mision eliminado correctamente", "success");
        }
    };

    const onClose = () => {
        setShowModal(false);
        setMision({});
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-medium">Misiones</h1>
                <Button onPress={() => router.push("/admin/mision/new")}>Crear Mision</Button>
            </div>
            <ModalConfirm
                openModal={showModal}
                titleModal="Eliminar Logro"
                textModal={`¿Estás seguro de eliminar el logro ${mision.nombre}?`}
                onClickConfirm={() => onConfirmDelete()}
                onCloseModal={() => onClose()}
            />
            <TableComponent
                items={[...misiones]}
                columns={[...columns]}
                onEdit={(item) => {
                    router.push(`/admin/mision/${item.id}`);
                }}
                onDelete={(item) => {
                    setMision(item);
                    setShowModal(true);
                }} 
                />
        </div>
    );
}