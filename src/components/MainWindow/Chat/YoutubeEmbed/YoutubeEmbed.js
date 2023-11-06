import { auth } from '../../../../../firebase-config';
import '../style.scss'

export default function YoutubeEmbed(props) {
    const { uid, text } = props.message;
    const user = auth.currentUser;
    const messageClass = uid === user.uid ? 'sent' : 'received'
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
