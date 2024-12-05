"use client";
import {Listbox, ListboxItem} from "@nextui-org/react";

export default function TabsComponent () {
    
    return (
        <div className="flex flex-row">
            <Listbox
                aria-label="Listbox Variants"
            >
                <ListboxItem key="Home1" textValue="Homeasd">Hoasdasme</ListboxItem>
                <ListboxItem key="Mision1" textValue="Misiones">Misiones</ListboxItem>
                <ListboxItem key="Logro1" textValue="Logros">Logros</ListboxItem>
            </Listbox>
        </div>
    );
}