"use client";
import TabsComponent from "@/components/Tabs/Tabs";

export default function Layout({ children } : 
    Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-row gap-4 mt-10">
            <TabsComponent />
            <div className="">
                {children}
            </div>
        </div>
    );
}