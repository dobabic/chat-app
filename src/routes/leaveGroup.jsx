import { redirect } from 'react-router-dom';
import { leaveGroup } from '../firebase-utils';

export default async function action({ params, request }) {
  const formData = await request.formData();
  const userId = formData.get('currentUser');
  const { groupId } = params;
  await leaveGroup(userId, groupId);
  return redirect('/');
}
