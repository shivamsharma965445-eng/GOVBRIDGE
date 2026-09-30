import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';

const helpSections = [
  {
    title: 'Using cases',
    text: 'Review each case ID, relevant service, and the current operational state before taking action. Follow the latest update and confirm the next decision step before closure.',
  },
  {
    title: 'Managing tasks',
    text: 'Prioritise top-risk items, assign owners where needed, and keep task deadlines aligned with SLA windows and department review cycles.',
  },
  {
    title: 'Handling exceptions',
    text: 'Review failure context, retry steps and manual recovery options. Escalate only when the workflow cannot be safely resolved without additional oversight.',
  },
  {
    title: 'Reviewing entity matches',
    text: 'Check confidence, evidence and human review requirements before confirming any identity-linking decision. Ambiguous matches should remain open until reviewed.',
  },
  {
    title: 'Understanding audit records',
    text: 'Use the audit timeline to explain who changed the case, when the event occurred and which decision path was followed during service review.',
  },
];

export default function OfficialHelpPage() {
  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={[
        { label: 'Overview', href: '/official' },
        { label: 'Cases', href: '/official/cases/GOV-2026-000184' },
        { label: 'Tasks', href: '/official/tasks' },
        { label: 'Exceptions', href: '/official/exceptions' },
        { label: 'Data Requests', href: '/official/data-requests' },
        { label: 'Entity Reviews', href: '/official/entity-reviews' },
        { label: 'Audit', href: '/official/audit' },
        { label: 'Analytics', href: '/official/analytics' },
      ]}
      secondaryActions={[{ label: 'Back to official console', href: '/official' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Official', href: '/official' },
        { label: 'Help' },
      ]}
      footerLinks={[
        { label: 'Overview', href: '/official' },
        { label: 'Tasks', href: '/official/tasks' },
        { label: 'Help', href: '/official/help' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Official support guidance keeps review work consistent, accountable and auditable."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Official help"
          title="Operational support" 
          description="Use these reference points to manage case work, exceptions, data requests and review decisions within the demo process."
        />

        <section className="mt-8 space-y-4">
          <SectionLabel>Console guidance</SectionLabel>
          <div className="space-y-4">
            {helpSections.map((section) => (
              <Card key={section.title} className="p-5 sm:p-6">
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.text}</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </AppShell>
  );
}
