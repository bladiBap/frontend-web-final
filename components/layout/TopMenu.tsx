"use client"
import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux';
import { AuthService } from '../../services/usuario/auth/auth';

const TopMenu = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();
    const router = useRouter();
    const urls = [
        {
            name: 'INICIO',
            path: '/'
        },
        {
            name: 'CUESTIONARIOS',
            path: '/user/cuestionario'
        },
        {
            name: 'TAREAS',
            path: '/tarea'
        }
    ]

    const handleLogout = () => {
        AuthService.logout().then(() => {
            dispatch({  
                type: "user/logout",
                payload: {}
            })
            router.push('/');
        });
    }

    return (
        <Navbar isBordered
            isMenuOpen={isOpen}
            onMenuOpenChange={setIsOpen}
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "items-center",
                    "justify-center",
                    "text-black",
                    "font-bold",
                    "data-[active=true]:text-primary",
                    "after:content-['']",
                    "after:absolute",
                    "after:-bottom-1",
                    "after:left-0",
                    "after:right-0",
                    "after:h-[0px]",
                    "data-[active=true]:after:h-[2px]",
                    "after:transition-all",
                    "after:duration-150",
                    "after:rounded-[2px]",
                    "after:bg-primary",
                ],
            }}
        >
            <NavbarContent justify='start'> 
                <NavbarBrand className='h-full'>
                    <p className='typography-h1 cursor-pointer'
                        onClick={() => router.push('/')}
                    >NURQUESTS</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {urls.map((url, index) => (
                    <NavbarItem isActive={
                        path === url.path
                    } key={index}
                    className={`
                        transition-color duration-300
                        hover:after:h-[2px]
                        hover:text-primary
                    `}
                    >
                        <Link href={url.path}>
                            {url.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent className='flex gap-2 justify-end' justify='end'>
                {  user.is_logged ? (
                    <NavbarItem>
                        <Button color="primary" variant="flat" onPress={handleLogout}>
                            Cerra Sesion
                        </Button>
                    </NavbarItem>):(
                    <NavbarItem className="hidden lg:flex">
                        <Link href="/login/user">Iniciar Sesion</Link>
                    </NavbarItem>
                )

                }
                
                
            
                <NavbarMenuToggle className="sm:hidden"/>
            </NavbarContent>
            <NavbarMenu>
                {urls.map((url, index) => (
                    <NavbarItem
                        isActive={
                            path === url.path
                        }
                        key={index}
                        className='w-fit'
                        onClick={() => setIsOpen(false)}
                    >
                        <Link href={url.path}>
                            {url.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default TopMenu