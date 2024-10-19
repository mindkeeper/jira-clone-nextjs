import { Metadata } from 'next';
import SigninCard from '../_components/signin-card';

export const metadata: Metadata = {
  title: 'Sign in',
};
export default function SignInPage() {
  return <SigninCard />;
}
