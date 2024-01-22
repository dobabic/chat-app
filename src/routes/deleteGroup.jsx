import { redirect } from 'react-router-dom';
import { deleteGroup } from '../firebase-utils';

export default async function action({ params }) {
  const { groupId } = params;

  await deleteGroup(groupId);
  return redirect('/');
}
