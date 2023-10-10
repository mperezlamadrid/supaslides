'use client'
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Image from "next/image"

export default function Page() {
    const [person, setPerson] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [success, setSuccess] = useState(false)
    const [content, setContent] = useState(false)
    const [updateBTN, setUpdateBTN] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [personID, setPersonID] = useState('')

    useEffect(() => {
        
        // FETCH PERSON DATA
        const getPerson = async () => {
            const {data: people} = await supabase.from('person').select('*')
            setPerson(people)
        }
        getPerson()

    },[firstName])

    function emptyPerson() {
        setFirstName('')
        setLastName('')
        setEmail('')
        setRole('')
        setImageURL('')
        setAlertMessage('')
    }

    // INSERT PERSON DATA
    async function addPerson() {
        await supabase.from('person').insert(
            {
                firstname: firstName, 
                lastname: lastName, 
                email: email, 
                role: role,
                image: imageURL
            }).select()
        setSuccess(true)
        setContent(false)
        emptyPerson()
        setTimeout(function(){
            setSuccess(false)
        }, 7000);
    }    

    // UPLOAD IMAGE - BUCKET
    async function handleInputChange(e) {
        const file = e.target.files[0]
        const {data, error} = await supabase.storage.from('avatars').upload(`${file.name}`, file)
        if (error) {
            setAlertMessage(`This image wasn't uploaded. ${error.message}`)
            console.log(error);
        } else {
            setAlertMessage(`This image was uploaded`)
            setImage(file.name)
            console.log(data);
            getURLImage(file.name)
        }
    }

    // GET URL IMAGE
    async function getURLImage(img) {
        const {data, error} = supabase.storage.from('avatars').getPublicUrl(img)
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            setImageURL(data.publicUrl)
        }
    }

    // FILL PERSON DATA
    async function fillPersonFields(personID) {
        setContent(true)
        setUpdateBTN(true)
        setPersonID(personID)
        const { data:people } = await supabase
        .from('person')
        .select('*')
        .eq('id', personID)
        setFirstName(people[0].firstname)
        setLastName(people[0].lastname)
        setEmail(people[0].email)
        setRole(people[0].role)
        setImageURL(people[0].image)
    }

    // UPDATE PERSON DATA
    async function handleUpdatePerson() {
        await supabase
        .from('person')
        .update(
            {
                firstname: firstName, 
                lastname: lastName, 
                email: email, 
                role: role,
                image: imageURL
            }
        )
        .eq('id', personID)
        .select()
        setSuccess(true)
        setContent(false)
        emptyPerson()
        setTimeout(function(){
            setSuccess(false)
        }, 7000);
    }

    // DELETE PERSON DATA
    async function deletePerson(id) {
        await supabase
            .from('person')
            .delete()
            .eq('id', id)
        location.reload()
    }

    return (
        <>  
            <div className={`fixed w-full`}>
                <div className="relative mx-auto max-w-7xl">
                    <div className={`${success ? 'visible slide-left z-20' : 'invisible z-0'} animation absolute top-0 -right-16 flex w-80 flex-col items-end hover:scale-110`}>
                        <div className="shadow-xl pointer-events-auto w-full max-w-xs overflow-hidden rounded-md bg-white ring-2 ring-gray-200/50">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                        <svg className="text-green-400 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Successfully {updateBTN ? 'updated' : 'saved'}!</p>
                                        <p className="hidden text-gray-500 text-sm mt-1">{firstName} was added correctly!</p>
                                    </div>
                                    <div className="shrink-0 flex ml-4">
                                        <button onClick={() => {setSuccess(false)}}type="button" className="inline-flex rounded-md bg-white text-gray-400">
                                            <span className="hidden">Close</span>
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Database</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    { content ? 
                        <>
                            <div className="border-b border-gray-900/10 pb-12 mb-6">
                                <div className="p-12 bg-white rounded-xl border-b border-gray-900/10 pb-12 pt-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                            <div className="mt-2">
                                                <input onChange={(e) => setFirstName(e.target.value) }  value={firstName} type="text" name="firstname" id="firstname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                            <div className="mt-2">
                                                <input onChange={(e) => setLastName(e.target.value) }  value={lastName} type="text" name="lastname" id="lastname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                            <div className="mt-2">
                                                <input onChange={(e) => setEmail(e.target.value) }  value={email} id="email" name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Role</label>
                                            <div className="mt-2">
                                                <input onChange={(e) => setRole(e.target.value) } value={role} id="role" name="role" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                            <div className="mt-2 flex items-center gap-x-3">
                                                { imageURL.length != 0 ? 
                                                    
                                                    <Image className="h-12 w-12 flex-none rounded-full bg-gray-50" src={imageURL} alt="" width={50} height={50} />
                                                    :
                                                    <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                                    </svg>
                                                }
                                                
                                                <p className="mt-1 text-xs leading-5 text-gray-500">{alertMessage}</p>
                                            </div>
                                        </div>
                                            
                                        <div className="col-span-full">
                                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                <div className="text-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input 
                                                        onChange={ (e)=> {handleInputChange(e)} } 
                                                        id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-6">
                                <button onClick={ () => setContent(!content)} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                { !updateBTN ? 
                                    <button onClick={addPerson} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                    :
                                    <button onClick={() => handleUpdatePerson(personID)} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
                                }
                            </div>
                            
                        </>
                            :
                        <>
                            <div className="border-b border-gray-900/10 mb-6">
                                <div className="p-12 bg-white rounded-xl mb-12">
                                    <h1 className="text-2xl text-[#000]">Person: </h1>
                                    <ul role="list" className="divide-y divide-gray-100">
                                        { person.length != 0 ? 
                                            <>
                                                { person.map(item => (
                                                    <>
                                                        <li key={item.id} className="flex justify-between gap-x-6 py-5 last:pb-0 ">
                                                            <div className="flex min-w-0 gap-x-4">
                                                            { item.image != '' ? 
                                                    
                                                                <Image className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.image} alt="" width={50} height={50} />
                                                                :
                                                                <svg className="h-14 w-14 -ml-1 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                                                </svg>
                                                            }
                                                                <div className="min-w-0 flex-auto">
                                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.firstname} {item.lastname}</p>
                                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.email} - {item.image.length != 0 }</p>
                                                                </div>
                                                            </div>
                                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                                <p className="text-sm leading-6 text-gray-900">{item.role || 'Dev'}</p>
                                                                <div className="flex flex-row gap-x-2 mt-3">
                                                                    <button onClick={() => {fillPersonFields(item.id)}} className="text-xs text-blue-300 animate hover:opacity-70">Update</button>
                                                                    <button onClick={()=> {deletePerson(item.id)}} className="text-xs text-red-300 animate hover:opacity-70">Delete</button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>
                                                ))}
                                            </>
                                         : <div className="items-center text-sm font-semibold text-gray-700 mt-4 ">There is no registered person yet!</div> }
                                    </ul>
                                </div>  
                            </div>
                            <div className="flex items-center justify-end gap-x-6">
                                <button onClick={ () => {setContent(!content); setUpdateBTN(false); emptyPerson()}} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Person</button>
                            </div>
                        </>
                    }
                </div>
            </main>
        </>
    );
}