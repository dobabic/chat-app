import { logIn } from "../../firebase-utils"; 
import './style.scss';

export default function LoginButton({ setUser }){

    function handleSignIn(){
        logIn()
            .then(setUser)
            .catch((err)=> console.log(err));
    }
    return(
        <button className='Button' onClick={handleSignIn}>Sign in with Google</button>

    )
}
