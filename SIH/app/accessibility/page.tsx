import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';

export default function AccessibilityPage() {
  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Accessibility"
        title="Accessible by default"
        description="Keyboard navigation, clear labels, and readable status text are part of the demo experience."
      />
      <Card className="mt-8 p-6">
        <p className="text-base leading-7 text-muted-foreground">
          If you need the application flow in a different format, the UI is structured to support assistive technologies and responsive layouts.
        </p>
      </Card>
    </Container>
  );
}
