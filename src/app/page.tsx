import { getSession } from '@/actions/get-session';
import UserButton from '@/components/user-button';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getSession();
  if (!user) return redirect('/sign-in');
  return (
    <div>
      <UserButton />
    </div>
  );
}
