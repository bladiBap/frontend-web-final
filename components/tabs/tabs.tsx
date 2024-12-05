import {Card, Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function TabsComponent () {
    const router = useRouter();

    const handleTabs = (route: string) => {
        router.push(route);
    }
    return (
        <div className="flex flex-row">
            <Card>
                <Button onPress={()=>handleTabs("/admin")}>Home</Button>
                <Button  onPress={()=>handleTabs("/admin/mision")}>Misiones</Button>
                <Button onPress={() => handleTabs("/admin/logro")}>Logros</Button>
            </Card>
        </div>
    );
}