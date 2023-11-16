import './style.scss';
import { useContext } from 'react';
import { UserContext } from '../../../../../App';

const defaultImage = "https://placehold.co/200x200";

export default function User() {
    const currentUser = useContext(UserContext);

    return (
        <div className="user-container">
            <div className='user-image'>
                <img src={currentUser.photoURL || defaultImage} alt='User Image' />
            </div>
            <div className='user-info'>
                <span className='user-name'>{currentUser.displayName}</span>
            </div>
            <div className='links'>

            </div>
        </div>
    )
}
