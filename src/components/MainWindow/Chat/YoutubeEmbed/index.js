import { useAuth } from '../../../UserContext';
import '../style.scss'

export function YoutubeEmbed(props) {
    const { uid, text } = props.message;
    const { currentUser } = useAuth();
    const messageClass = uid === currentUser.uid ? 'sent' : 'received'
    const videoId = /\?v=(.{11})/.exec(text)[1]

    return (
        <div className={`message ${messageClass}`}>
            <iframe 
            width="300"
            height="200"
            src={`https://www.youtube.com/embed/${videoId}`}
            />
        </div>
    )
}
