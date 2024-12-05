"use client"
import { store } from '@/redux/store'
import {NextUIProvider} from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import React from 'react'
import { Provider } from 'react-redux'

const queryClient = new QueryClient()

const Providers = ({children}: { children: React.ReactNode }) => {
    return (
        <NextUIProvider className="h-full">
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    {children}
                </Provider>
            </QueryClientProvider>
        </NextUIProvider>
    )
}

export default Providers
