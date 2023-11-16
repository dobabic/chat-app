import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";


//1. login via login button
//2. onAuthStateChanged u Context component se triggera
//3. unutar OASC setUser state
//4. taj state se dijeli dalje down-the-tree

//1. dodati onAuthStateChanged koji ce popunit useState koji cu koristit u createContext
//1a.On login populate user context variable via onAuthStateChanged

// Pass that value to other components 

const UserContext = createContext(null);


export function useAuth() {
    return useContext(UserContext)
}

export function AuthProvider() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user) {
                setCurrentUser(user)
            } else {
                console.log(`User: ` + null)
            }
        })
        return unsubscribe
      }, [])

    //   return (

    //   )
}