import { Metadata } from 'next';
import SignupCard from '../_components/signup-card';
import { getSession } from '@/actions/get-session';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Sign Up',
};

export default async function SignUpPage() {
  const user = await getSession();
  if (user) {
    return redirect('/');
  }
  return <SignupCard />;
}
