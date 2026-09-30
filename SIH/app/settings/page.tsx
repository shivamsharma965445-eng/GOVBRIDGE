import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';

export default function SettingsPage() {
  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Settings"
        title="Account and preferences"
        description="Settings are intentionally lightweight in this demo-first workspace."
      />
      <Card className="mt-8 p-6">
        <p className="text-base leading-7 text-muted-foreground">
          Future account preferences, profile options, and notification controls can be added here.
        </p>
      </Card>
    </Container>
  );
}
