import { useEffect, useState, useRef } from 'react';
import { getMessages } from '../../../firebase-utils';
import { ChatMessage } from './ChatMessage/index';
import YoutubeEmbed from './YoutubeEmbed/YoutubeEmbed';
import DatabaseImage from './DatabaseImage/DatabaseImage';
import './style.scss';

const msgComponents = {
    'text': ChatMessage,
    'ytVideo': YoutubeEmbed,
    'image': DatabaseImage,
};

// function scrollIntoView() {
//     return ref.current.scrollIntoView({behavior: 'smooth'});
// }

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const ref = useRef();

    useEffect( () => {
        getMessages()
            .then(setMessages)
            //.then(scrollIntoView)
            .catch((err)=> console.log(err));
    }, [messages]);

    
    return (
        <div className="chatContainer">
            {messages.map(msg => {
                const MsgComponent = msgComponents[msg.type];
                return <MsgComponent key={msg.id} message={msg}/>
            })}
            <div ref={ref}></div>
        </div>
    )
}
