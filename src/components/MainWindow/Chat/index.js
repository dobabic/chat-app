import { useEffect, useState } from 'react';
import { getMessages } from '../../../firebase-utils';
import { ChatMessage } from './ChatMessage/index';
import YoutubeEmbed from './YoutubeEmbed/YoutubeEmbed';
import DatabaseImage from './DatabaseImage/DatabaseImage';
import './style.scss';

export default function Chat() {
    const [messages, setMessages] = useState([])
    const msgComponents = {
        'text': ChatMessage,
        'ytVideo': YoutubeEmbed,
        'image': DatabaseImage,
    }

    useEffect( () => {
        getMessages()
            .then(setMessages)
            .catch((err)=> console.log(err));
    }, [messages])
    
    return (
        <div className="chatContainer">
            {messages.map(msg => {
                const MsgComponent = msgComponents[msg.type];
                return <MsgComponent key={msg.id} message={msg}/>
            })
            }
        </div>
    )
}
