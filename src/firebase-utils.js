import {
  doc, setDoc, addDoc, getDoc, updateDoc, collection, serverTimestamp, onSnapshot,
  query, orderBy, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, provider } from 'Config';

const messagesRef = collection(db, 'messages');
const contactRef = collection(db, 'contacts');
const messagesQuery = query(messagesRef, orderBy('createdAt'));
const contactsQuery = query(contactRef);

export async function logIn() {
  return signInWithPopup(auth, provider);
}

export async function logOut() {
  return signOut(auth);
}

export async function addUserOnLogin(user) {
  const docRef = doc(db, 'contacts', user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(doc(db, 'contacts', user.uid), {
      name: user.displayName,
      uid: user.uid,
      contacts: [],
    });
  }
}

export async function addContact(updates) {
  const docRef = doc(db, 'contacts', `${updates.currentUser}`);

  await updateDoc(docRef, {
    contacts: arrayUnion(`${updates.newContactId}`),
  });
}

export async function deleteContact(id, uid) {
  const docRef = doc(db, 'contacts', `${uid}`);

  await updateDoc(docRef, {
    contacts: arrayRemove(`${id}`),
  });
}

export async function sendMessage(newMessage, receiverId) {
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
    receiver: receiverId || null,
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
  return getCollection(messagesQuery);
}

export async function getUsers() {
  return getCollection(contactsQuery);
}

export function getUserContacts(userId, callback) {
  const docRef = doc(db, 'contacts', `${userId}`);
  onSnapshot(docRef, (doc) => {
    const data = doc.data();
    callback(data.contacts);
  });
}

export function getMsgs(callback) {
  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(messages);
  });
}

export function getContacts(callback) {
  onSnapshot(contactsQuery, (snapshot) => {
    const contacts = snapshot.docs.map((doc) => ({ ...doc.data() }));
    callback(contacts);
  });
}
