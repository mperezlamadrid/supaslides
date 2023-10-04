'use client'
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"
import { useState } from "react"

export default function Page() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const [alertMessage, setAlertMessage] = useState('')
    const [imgURL, setImgURL] = useState('')
    const [fileName, setFileName] = useState('')

    async function handleInputChange(e) {
        const file = e.target.files[0]
        const {data, error } = await supabase.storage.from('avatars').upload(`${file.name}`, file)
        if(error){
            console.log(error);
            setAlertMessage(`The image wasn't uploaded`)
        } else {
            console.log(data);
            setFileName(file.name)
            setAlertMessage(`The image ${file.name} was uploaded!`)
        }
    }

    async function handleClick() {
        const {data} = await supabase.storage.from('avatars').getPublicUrl(fileName)
        if (data){
            console.log(data)
            setImgURL(data.publicUrl)
        }
    }

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Storage</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <form className='pt-10 max-w-screen-xl mx-auto'>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-xl font-semibold leading-7 text-gray-900">Storage </h1>
                        <p className="mt-1 text-sm leading-6 text-gray-600">{alertMessage}</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className=" col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <Image src={imgURL} width={300} height={300} alt={fileName}/>
                            </div>
                            </div>

                            <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Avatar</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input onChange={(e) => {handleInputChange(e)}}
                                            id="file-upload" 
                                            name="file-upload" 
                                            type="file"
                                            accept='image/*' 
                                            className="sr-only"/>
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

                    <div className=" mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button onClick={handleClick} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Load Image</button>
                    </div>
                    </form>
                </div>
            </main>
        </>
    )
}