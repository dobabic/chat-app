import './style.scss';
import { useEffect, useState } from 'react';
import { isUserLogged } from '../../../../../firebase-utils';

const defaultImage = "https://placehold.co/200x200";

export default function User() {
    const [user, setUser] = useState({})

    useEffect( () => {
        isUserLogged()
            .then(setUser)
            .catch((err)=> console.log(err));
    }, [])

    return (
        <div className="user-container">
            <div className='user-image'>
                <img src={user.photoURL || defaultImage} alt='User Image' />
            </div>
            <div className='user-info'>
                <span className='user-name'>{user.displayName}</span>
            </div>
            <div className='links'>

            </div>
        </div>
    )
}
