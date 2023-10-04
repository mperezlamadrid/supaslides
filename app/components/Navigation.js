"use client"

import { UserAuth } from "../../context/auth"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation";

const Navigation = () => {
    const { user, signOut } = UserAuth();
    const [menuButton, setMenuButton] = useState(true)
    const pathname = usePathname();


    function handleClick() {
        setMenuButton(!menuButton)
    }

    return (
        <nav className={`${Object.keys(user).length != 0 ? '' : 'hidden'} bg-gray-800`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                    Logo
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">

                    <Link className={`${pathname == "/" ? "bg-gray-900 text-white" : "text-gray-300"} hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} href="/" aria-current="page">Dashboard</Link>
                    <Link href="/products" className={`${pathname == "/products" ? "bg-gray-900 text-white" : "text-gray-300"}  hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}>Products</Link>
                    <Link href="/tasks" className={`${pathname == "/tasks" ? "bg-gray-900 text-white" : "text-gray-300"}  hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}>Tasks</Link>
                    <Link href="/database" className={`${pathname == "/database" ? "bg-gray-900 text-white" : "text-gray-300"}  hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}>Database</Link>
                    <Link href="/storage" className={`${pathname == "/storage" ? "bg-gray-900 text-white" : "text-gray-300"}  hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}>Storage</Link>
                    </div>
                </div>
                </div>
                <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                    <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    </button>


                    { Object.keys(user).length > 0 && 
                        <div className="relative ml-3">
                            <div>
                                <button onClick={ handleClick }type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                <Image className="h-8 w-8 rounded-full" src={user.avatar_url} alt="" width={100} height={50}/>
                                </button>
                            </div>
                            <div className={` ${menuButton ? 'hidden' : ''} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <span className="px-4 py-2 block text-sm text-gray-700 font-bold">Welcome:</span>
                                <span className="px-4 block text-sm text-gray-700">{user.name}</span>
                                <span className="px-4 block pb-1 text-sm text-gray-700">{user.email}</span>
                                <button type="button" onClick={ signOut } href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
                            </div>
                        </div>
                    }
                </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                
                <button type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    
                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>
            </div>

        
            <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            
                <Link href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</Link>
                <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</Link>
                <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</Link>
                <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</Link>
                <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Reports</Link>
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                    <Image className="h-10 w-10 rounded-full" src={user.avatar_url} alt="" width={100} height={50}/>
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{user.full_name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                </div>
                <button type="button" className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</Link>
                <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</Link>
                <button type="button" onClick={ signOut } className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</button>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Navigation;