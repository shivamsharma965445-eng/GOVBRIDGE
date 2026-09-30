import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Sign In - GovBridge',
  description: 'Secure authentication for GovBridge services',
};

export default function LoginPage() {
  return <LoginForm />;
}
