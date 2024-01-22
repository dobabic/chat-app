import { redirect } from 'react-router-dom';
import { addToGroup, getDocumentById } from '../firebase-utils';

export default async function action({ params, request }) {
  const formData = await request.formData();
  const contactId = formData.get('contactId');
  const { groupId } = params;
  const contact = await getDocumentById(contactId);
  addToGroup(groupId, contact);
  return redirect('/');
}
