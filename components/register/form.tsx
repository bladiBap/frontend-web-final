"use client";
import { useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { AuthService } from "@/services/usuario/auth/auth";
import showToast from '@/utils/toast';

export default function RegisterComponent() {

    const urlImages = {
        
    }
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [repetirContrasena, setRepetirContrasena] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Register");
        if(correo === "" || contrasena === "" || nombre === "" || apellido === "" || repetirContrasena === ""){
            showToast("Por favor llene todos los campos", "error");
            return;
        }

        if(contrasena !== repetirContrasena){
            showToast("Las contraseñas no coinciden", "error");
            return;
        }

        AuthService.register(nombre, apellido, correo, contrasena).then((res) => {
            console.log(res);
            showToast("Registro exitoso", "success");
        }).catch((err) => {
            console.log(err.response.data.message);
            showToast(err.response.data.message, "error");
        });
    };

    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[800px] w-[800px]"
            shadow="sm"
            >
            <CardBody className="p-4">
                <div className="flex flex-col items-center w-full col-span-6 md:col-span-8">
                    <h1 className="typography-h1">Registrarse</h1>
                    <form className="w-full flex flex-col gap-4 items-center mt-8" onSubmit={handleLogin}>
                        <Input
                            className="w-full"
                            label="Nombre"
                            onValueChange={setNombre}
                            placeholder="Nombre"
                            required
                            value={nombre}
                        />
                        <Input
                            className="w-full"
                            label="Apellido"
                            onValueChange={setApellido}
                            placeholder="Apellido"
                            required
                            value={apellido}
                        />
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
                        <Input
                            className="w-full"
                            label="Repetir Contraseña"
                            onValueChange={setRepetirContrasena}
                            placeholder="Repetir Contraseña"
                            required
                            type="password"
                            value={repetirContrasena}
                        />
                        <Button className="w-[400px] bg-primary text-white mt-4" type="submit"> Crear Usuario </Button>
                        <p className="text-sm text-primary cursor-pointer">¿Ya tienes cuenta?<a href="/login/user" className="text-primary"> Inicia Sesion</a></p>
                    </form>
                </div>
            </CardBody>
        </Card>
    );
}