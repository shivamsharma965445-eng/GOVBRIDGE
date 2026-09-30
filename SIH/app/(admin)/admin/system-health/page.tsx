import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { adminSystemHealthDemoData } from '@/lib/admin-system-health-data';

const statusStyles: Record<string, string> = {
  Healthy: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Watch: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Degraded: 'bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-200',
  Critical: 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-200',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[status] ?? statusStyles.Watch}`}
    >
      {status}
    </span>
  );
}

function MetricBarChart({ label, value, target, status, visual }: { label: string; value: string; target: string; status: string; visual: number }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-4" aria-label={`${label}: ${value}, target ${target}`}>
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Current</span>
          <span>{value}</span>
        </div>
        <div className="h-2.5 rounded-full bg-background ring-1 ring-inset ring-border" aria-hidden="true">
          <div className="h-2.5 rounded-full bg-accent" style={{ width: `${visual}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Target: {target}</p>
      </div>
    </div>
  );
}

export default function AdminSystemHealthPage() {
  const { summary, connectorHealth, operationalMetrics, recentIncidents, slaIndicators } = adminSystemHealthDemoData;

  return (
    <>
      <PageHeader
        eyebrow="System Health"
        title="Operational health and resilience overview."
        description="Monitor platform stability, connector performance, service latency, queue activity and exception risk in a controlled administrative view."
      />

      <section className="space-y-4">
        <SectionLabel>Health summary</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {summary.map((item) => (
            <Card key={item.label} className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-3 font-display text-3xl tracking-[-0.04em] text-foreground">{item.value}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionLabel>Connector health</SectionLabel>
        <Card className="p-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Connector</th>
                  <th className="pb-3 pr-4 font-medium">Department</th>
                  <th className="pb-3 pr-4 font-medium">Protocol</th>
                  <th className="pb-3 pr-4 font-medium">Health</th>
                  <th className="pb-3 pr-4 font-medium">Latency</th>
                  <th className="pb-3 pr-4 font-medium">Errors</th>
                  <th className="pb-3 pr-4 font-medium">Retries</th>
                  <th className="pb-3 pr-4 font-medium">Owner</th>
                  <th className="pb-3 pr-4 font-medium">Last checked</th>
                </tr>
              </thead>
              <tbody>
                {connectorHealth.map((connector) => (
                  <tr key={connector.id} className="border-b border-border/80 align-top">
                    <td className="py-3 pr-4 font-mono text-foreground">{connector.id}</td>
                    <td className="py-3 pr-4 text-foreground">{connector.department}</td>
                    <td className="py-3 pr-4 text-foreground">{connector.protocol}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={connector.health} />
                    </td>
                    <td className="py-3 pr-4 font-mono text-muted-foreground">{connector.latency}</td>
                    <td className="py-3 pr-4 font-mono text-muted-foreground">{connector.errors}</td>
                    <td className="py-3 pr-4 font-mono text-muted-foreground">{connector.retries}</td>
                    <td className="py-3 pr-4 text-foreground">{connector.owner}</td>
                    <td className="py-3 pr-4 font-mono text-muted-foreground">{connector.checked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionLabel>Operational metrics</SectionLabel>
        <div className="grid gap-4 lg:grid-cols-2">
          {operationalMetrics.map((metric) => (
            <MetricBarChart
              key={metric.label}
              label={metric.label}
              value={metric.value}
              target={metric.target}
              status={metric.status}
              visual={metric.visual}
            />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <section className="space-y-4">
          <SectionLabel>Recent incidents</SectionLabel>
          <div className="space-y-3">
            {recentIncidents.map((incident) => (
              <Card key={incident.id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-foreground">{incident.title}</p>
                      <StatusBadge status={incident.status} />
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {incident.id} • {incident.department}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{incident.time}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{incident.summary}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionLabel>SLA indicators</SectionLabel>
          <Card className="p-5 sm:p-6">
            <div className="space-y-3">
              {slaIndicators.map((indicator) => (
                <div key={indicator.service} className="rounded-md border border-border bg-muted/30 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground">{indicator.service}</p>
                    <StatusBadge status={indicator.status} />
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Current</dt>
                      <dd className="mt-1 font-medium text-foreground">{indicator.current}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Target</dt>
                      <dd className="mt-1 font-medium text-foreground">{indicator.target}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{indicator.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
