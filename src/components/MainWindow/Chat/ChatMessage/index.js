import Linkify from "linkify-react";
import { useContext } from 'react';
import { UserContext } from "../../../../App";
import '../style.scss'

export function ChatMessage(props){
    const user = useContext(UserContext);
    const { text, uid } = props.message;
    const messageClass = uid === user.uid ? 'sent' : 'received'

    return(
        <div className={`message ${messageClass}`}>
            <Linkify as='p'>
                {text}
            </Linkify>
        </div>
    )
}
