"use client"

import { UserAuth } from "../context/auth"
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { user, signOut } = UserAuth();

  return (
    <>
      <div>
        <h1>Home Page</h1>

        <Link href="/products">Products</Link>
        <br></br>
        <Link href="/tasks">Tasks</Link>
        <br></br>
        <br></br>

        <div>
          <Image src={user.avatar_url} width={40} height={40} alt="user"/>
          <h2>Welcome {user.full_name}</h2>
        </div>

        <button onClick={ signOut }>Sign Out</button>
      </div>
    </>
  )
}