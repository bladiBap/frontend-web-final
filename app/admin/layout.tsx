"use client";
import TabsComponent from "@/components/Tabs/Tabs";
import { Card } from "@nextui-org/react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-row gap-4 mt-10">
            <TabsComponent />
            <Card className="w-full p-4">
                {children}
            </Card>
        </div>
    );
}