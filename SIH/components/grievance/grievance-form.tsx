'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/ui/page-header';
import { FormField } from '@/components/apply/form-field';
import { FormSection } from '@/components/apply/form-section';
import { FormError } from '@/components/apply/form-error';
import { demoGrievanceData, type GrievanceData } from '@/lib/grievance-data';
import { GrievanceSummary } from './grievance-summary';
import { GrievanceStatus } from './grievance-status';

const grievanceCategories = [
  'Status update',
  'Document issue',
  'Timeline concern',
  'Payment question',
  'Other',
];

interface GrievanceFormProps {
  caseId: string;
}

export function GrievanceForm({ caseId }: GrievanceFormProps) {
  const [form, setForm] = React.useState({
    category: demoGrievanceData.category,
    caseId,
    description: demoGrievanceData.description,
    supportingInformation: demoGrievanceData.supportingInformation,
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [grievance, setGrievance] = React.useState<GrievanceData>(demoGrievanceData);

  React.useEffect(() => {
    setForm((current) => ({
      ...current,
      caseId,
    }));
    setGrievance((current) => ({
      ...current,
      caseId,
    }));
  }, [caseId]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.category.trim()) nextErrors.category = 'Select a category.';
    if (!form.caseId.trim()) nextErrors.caseId = 'Enter the case ID.';
    if (!form.description.trim()) nextErrors.description = 'Describe the issue in a few words.';
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setGrievance({
      ...demoGrievanceData,
      caseId: form.caseId,
      category: form.category,
      description: form.description,
      supportingInformation: form.supportingInformation,
      status: 'Under Review',
      resolution: 'The grievance has been received and is under review.',
    });
    setSubmitted(true);
  };

  return (
    <Container className="py-8 sm:py-12">
      <div className="space-y-8">
        <PageHeader
          eyebrow="Grievance"
          title="Raise a case concern"
          description="Use this simple form to ask for help on a specific case. The interface avoids unnecessary fields and keeps the process easy to follow."
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Grievance form" noValidate>
            <FormSection
              eyebrow="Create grievance"
              title="Tell us what needs attention"
              description="Only the minimum details needed for routing and response are requested."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="category" label="Category" required error={errors.category}>
                  <select
                    id="category"
                    value={form.category}
                    required
                    aria-invalid={Boolean(errors.category)}
                    onChange={(event) => updateField('category', event.target.value)}
                    className="min-h-[44px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)]"
                  >
                    <option value="">Select a category</option>
                    {grievanceCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="caseId" label="Case ID" required error={errors.caseId} helpText="Use the case you want help with.">
                  <Input
                    id="caseId"
                    value={form.caseId}
                    required
                    aria-invalid={Boolean(errors.caseId)}
                    onChange={(event) => updateField('caseId', event.target.value)}
                    className="min-h-[44px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)]"
                    inputMode="text"
                  />
                </FormField>
              </div>

              <div className="mt-5">
                <FormField id="description" label="Description" required error={errors.description} helpText="Explain the issue in plain language.">
                  <textarea
                    id="description"
                    value={form.description}
                    required
                    aria-invalid={Boolean(errors.description)}
                    onChange={(event) => updateField('description', event.target.value)}
                    className="min-h-[120px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)]"
                  />
                </FormField>
              </div>

              <div className="mt-5">
                <FormField id="supportingInformation" label="Optional supporting information" helpText="Add anything helpful, but you do not need to attach sensitive personal details.">
                  <textarea
                    id="supportingInformation"
                    value={form.supportingInformation}
                    onChange={(event) => updateField('supportingInformation', event.target.value)}
                    className="min-h-[100px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)]"
                  />
                </FormField>
              </div>

              <FormError message={Object.values(errors)[0]} />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit">Submit grievance</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setForm({ ...form, supportingInformation: '' })}
                >
                  Clear optional info
                </Button>
              </div>
            </FormSection>
          </form>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <GrievanceSummary grievance={grievance} />

            <Card className="p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Status guidance
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <GrievanceStatus status={grievance.status} />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Support states are kept simple: Created, Under Review, and Resolved.
              </p>
            </Card>
          </aside>
        </div>

        {submitted ? (
          <Card className="border-[#D7E9D7] bg-[#F3FAF4] p-5 text-sm leading-6 text-[#1F5B36]">
            Your grievance has been created in demo mode and is ready for future processing.
          </Card>
        ) : null}
      </div>
    </Container>
  );
}
