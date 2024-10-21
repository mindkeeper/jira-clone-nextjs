import { Metadata } from 'next';
import SigninCard from '../_components/signin-card';
import { getSession } from '@/actions/get-session';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign in',
};
export default async function SignInPage() {
  const user = await getSession();
  if (user) {
    return redirect('/');
  }
  return <SigninCard />;
}
