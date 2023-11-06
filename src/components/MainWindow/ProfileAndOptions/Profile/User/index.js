import './style.scss';
import { loggedUser } from '../../../../../firebase-utils';

const defaultImage = "https://placehold.co/200x200";
const user = loggedUser;

export default function User() {
    return (
        <div className="user-container">
            <div className='user-image'>
                <img src={defaultImage} alt='User Image' />
            </div>
            <div className='user-info'>
                <span className='user-name'>{user.displayName}</span>
            </div>
            <div className='links'>

            </div>
        </div>
    )
}
