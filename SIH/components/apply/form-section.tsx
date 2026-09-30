import * as React from 'react';
import { Card } from '@/components/ui/card';
import { SectionLabel } from '@/components/ui/section-label';

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function FormSection({ eyebrow, title, description, children, ...props }: FormSectionProps) {
  return (
    <Card className="p-5 sm:p-6" {...props}>
      <div className="space-y-1.5">
        {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </Card>
  );
}
