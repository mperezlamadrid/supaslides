"use client"

import { UserAuth } from "../../context/auth"

export default function Page() {
    const { signInWithGoogle } = UserAuth();

    return (
      <>
        <h1>Sign Up Page</h1>
        <button onClick={ signInWithGoogle }>Login with Google</button>
      </>
    )
  }
  