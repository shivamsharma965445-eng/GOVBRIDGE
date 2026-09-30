'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Divider } from '@/components/ui/divider';
import { Input } from '@/components/ui/input';
import { FormField } from './form-field';
import { FormSection } from './form-section';
import { StepIndicator } from './step-indicator';
import { ReviewSummary } from './review-summary';
import {
  defaultScholarshipDraft,
  emptyScholarshipDraft,
  formatCurrency,
  formatDisplayDate,
  getScholarshipProgress,
  scholarshipApplicationCaseId,
  scholarshipDraftStorageKey,
  scholarshipSteps,
  type ScholarshipApplicationDraft,
  type ScholarshipApplicationState,
  type ScholarshipStep,
  type ValidationErrors,
  validateApplicantStep,
  validateEligibilityStep,
  validateSupportingStep,
} from '@/lib/scholarship-application';
import { AppShell } from '@/components/layout/app-shell';

const citizenNavItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Services', href: '/services' },
  { label: 'Applications', href: '/dashboard' },
  { label: 'Help', href: '/support' },
];

const initialState: ScholarshipApplicationState = {
  step: 'applicant',
  caseId: null,
  submitted: false,
  draft: defaultScholarshipDraft,
};

const stepOrder: ScholarshipStep[] = scholarshipSteps.map((step) => step.key);

const fieldClassName =
  'min-h-[44px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-none outline-none transition-colors duration-150 ease-out placeholder:text-muted-foreground/80 focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)]';

