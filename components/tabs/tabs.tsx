import {Card, Button} from "@nextui-org/react";

export default function TabsComponent () {
    
    return (
        <div className="flex flex-row">
            <Card
                aria-label="Listbox Variants"
            >
                <Button onPress={
                    () => {
                        console.log("Home");
                    }
                }>Home</Button>
                <Button  onPress={
                    () => {
                        console.log("Misiones");
                    }
                }>Misiones</Button>
                <Button onPress={
                    () => {
                        console.log("Logros");
                    }
                }
                >Logros</Button>
            </Card>
        </div>
    );
}