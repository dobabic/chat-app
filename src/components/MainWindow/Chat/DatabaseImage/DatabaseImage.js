import { auth } from '../../../../../firebase-config';
import '../style.scss'

export default function DatabaseImage(props) {
    const { uid, text } = props.message;
    const user = auth.currentUser;
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