export function ScholarshipApplicationWizard() {
  const [state, setState] = React.useState<ScholarshipApplicationState>(initialState);
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [resumeReady, setResumeReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(scholarshipDraftStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ScholarshipApplicationState>;
        setState((current) => ({
          ...current,
          ...parsed,
          draft: {
            ...defaultScholarshipDraft,
            ...emptyScholarshipDraft(),
            ...(parsed.draft ?? {}),
          },
        }));
        setResumeReady(true);
      }
    } catch {
      setResumeReady(false);
    }
  }, []);

  React.useEffect(() => {
    try {
      window.sessionStorage.setItem(scholarshipDraftStorageKey, JSON.stringify(state));
    } catch {
      // Draft saving is best-effort for demo mode.
    }
  }, [state]);

  const currentStepIndex = stepOrder.indexOf(state.step);
  const progress = getScholarshipProgress(state.step);

  const updateField = <K extends keyof ScholarshipApplicationDraft>(
    key: K,
    value: ScholarshipApplicationDraft[K]
  ) => {
    setState((current) => ({
      ...current,
      draft: {
        ...current.draft,
        [key]: value,
      },
    }));
  };

  const validateCurrentStep = (step: ScholarshipStep = state.step): ValidationErrors => {
    switch (step) {
      case 'applicant':
        return validateApplicantStep(state.draft);
      case 'eligibility':
        return validateEligibilityStep(state.draft);
      case 'supporting':
        return validateSupportingStep(state.draft);
      default:
        return {};
    }
  };

  const handleNext = () => {
    const stepErrors = validateCurrentStep();
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
      return;
    }

    setState((current) => {
      const nextIndex = Math.min(currentStepIndex + 1, stepOrder.length - 1);
      const nextStep = stepOrder[nextIndex];

      if (current.step === 'review') {
        return {
          ...current,
          step: 'consent',
          caseId: current.caseId ?? scholarshipApplicationCaseId,
        };
      }

      return {
        ...current,
        step: nextStep,
        caseId: nextStep === 'review' ? current.caseId ?? scholarshipApplicationCaseId : current.caseId,
      };
    });
  };

  const handleBack = () => {
    setErrors({});
    setState((current) => {
      const previousIndex = Math.max(currentStepIndex - 1, 0);
      return {
        ...current,
        step: stepOrder[previousIndex],
      };
    });
  };

  const handleSubmit = () => {
    setState((current) => ({
      ...current,
      caseId: current.caseId ?? scholarshipApplicationCaseId,
      submitted: true,
    }));
  };

  const reviewSections = [
    {
      title: 'Applicant details',
      rows: [
        { label: 'Name', value: state.draft.fullName || 'Not provided' },
        { label: 'Date of birth', value: formatDisplayDate(state.draft.dateOfBirth) },
        { label: 'Mobile', value: state.draft.mobileNumber || 'Not provided' },
        { label: 'Email', value: state.draft.email || 'Not provided' },
        { label: 'Address', value: state.draft.addressLine || 'Not provided' },
        { label: 'District / Pincode', value: `${state.draft.district || 'Not provided'} / ${state.draft.pincode || 'Not provided'}` },
      ],
    },
    {
      title: 'Eligibility information',
      rows: [
        { label: 'Institution', value: state.draft.institutionName || 'Not provided' },
        { label: 'Course', value: state.draft.courseName || 'Not provided' },
        { label: 'Academic year', value: state.draft.academicYear || 'Not provided' },
        { label: 'Estimated family income', value: state.draft.familyIncome ? formatCurrency(state.draft.familyIncome) : 'Not provided' },
        { label: 'Study mode', value: state.draft.studyMode === 'full-time' ? 'Full-time' : 'Part-time' },
        { label: 'First-generation student', value: state.draft.firstGenerationStudent === 'yes' ? 'Yes' : 'No' },
      ],
    },
    {
      title: 'Supporting information',
      rows: [
        { label: 'Document status', value: state.draft.documentStatus === 'ready' ? 'Ready' : state.draft.documentStatus === 'partial' ? 'Partially ready' : 'Pending' },
        { label: 'Bank account last 4', value: state.draft.bankAccountLast4 ? `•••• ${state.draft.bankAccountLast4}` : 'Not provided' },
        { label: 'Preferred contact', value: state.draft.preferredContact === 'sms' ? 'SMS' : 'Email' },
        { label: 'Support note', value: state.draft.supportNote || 'Not provided' },
      ],
    },
  ];

  if (state.submitted) {
    return (
      <AppShell
        brand="GOVBRIDGE"
        navItems={citizenNavItems}
        mobileNavItems={citizenNavItems}
        secondaryActions={[{ label: 'Back to dashboard', href: '/dashboard' }]}
        footerLinks={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Accessibility', href: '/accessibility' },
          { label: 'Support', href: '/support' },
        ]}
        footerNote="Demo application complete. Backend integration will be connected later."
      >
        <Container className="py-8 sm:py-12">
          <Card className="max-w-3xl p-6 sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Demo submission complete
            </p>
            <h1 className="mt-3 font-display text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              Your scholarship application is saved.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Case {state.caseId ?? scholarshipApplicationCaseId} is ready for future backend processing. You can return to your dashboard or continue exploring services.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Back to dashboard
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Browse services
              </Link>
            </div>
          </Card>
        </Container>
      </AppShell>
    );
  }

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={citizenNavItems}
      mobileNavItems={citizenNavItems}
      secondaryActions={[{ label: 'Dashboard', href: '/dashboard' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Scholarship application', href: '/apply/scholarship' },
      ]}
      footerLinks={[
        { label: 'Privacy', href: '/privacy' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Support', href: '/support' },
      ]}
      footerNote="Demo application flow with save-and-resume support."
    >
      <Container className="py-8 sm:py-12">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Scholarship & Welfare application
              </p>
              <h1 className="font-display text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
                Apply with minimal repeated input.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                This demo keeps your details in one place, reuses them across steps, and saves progress so you can resume later.
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                Demo profile loaded for {defaultScholarshipDraft.fullName}. No Aadhaar or PAN numbers are requested.
              </p>
            </div>

            <StepIndicator currentStep={state.step} />

            {resumeReady ? (
              <Card className="border-[#D7E9D7] bg-[#F3FAF4] p-4 text-sm leading-6 text-[#1F5B36]">
                Your saved draft was restored automatically.
              </Card>
            ) : null}

            {state.step === 'applicant' ? (
              <FormSection
                eyebrow="Step 1 of 5"
                title="Applicant details"
                description="We only ask for basic contact details once. The same information will be reused later in the review step."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField id="fullName" label="Full name" required error={errors.fullName} helpText="Loaded from your demo profile.">
                    <Input
                      id="fullName"
                      value={state.draft.fullName}
                      onChange={(event) => updateField('fullName', event.target.value)}
                      onBlur={() => setErrors(validateApplicantStep(state.draft))}
                      className={fieldClassName}
                      autoComplete="name"
                    />
                  </FormField>

                  <FormField id="dateOfBirth" label="Date of birth" required error={errors.dateOfBirth} helpText="Used only to confirm scholarship eligibility.">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={state.draft.dateOfBirth}
                      onChange={(event) => updateField('dateOfBirth', event.target.value)}
                      onBlur={() => setErrors(validateApplicantStep(state.draft))}
                      className={fieldClassName}
                    />
                  </FormField>

                  <FormField id="mobileNumber" label="Mobile number" required error={errors.mobileNumber} helpText="Used for progress updates and reminders.">
                    <Input
                      id="mobileNumber"
                      value={state.draft.mobileNumber}
                      onChange={(event) => updateField('mobileNumber', event.target.value)}
                      onBlur={() => setErrors(validateApplicantStep(state.draft))}
                      className={fieldClassName}
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </FormField>

                  <FormField id="email" label="Email address" required error={errors.email} helpText="We will send a copy of your application summary here.">
                    <Input
                      id="email"
                      type="email"
                      value={state.draft.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      onBlur={() => setErrors(validateApplicantStep(state.draft))}
                      className={fieldClassName}
                      autoComplete="email"
                    />
                  </FormField>

                  <FormField id="addressLine" label="Address line" required error={errors.addressLine} helpText="Enter the address you want used for the application record.">
                    <Input
                      id="addressLine"
                      value={state.draft.addressLine}
                      onChange={(event) => updateField('addressLine', event.target.value)}
                      onBlur={() => setErrors(validateApplicantStep(state.draft))}
                      className={fieldClassName}
                      autoComplete="street-address"
                    />
                  </FormField>

                  <FormField id="district" label="District" required error={errors.district} helpText="This helps route the application to the right office.">
                    <Input
                      id="district"
                      value={state.draft.district}
                      onChange={(event) => updateField('district', event.target.value)}
                      onBlur={() => setErrors(validateApplicantStep(state.draft))}
                      className={fieldClassName}
                      autoComplete="address-level2"
                    />
                  </FormField>

                  <FormField id="pincode" label="Pincode" required error={errors.pincode} helpText="Use the pincode from your current address.">
                    <Input
                      id="pincode"
                      value={state.draft.pincode}
                      onChange={(event) => updateField('pincode', event.target.value)}
                      onBlur={() => setErrors(validateApplicantStep(state.draft))}
                      className={fieldClassName}
                      inputMode="numeric"
                      autoComplete="postal-code"
                    />
                  </FormField>
                </div>
              </FormSection>
            ) : null}

            {state.step === 'eligibility' ? (
              <FormSection
                eyebrow="Step 2 of 5"
                title="Eligibility information"
                description="Share only the details needed to check eligibility. The form avoids repeating contact information already captured earlier."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField id="institutionName" label="Institution name" required error={errors.institutionName} helpText="Use the institution where you are currently enrolled.">
                    <Input
                      id="institutionName"
                      value={state.draft.institutionName}
                      onChange={(event) => updateField('institutionName', event.target.value)}
                      onBlur={() => setErrors(validateEligibilityStep(state.draft))}
                      className={fieldClassName}
                    />
                  </FormField>

                  <FormField id="courseName" label="Course name" required error={errors.courseName} helpText="Tell us the course you are applying for support against.">
                    <Input
                      id="courseName"
                      value={state.draft.courseName}
                      onChange={(event) => updateField('courseName', event.target.value)}
                      onBlur={() => setErrors(validateEligibilityStep(state.draft))}
                      className={fieldClassName}
                    />
                  </FormField>

                  <FormField id="academicYear" label="Academic year" required error={errors.academicYear} helpText="For example, 2026-2027.">
                    <Input
                      id="academicYear"
                      value={state.draft.academicYear}
                      onChange={(event) => updateField('academicYear', event.target.value)}
                      onBlur={() => setErrors(validateEligibilityStep(state.draft))}
                      className={fieldClassName}
                      placeholder="2026-2027"
                    />
                  </FormField>

                  <FormField id="familyIncome" label="Annual family income" required error={errors.familyIncome} helpText="Enter the estimated annual amount in rupees."
                  >
                    <Input
                      id="familyIncome"
                      value={state.draft.familyIncome}
                      onChange={(event) => updateField('familyIncome', event.target.value)}
                      onBlur={() => setErrors(validateEligibilityStep(state.draft))}
                      className={fieldClassName}
                      inputMode="numeric"
                      placeholder="240000"
                    />
                  </FormField>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <FormField id="studyMode" label="Study mode" helpText="Choose the mode that matches your current enrollment.">
                    <select
                      id="studyMode"
                      value={state.draft.studyMode}
                      onChange={(event) => updateField('studyMode', event.target.value as ScholarshipApplicationDraft['studyMode'])}
                      className={fieldClassName}
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                    </select>
                  </FormField>

                  <fieldset className="space-y-2 rounded-lg border border-border bg-card p-4">
                    <legend className="text-sm font-medium text-foreground">
                      First-generation student
                    </legend>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Helps determine scholarship priority. This is for demo assessment only.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      {[
                        { label: 'Yes', value: 'yes' },
                        { label: 'No', value: 'no' },
                      ].map((option) => (
                        <label key={option.value} className="inline-flex items-center gap-2 text-sm text-foreground">
                          <input
                            type="radio"
                            name="firstGenerationStudent"
                            value={option.value}
                            checked={state.draft.firstGenerationStudent === option.value}
                            onChange={(event) => updateField('firstGenerationStudent', event.target.value as ScholarshipApplicationDraft['firstGenerationStudent'])}
                            className="h-4 w-4 border-border text-accent focus:ring-accent"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </FormSection>
            ) : null}

            {state.step === 'supporting' ? (
              <FormSection
                eyebrow="Step 3 of 5"
                title="Supporting information"
                description="Add only the information that helps the reviewer. We do not ask for Aadhaar or PAN numbers in this demo flow."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField id="bankAccountLast4" label="Bank account last 4 digits" required error={errors.bankAccountLast4} helpText="Use the account where the scholarship may be deposited.">
                    <Input
                      id="bankAccountLast4"
                      value={state.draft.bankAccountLast4}
                      onChange={(event) => updateField('bankAccountLast4', event.target.value)}
                      onBlur={() => setErrors(validateSupportingStep(state.draft))}
                      className={fieldClassName}
                      inputMode="numeric"
                      placeholder="4821"
                      maxLength={4}
                    />
                  </FormField>

                  <FormField id="documentStatus" label="Document readiness" helpText="Tell us whether your supporting files are ready.">
                    <select
                      id="documentStatus"
                      value={state.draft.documentStatus}
                      onChange={(event) => updateField('documentStatus', event.target.value as ScholarshipApplicationDraft['documentStatus'])}
                      className={fieldClassName}
                    >
                      <option value="ready">Ready</option>
                      <option value="partial">Partially ready</option>
                      <option value="pending">Pending</option>
                    </select>
                  </FormField>
                </div>

                <div className="mt-5">
                  <FormField id="supportNote" label="Supporting note" required error={errors.supportNote} helpText="Briefly explain anything a reviewer should know. This replaces repeated document uploads for the demo.">
                    <textarea
                      id="supportNote"
                      value={state.draft.supportNote}
                      onChange={(event) => updateField('supportNote', event.target.value)}
                      onBlur={() => setErrors(validateSupportingStep(state.draft))}
                      className={`${fieldClassName} min-h-[120px] py-3`}
                      placeholder="All supporting documents are already prepared in demo mode."
                    />
                  </FormField>
                </div>
              </FormSection>
            ) : null}

            {state.step === 'review' ? (
              <FormSection
                eyebrow="Step 4 of 5"
                title="Review"
                description="Check the summary once. The demo case will be created here before you move to the consent step."
              >
                <ReviewSummary
                  caseId={state.caseId ?? scholarshipApplicationCaseId}
                  note="No fields need to be re-entered. Everything entered earlier is reused here for review."
                  sections={reviewSections}
                />
                <Card className="mt-5 bg-[#EEFBFF] p-4 text-sm leading-6 text-[#0B5A7A]">
                  Your demo unified case is being created with the ID GOV-2026-000184.
                </Card>
              </FormSection>
            ) : null}

            {state.step === 'consent' ? (
              <FormSection
                eyebrow="Step 5 of 5"
                title="Consent"
                description="Consent has its own step and will be fully integrated with the backend later. No checkbox is used in this demo."
              >
                <div className="space-y-4">
                  <Card className="p-4 sm:p-5">
                    <h3 className="text-base font-semibold text-foreground">What you are agreeing to</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                      <li>• Share the details you entered with the scholarship review team.</li>
                      <li>• Allow status updates to be sent to your mobile number and email.</li>
                      <li>• Create the demo case for the current application journey.</li>
                    </ul>
                  </Card>

                  <Card className="p-4 sm:p-5">
                    <p className="text-sm leading-6 text-muted-foreground">
                      Case {state.caseId ?? scholarshipApplicationCaseId} will be stored as a demo case only. The real consent flow will be connected later.
                    </p>
                  </Card>
                </div>
              </FormSection>
            ) : null}

            <Divider />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm leading-6 text-muted-foreground">
                Progress is saved automatically in this browser session.
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="secondary" onClick={handleBack} disabled={state.step === 'applicant'}>
                  Back
                </Button>
                {state.step === 'consent' ? (
                  <Button onClick={handleSubmit}>Complete demo application</Button>
                ) : (
                  <Button onClick={handleNext}>Continue</Button>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <Card className="p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Progress
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold text-foreground">{Math.round(progress)}%</p>
                  <p className="text-sm text-muted-foreground">
                    {scholarshipSteps[state.step ? currentStepIndex : 0]?.label ?? 'Application'}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Step {currentStepIndex + 1} of {scholarshipSteps.length}
                </p>
              </div>
              <div className="mt-4 h-2 rounded-full bg-muted" aria-hidden="true">
                <div className="h-2 rounded-full bg-accent" style={{ width: `${progress}%` }} />
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-foreground">Save and resume</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Your draft stays in this browser session so you can leave and continue later.
              </p>
              <div className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                <p>• Demo profile is already filled in.</p>
                <p>• No repeated identity numbers are requested.</p>
                <p>• Review uses the same information you entered earlier.</p>
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </AppShell>
  );
}
