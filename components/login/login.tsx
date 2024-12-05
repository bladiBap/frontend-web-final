"use client";
import { useState } from "react";
import { Card, CardBody, Image, Input, Button } from "@nextui-org/react";
import showToast from '@/utils/toast';

interface LoginProps {
    type : string;
}

export default function LoginComponent() {

    const urlImages = {

    }

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[800px]"
            shadow="sm"
            >
            <CardBody className="p-4">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-8 md:gap-4 justify-center">
                    <div className="relative col-span-6 md:col-span-4 image-height">
                        <Image
                        alt="Album cover"
                        className="object-cover"
                        shadow="md"
                        src="/image/7290852.jpg"
                        width="100%"
                        height="100%"
                        />
                    </div>

                    <div className="flex flex-col items-center w-full col-span-6 gap-4 md:col-span-8">
                        <h1 className="typography-h1">Iniciar Sesion</h1>
                        <p>
                            Inicia sesion para poder acceder a NurQuests, una plataforma donde podras encontrar y 
                            crear cuestionarios de manera sencilla. 
                        </p>
                        <form className="w-full flex flex-col gap-8 items-center mt-4">
                            <Input
                                className="w-full"
                                label="Correo"
                                onValueChange={setCorreo}
                                placeholder="Correo"
                                required
                                type="email"
                                value={correo}
                            />
                            <Input
                                className="w-full"
                                label="Contraseña"
                                onValueChange={setContrasena}
                                placeholder="Contraseña"
                                required
                                type="password"
                                value={contrasena}
                            />

                            <Button className="w-full bg-primary text-white"
                                onPress={() => showToast("Sesion iniciada", "success")}
                            > Iniciar Sesion </Button>

                            <p className="text-sm text-primary cursor-pointer">¿No tienes cuenta?<a href="/register" className="text-primary">Registrate</a></p>
                        </form>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}