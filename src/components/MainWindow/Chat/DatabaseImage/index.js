import { useContext } from 'react';
import { UserContext } from '../../../../App';
import '../style.scss'

export function DatabaseImage(props) {
    const { uid, text } = props.message;
    const user = useContext(UserContext);
    const messageClass = uid === user.uid ? 'sent' : 'received'

    return (
        <div className={`message ${messageClass}`}>
            <img
            src={text}
            alt='Db Image'
            width="300"
            height="200"
            />
        </div>
    )
}
