"use client"
import { UserAuth } from "../context/auth"

export default function Home() {
  const { user } = UserAuth();
  return (
    <>
      <header className={`${Object.keys(user).length != 0 ? '' : 'hidden'} bg-white shadow`}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

        </div>
      </main>
    </>
  )
}