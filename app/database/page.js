'use client'
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Page() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const [person, setPerson] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    
    useEffect(()=> {
        getPerson()
    },[])

    async function getPerson() {
        const {data: people } = await supabase.from('person').select('*')
        console.log(people)
        setPerson(people)
    }

    async function insertColum() {
        await supabase
            .from('person')
            .insert({firstname: firstName, lastname: lastName, email: email })
            .select()
    }
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Database</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl text-[#000]">Person: </h1>
                    <ul className="border-b border-gray-900/10 pb-12 divide-y divide-gray-100">
                        {person.map((item => (
                            <>
                                <li className="lex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{item.firstname}Lee Soon</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">lsoon@tailwind.com</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
                                    </div>
                                </li>
                            </>
                        )))}   
                        
                    
                    </ul>
                    <div className=" border-b border-gray-900/10 pb-12 pt-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                <div className="mt-2">
                                    <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" name="firstname" id="firstname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                <div className="mt-2">
                                    <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" name="lastname" id="lastname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Role</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button onClick={insertColum} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </div>
                
            </main>
        </>
    );
}