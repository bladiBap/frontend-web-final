import {
    Modal, ModalContent, 
    ModalHeader, ModalBody, 
    ModalFooter, Button
} from "@nextui-org/react";

import { useState } from "react";

interface ModalConfirmProps {
    openModal: boolean;
    onCloseModal: any;
    onClickConfirm: any;
    textModal: string;
    titleModal: string;
}

const ModalConfirm = ({onClickConfirm, textModal, openModal, onCloseModal, titleModal }: ModalConfirmProps) => {

    return (
        
            <Modal isOpen={openModal} backdrop="blur"
                hideCloseButton={true}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{titleModal}</ModalHeader>
                    <ModalBody>
                        <p>{textModal}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onCloseModal}>
                        Cancelar
                        </Button>
                        <Button color="primary" onPress={onClickConfirm}>
                        Aceptar
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        
    );
}

export default ModalConfirm;