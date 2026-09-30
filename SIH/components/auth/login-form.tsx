'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useAuth, type UserRole } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';

const demoAccounts: Array<{ name: string; email: string; role: UserRole }> = [
  { name: 'Priya Sharma', email: 'priya@demo.gov', role: 'citizen' },
  { name: 'Rajesh Kumar', email: 'rajesh@demo.gov', role: 'official' },
  { name: 'Dr. Anita Patel', email: 'anita@demo.gov', role: 'admin' },
];

const getRoleDestination = (role: UserRole) => {
  if (role === 'official') return '/official';
  if (role === 'admin') return '/admin';
  return '/dashboard';
};

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showDemo, setShowDemo] = React.useState(false);

  const handleDemoLogin = (account: (typeof demoAccounts)[0]) => {
    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      login({
        id: account.email,
        name: account.name,
        email: account.email,
        role: account.role,
        isDemo: true,
      });
      router.push(getRoleDestination(account.role));
    }, 600);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter an email address.');
      return;
    }

    setError('Real authentication is not yet available. Use the demo access below to continue exploring GovBridge.');
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
        <Container className="max-w-md py-0">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Citizen portal
            </p>
            <h1 className="mt-4 font-display text-3xl leading-none tracking-[-0.04em] text-foreground sm:text-4xl">
              Sign in to continue
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              GovBridge uses federated identity so you can access supported services through one
              secure sign-in experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Card className="border-border bg-card p-5">
              <label htmlFor="email" className="mb-3 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.gov"
                required
                autoComplete="email"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'email-error' : undefined}
                disabled={isSubmitting}
                className="min-h-[48px]"
              />
              {error ? (
                <p id="email-error" className="mt-3 text-sm text-[#dc2626]" aria-live="polite">
                  {error}
                </p>
              ) : null}
            </Card>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px]"
              >
                {isSubmitting ? 'Authenticating…' : 'Continue with Government Identity'}
              </Button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowDemo(!showDemo)}
                className="w-full inline-flex min-h-[48px] items-center justify-center rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                {showDemo ? 'Hide demo access' : 'Try demo access'}
              </button>
            </div>
          </form>

          {showDemo ? (
            <Card className="mt-6 border-border border-l-4 border-l-accent bg-muted p-5">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                Demo mode
              </p>
              <p className="mb-5 text-sm leading-6 text-muted-foreground">
                These demo accounts let you explore GovBridge without real credentials. Each role
                sees a different interface.
              </p>

              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => handleDemoLogin(account)}
                    disabled={isSubmitting}
                    className="w-full rounded-md border border-border bg-card p-3 text-left transition-colors hover:bg-background disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                  >
                    <div className="text-sm font-medium text-foreground">{account.name}</div>
                    <div className="text-xs text-muted-foreground">{account.role}</div>
                  </button>
                ))}
              </div>

              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Demo access stores your session in the browser. Reload the page to log out.
              </p>
            </Card>
          ) : null}

          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/services" className="font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
                Explore services instead
              </Link>
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card p-4 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Frontend demo
            </p>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">
              This interface is frontend-ready and designed to connect to a real OIDC/Keycloak
              authentication system in production.
            </p>
          </div>
        </Container>
      </div>
    </main>
  );
}
