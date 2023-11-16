import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";


//1. login via login button
//2. onAuthStateChanged u Context component se triggera
//3. unutar OASC setUser state
//4. taj state se dijeli dalje down-the-tree

//1. dodati onAuthStateChanged koji ce popunit useState koji cu koristit u createContext
//1a.On login populate user context variable via onAuthStateChanged

// Pass that value to other components 

function placeHolderName() {
    const [user, setUser] = useState();

    onAuthStateChanged(auth, (user) => {
        if(user) {
            console.log(placeHolderName);
            setUser(user);
        } else {
            console.log(null, 'placeHolder')
        }
    })
}

// const user = await isUserLogged();
// export const UserContext = createContext();
