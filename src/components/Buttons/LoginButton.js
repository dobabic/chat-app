import { logIn } from "../../firebase-utils"; 
import './style.scss';

export default function LoginButton(){

    function handleSignIn(){
        logIn()
    }
    return (
        <button className='Button' onClick={handleSignIn}>Sign in with Google</button>
    )
}
