import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';

export default function PrivacyPage() {
  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Privacy"
        title="Plain-language privacy information"
        description="This demo keeps only the minimum information needed to show the experience flow."
      />
      <Card className="mt-8 p-6">
        <p className="text-base leading-7 text-muted-foreground">
          No real government credentials or backend identity systems are connected in this workspace.
        </p>
      </Card>
    </Container>
  );
}
