"use client";
import React from 'react';
import LoginComponent from '@/components/login/login';

export default function Page() {
    return (
        <div className="flex justify-center items-center pt-20">
            <LoginComponent type="admin"/>
        </div>
    )
}