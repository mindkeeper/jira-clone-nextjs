import { Metadata } from 'next';
import SignupCard from '../_components/signup-card';
export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return <SignupCard />;
}
