import Link from 'next/link';
import { Application, getStatusLabel } from '@/lib/dashboard-data';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card } from '@/components/ui/card';

interface ApplicationSummaryProps {
  application: Application;
}

// Map application status to badge status
const getApplicationStatusBadge = (
  status: Application['status']
): 'active' | 'pending' | 'inactive' => {
  switch (status) {
    case 'APPROVED':
      return 'active';
    case 'REJECTED':
      return 'inactive';
    case 'AWAITING_ACTION':
    case 'DEPARTMENT_REVIEW':
    case 'VERIFICATION_PENDING':
    case 'SUBMITTED':
    default:
      return 'pending';
  }
};

export const ApplicationSummary = ({ application }: ApplicationSummaryProps) => {
  return (
    <Card className="overflow-hidden">
      {/* Header with case ID and status */}
      <div className="border-b border-border px-6 py-4 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Case ID</p>
            <p className="mt-1 font-mono text-lg font-semibold text-foreground">
              {application.caseId}
            </p>
          </div>
          <StatusBadge
            status={getApplicationStatusBadge(application.status)}
            label={getStatusLabel(application.status)}
          />
        </div>
      </div>

      {/* Service and timeline info */}
      <div className="px-6 py-4 sm:px-8">
        <div className="flex flex-col gap-6">
          {/* Service info */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Service</p>
            <p className="mt-1 text-base text-foreground font-medium">
              {application.serviceName}
            </p>
          </div>

          {/* Progress indicator */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Progress</p>
              <p className="text-sm font-semibold text-foreground">
                {application.progress}%
              </p>
            </div>
            <div className="h-2 w-full rounded-full bg-background">
              <div
                className="h-2 rounded-full bg-accent transition-all"
                style={{ width: `${application.progress}%` }}
                role="progressbar"
                aria-valuenow={application.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Application progress: ${application.progress}%`}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Submitted
              </p>
              <p className="mt-1 text-sm text-foreground">
                {new Date(application.submittedDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Last Updated
              </p>
              <p className="mt-1 text-sm text-foreground">
                {new Date(application.lastUpdated).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Next action */}
          <div className="rounded-md bg-muted p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Next Action
            </p>
            <p className="mt-1 text-sm text-foreground">
              {application.nextAction}
            </p>
          </div>

          {/* Action button */}
          <Link
            href={`/applications/${application.caseId}`}
            className="inline-flex items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
          >
            View full application
          </Link>
        </div>
      </div>
    </Card>
  );
};
