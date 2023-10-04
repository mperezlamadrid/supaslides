"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '../lib/supabase'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log("Session status: ", event);

                if (session == null) {
                    if (pathname != "/login") router.replace("/login")
                } else {
                    setUser(session?.user.user_metadata);
                    registerPerson(session?.user);

                    if (pathname == "/login") router.replace("/")
                }
            }
        );

        return () => {
            authListener.subscription;
        };
    }, []);

    async function signInWithGoogle() {;
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
            });

            if (error)
                throw new Error("An error occurred during authentication.");
            
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function registerPerson(user) {
        const { data: person, error } = await supabase.from('person')
            .select('email')
            .limit(1)
            .single()
            .eq('email', user.email);
      
        // PGRST116 code = JSON object requested, multiple (or no) rows returned
        if (error != null && error.code != "PGRST116") {
            console.error(`ERROR on person SELECT: ${error}`);
            return error;
        }
      
        if (person != null) {
            console.info(`Person with email: "${person.email}", exists on person table - aborting registerPerson()`);
            return null;
        }
      
        const names = user.user_metadata.name.split(" ", 2);
        const firstName = names.shift();
        const lastName = names.shift();
        
        const { errInsert } = await supabase.from('person')
          .insert({ id: user.id, firstname: firstName, lastname: lastName, email: user.email});
      
        if (errInsert != null) {
          console.error(`ERROR on person INSERT: ${errInsert}`);
      
          return errInsert;
        }
      
        console.info(`Added person with id: "${user.id}", to person table`);
      
        return null;
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw new Error("An error occurred during logout.");
    }
  
    return (
        <AuthContext.Provider value={{ signInWithGoogle, signOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};