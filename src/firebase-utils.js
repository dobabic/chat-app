import {
  doc, setDoc, addDoc, getDoc, deleteDoc, updateDoc, collection, serverTimestamp, onSnapshot,
  query, orderBy, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, provider } from 'Config';

const messagesRef = collection(db, 'messages');
const usersRef = collection(db, 'users');
const groupsRef = collection(db, 'groups');
const messagesQuery = query(messagesRef, orderBy('createdAt'));
const usersQuery = query(usersRef);
const groupsQuery = query(groupsRef);

export async function logIn() {
  return signInWithPopup(auth, provider);
}

export async function logOut() {
  return signOut(auth);
}

export async function addUserOnLogin(user) {
  const docRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      uid: user.uid,
      contacts: [],
    });
  }
}

export async function addContact(data) {
  const docRef = doc(db, 'users', `${data.currentUser}`);

  await updateDoc(docRef, {
    contacts: arrayUnion(`${data.newContactId}`),
  });
}

export async function deleteContact(id, currentUserId) {
  const docRef = doc(db, 'users', `${currentUserId}`);

  await updateDoc(docRef, {
    contacts: arrayRemove(`${id}`),
  });
}

export async function createGroup(data) {
  const { groupName, userId, userName } = data;

  await addDoc(groupsRef, {
    name: groupName,
    admin: userId,
    members: [{
      name: userName,
      id: userId,
    }],
  });
}

export async function addToGroup(groupId, contact) {
  const docRef = doc(db, 'groups', `${groupId}`);
  const { name, id } = contact;

  await updateDoc(docRef, {
    members: arrayUnion({ name, id }),
  });
}

export async function removeFromGroup(contactId, groupId) {
  const docRef = doc(db, 'groups', `${groupId}`);
  const docSnap = (await getDoc(docRef)).data();
  const arr = docSnap.members.find((obj) => obj.id === contactId);

  await updateDoc(docRef, {
    members: arrayRemove(arr),
  });
}

export async function leaveGroup(userId, groupId) {
  const docRef = doc(db, 'groups', `${groupId}`);
  const docSnap = (await getDoc(docRef)).data();
  const arr = await docSnap.members.find((obj) => obj.id === userId);

  await updateDoc(docRef, {
    members: arrayRemove(arr),
  });
}

export async function deleteGroup(groupId) {
  const docRef = doc(db, 'groups', `${groupId}`);
  await deleteDoc(docRef);
}

export async function getDocumentById(Id) {
  const collection = Id.length < 28 ? 'groups' : 'users';
  const docRef = doc(db, collection, `${Id}`);
  const docSnapshot = await getDoc(docRef);
  const docSnapshotWithId = { id: docSnapshot.id, ...docSnapshot.data() };
  return docSnapshotWithId;
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
    name: auth.currentUser.displayName,
    sender: uid,
    receiver: receiverId || null,
  });
}

// id: doc.id used in private chats (try to find better solution)
// export function getCollection(query) {
//   const promise = new Promise((resolve, reject) => {
//     try {
//       onSnapshot(query, (snapshot) => {
//         const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//         resolve(data);
//       });
//     } catch (err) {
//       console.log(err);
//       reject(err);
//     }
//   });
//   return promise;
// }

// export async function getMessages() {
//   return getCollection(messagesQuery);
// }

// export async function getUsers() {
//   return getCollection(usersQuery);
// }

// export async function getGroups() {
//   return getCollection(groupsQuery);
// }

export function getUserContacts(userId, callback) {
  const docRef = doc(db, 'users', `${userId}`);
  onSnapshot(docRef, (snapshot) => {
    const data = snapshot.data();
    callback(data.contacts);
  });
}

export function getMessages(callback) {
  onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(messages);
  });
}

export function getUsers(callback) {
  onSnapshot(usersQuery, (snapshot) => {
    const users = snapshot.docs.map((doc) => ({ ...doc.data() }));
    callback(users);
  });
}

export function getGroups(callback) {
  onSnapshot(groupsQuery, (snapshot) => {
    const groups = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(groups);
  });
}

export function getGroup(groupId, callback) {
  const docRef = doc(db, 'groups', `${groupId}`);
  onSnapshot(docRef, (snapshot) => {
    const group = snapshot.data();
    callback(group);
  });
}
