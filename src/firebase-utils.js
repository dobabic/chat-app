import {
  addDoc, collection, serverTimestamp, onSnapshot, query, orderBy,
} from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, provider } from 'Config';

const messagesRef = collection(db, 'messages');
const contactRef = collection(db, 'contacts');

export async function logIn() {
  return signInWithPopup(auth, provider);
}

export async function logOut() {
  return signOut(auth);
}

export async function sendMessage(newMessage) {
  const youtubeRegex = /^(?:https?:\/\/)?(?:(?:www\.)?youtube.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
  const firebaseRegex = /^(?:https?:\/\/)?(?:firebasestorage\.googleapis\.com)/;
  const { uid } = auth.currentUser;

  function determineMsgType(message) {
    if (youtubeRegex.test(message)) return 'ytVideo';
    if (firebaseRegex.test(message)) return 'image';
    return 'text';
  }

  await addDoc(messagesRef, {
    text: newMessage,
    createdAt: serverTimestamp(),
    type: determineMsgType(newMessage),
    sender: uid,
  });
}

export function getCollection(query) {
  const promise = new Promise((resolve, reject) => {
    try {
      onSnapshot(query, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        resolve(data);
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
  return promise;
}

export async function getMessages() {
  const messagesQuery = query(messagesRef, orderBy('createdAt'));
  return getCollection(messagesQuery);
}

export async function getContacts() {
  const contactsQuery = query(contactRef);
  return getCollection(contactsQuery);
}
