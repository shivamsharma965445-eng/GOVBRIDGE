import { clsx } from 'clsx';
import { scholarshipSteps, type ScholarshipStep } from '@/lib/scholarship-application';

export interface StepIndicatorProps {
  currentStep: ScholarshipStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = scholarshipSteps.findIndex((step) => step.key === currentStep);

  return (
    <nav aria-label="Application steps">
      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4">
        {scholarshipSteps.map((step, index) => {
          const isActive = step.key === currentStep;
          const isComplete = index < currentIndex;

          return (
            <li key={step.key}>
              <div
                className={clsx(
                  'flex h-full min-h-[72px] flex-col rounded-lg border p-3 sm:p-4',
                  isActive && 'border-accent bg-[#FFF9EC] shadow-sm',
                  isComplete && !isActive && 'border-[#D7E9D7] bg-[#F3FAF4]',
                  !isActive && !isComplete && 'border-border bg-card',
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={clsx(
                      'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      isActive && 'bg-accent text-white',
                      isComplete && !isActive && 'bg-[#1F5B36] text-white',
                      !isActive && !isComplete && 'bg-muted text-muted-foreground',
                    )}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{step.label}</p>
                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
