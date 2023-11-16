import { logOut } from "../../firebase-utils"; 
import './style.scss';

export default function LogoutButton({ setCurrentUser }){
    function handleLogout(){
        logOut()
        .then(setCurrentUser)
    }
    return (
        <button className='Button' onClick={handleLogout}>Logout</button>
    )
}
