"use client";
import { useEffect } from 'react';
import { UserService } from '@/services/usuario/user';

export default function MePage() {
    useEffect(() => {
        const fetchData = async () => {
            const res = await UserService.getAllInfo();
            console.log(res);
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-row gap-4 mt-10">
            <div>
                
            </div>
        </div>
    );
}