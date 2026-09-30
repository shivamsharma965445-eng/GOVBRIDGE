'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { useAuth } from '@/lib/auth-context';

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.replace('/login');
  }, [logout, router]);

  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Logout"
        title="Signing you out"
        description="You will be redirected to the login page in a moment."
      />
      <Card className="mt-8 p-6">
        <p className="text-base leading-7 text-muted-foreground">Clearing your session now.</p>
      </Card>
    </Container>
  );
}
