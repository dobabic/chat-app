import { useAuth } from '../../../UserContext';
import '../style.scss';

export function DatabaseImage(props) {
  const { uid, text } = props.message;
  const { currentUser } = useAuth();
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={text}
        alt="Db Image"
        width="300"
        height="200"
      />
    </div>
  );
}
