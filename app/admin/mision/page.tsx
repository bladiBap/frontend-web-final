"use client";
import { useEffect, useState } from "react";
import { MisionService } from "@/services/logro/logro";
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";
import showToast from "@/utils/toast";
import TableComponent from "@/components/table/table";
import ModalConfirm from '@/components/modal-confirm/modal-confirm';

const columns = [{uid: "nombre",name: "Nombre"},{uid: "descripcion",name: "Descripción"},{uid: "objetivo",name: "Objetivo"},
    {uid: "por_puntos",name: "Es por Puntos"},{uid: "recompensa",name: "Recompensa"},{uid: "actions",name: "Acciones"}
];

export default function PageMision() {
    const router = useRouter();
    const [logros, setLogros] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [logro, setLogro] = useState({});

    const getAllLogros = async () => {
        LogroService.getAll().then((data) => {
            setLogros(data);
        });
    };

    useEffect(() => {
        getAllLogros();
    }, []);

    const onConfirmDelete = async () => {
        const res = await LogroService.delete(logro.id);
        console.log(res);
        if(res) {
            getAllLogros();
            onClose();
            showToast("Logro eliminado correctamente", "success");
        }
    };

    const onClose = () => {
        setShowModal(false);
        setLogro({});
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-medium">Logros</h1>
                <Button onPress={() => router.push("/admin/logro/new")}>Crear Logro</Button>
            </div>
            <ModalConfirm
                openModal={showModal}
                titleModal="Eliminar Logro"
                textModal={`¿Estás seguro de eliminar el logro ${logro.nombre}?`}
                onClickConfirm={() => onConfirmDelete()}
                onCloseModal={() => onClose()}
            />
            <TableComponent
                items={[...logros]}
                columns={[...columns]}
                onEdit={(item) => {
                    router.push(`/admin/logro/${item.id}`);
                }}
                onDelete={(item) => {
                    setLogro(item);
                    setShowModal(true);
                }} 
                />
        </div>
    );
}