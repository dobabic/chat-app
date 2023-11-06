import Linkify from "linkify-react";
import { auth } from '../../../../../firebase-config';
import '../style.scss'

export function ChatMessage(props){
    const { text, uid } = props.message;
    const user = auth.currentUser;
    const messageClass = uid === user.uid ? 'sent' : 'received'

    return(
        <div className={`message ${messageClass}`}>
            <Linkify as='p'>
                {text}
            </Linkify>
        </div>
    )
}
