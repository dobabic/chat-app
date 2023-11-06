import { logOut } from "../../firebase-utils"; 
import './style.scss';

export default function LogoutButton({ setUser }){

    function handleLogout(){
        logOut()
            .then(setUser(false))
            .catch((err)=> console.log(err));
    }
    return(
        <button className='Button' onClick={handleLogout}>Logout</button>
    )
}
