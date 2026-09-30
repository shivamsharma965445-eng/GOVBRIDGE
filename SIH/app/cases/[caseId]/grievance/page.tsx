import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { GrievanceForm } from '@/components/grievance/grievance-form';

interface GrievancePageProps {
  params: { caseId: string };
}

export default function GrievancePage({ params }: GrievancePageProps) {
  if (params.caseId !== 'GOV-2026-000184') {
    notFound();
  }

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Services', href: '/services' },
        { label: 'Applications', href: '/applications' },
        { label: 'Support', href: '/support' },
      ]}
      mobileNavItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Services', href: '/services' },
        { label: 'Applications', href: '/applications' },
        { label: 'Support', href: '/support' },
      ]}
      secondaryActions={[{ label: 'Back to case', href: `/cases/${params.caseId}` }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Applications', href: '/applications' },
        { label: params.caseId, href: `/cases/${params.caseId}` },
        { label: 'Grievance' },
      ]}
      footerLinks={[
        { label: 'Privacy', href: '/privacy' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Grievances are written in plain language and kept case-specific."
    >
      <GrievanceForm caseId={params.caseId} />
    </AppShell>
  );
}
