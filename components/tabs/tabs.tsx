"use client";
import {Card, ListboxItem} from "@nextui-org/react";

export default function TabsComponent () {
    
    return (
        <div className="flex flex-row">
            <Card
                aria-label="Listbox Variants"
            >
                <Card onPress={
                    () => {
                        console.log("Home");
                    }
                }>Homae</Card>
                <Card  onPress={
                    () => {
                        console.log("Misiones");
                    }
                }>Misiones</Card>
                <Card onPress={
                    () => {
                        console.log("Logros");
                    }
                }
                >Logros</Card>
            </Card>
        </div>
    );
}