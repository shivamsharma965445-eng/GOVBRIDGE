'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { MetricCard } from '@/components/official/metric-card';
import { resetDemoState } from '@/lib/demo-state';

const adminMetrics = [
	{
		label: 'Connected departments',
		value: '18',
		description: 'Departments currently integrated and publishing updates.',
		tone: 'active' as const,
	},
	{
		label: 'Healthy connectors',
		value: '26',
		description: 'Connectors passing checks in the last 24 hours.',
		tone: 'active' as const,
	},
	{
		label: 'Degraded connectors',
		value: '4',
		description: 'Connectors requiring investigation or retry.',
		tone: 'pending' as const,
	},
	{
		label: 'Active workflows',
		value: '31',
		description: 'Configured process chains currently available.',
		tone: 'active' as const,
	},
	{
		label: 'Pending exceptions',
		value: '7',
		description: 'Exceptions awaiting operator triage or recovery.',
		tone: 'pending' as const,
	},
	{
		label: 'Recent audit activity',
		value: '44',
		description: 'Events logged across services, connectors and policies.',
		tone: 'inactive' as const,
	},
];

const departments = [
	{ name: 'Revenue & Taxation', status: 'Connected', region: 'Statewide', owner: 'Operations lead' },
	{ name: 'Education Services', status: 'Connected', region: 'Regional', owner: 'Data steward' },
	{ name: 'Public Health', status: 'Connected', region: 'Statewide', owner: 'Interoperability team' },
	{ name: 'Transport Authority', status: 'Review', region: 'Metro', owner: 'Integration lead' },
	{ name: 'Labour & Employment', status: 'Connected', region: 'Statewide', owner: 'Service owner' },
	{ name: 'Housing & Urban Affairs', status: 'Monitoring', region: 'Regional', owner: 'Platform admin' },
];

const connectors = [
	{
		id: 'CN-101',
		department: 'Revenue & Taxation',
		protocol: 'REST',
		version: 'v3.2',
		health: 'Healthy',
		owner: 'A. Nair',
		checked: '2026-09-09 09:42',
	},
	{
		id: 'CN-214',
		department: 'Public Health',
		protocol: 'SOAP/XML',
		version: 'v2.8',
		health: 'Healthy',
		owner: 'M. Singh',
		checked: '2026-09-09 09:31',
	},
	{
		id: 'CN-356',
		department: 'Education Services',
		protocol: 'CSV/SFTP',
		version: 'v1.6',
		health: 'Degraded',
		owner: 'T. Shah',
		checked: '2026-09-09 08:56',
	},
	{
		id: 'CN-478',
		department: 'Transport Authority',
		protocol: 'Database',
		version: 'v4.1',
		health: 'Healthy',
		owner: 'J. Fernandez',
		checked: '2026-09-09 09:24',
	},
	{
		id: 'CN-512',
		department: 'Housing & Urban Affairs',
		protocol: 'Webhook/Event',
		version: 'v2.4',
		health: 'Degraded',
		owner: 'L. Bose',
		checked: '2026-09-09 08:44',
	},
	{
		id: 'CN-611',
		department: 'Labour & Employment',
		protocol: 'REST',
		version: 'v3.0',
		health: 'Healthy',
		owner: 'R. Das',
		checked: '2026-09-09 09:15',
	},
];

const schemas = [
	{ name: 'Citizen Profile', version: 'v2.9', status: 'Active', owner: 'Identity platform' },
	{ name: 'Business Registration', version: 'v1.8', status: 'Active', owner: 'Enterprise data team' },
	{ name: 'Eligibility Assessment', version: 'v3.1', status: 'Draft', owner: 'Policy operations' },
	{ name: 'Case Decision Record', version: 'v2.5', status: 'Active', owner: 'Case workflow unit' },
	{ name: 'Document Metadata', version: 'v1.3', status: 'Active', owner: 'Records management' },
];

const mappings = [
	{ sourceField: 'citizen.name.first', canonicalField: 'person.first_name', transformation: 'Strip titles + normalize case', version: 'v2.9' },
	{ sourceField: 'business.registration_id', canonicalField: 'entity.registration_number', transformation: 'Trim whitespace and pad leading zeros', version: 'v1.8' },
	{ sourceField: 'eligibility.household.income', canonicalField: 'household.annual_income', transformation: 'Convert currency to standard integer', version: 'v3.1' },
	{ sourceField: 'case.status_last_updated', canonicalField: 'case.last_state_change_at', transformation: 'Normalize timezone to UTC', version: 'v2.5' },
	{ sourceField: 'document.file_reference', canonicalField: 'document.reference_code', transformation: 'Hash prefixes and preserve suffix', version: 'v1.3' },
];

const policies = [
	{ name: 'Data Minimisation', purpose: 'Restrict unnecessary personal data in service workflows and vendor responses.', version: 'v4.1', owner: 'Privacy office' },
	{ name: 'Case Identity Resolution', purpose: 'Define thresholds and human review requirements for ambiguous matches.', version: 'v2.7', owner: 'Identity governance' },
	{ name: 'Interoperability Access', purpose: 'Control which departments may call shared APIs and accept event payloads.', version: 'v3.2', owner: 'Platform security' },
	{ name: 'Service Availability Guardrail', purpose: 'Protect critical services from overloading and queue bottlenecks.', version: 'v1.9', owner: 'Operations' },
];

const workflows = [
	{ name: 'Citizen onboarding', description: 'Initial registration, identity validation, and intake routing.', owner: 'Service design' },
	{ name: 'Eligibility review', description: 'Assess entitlement rules and route edge cases for human approval.', owner: 'Policy governance' },
	{ name: 'Department handoff', description: 'Route case data between agencies and notify internal teams.', owner: 'Integration team' },
	{ name: 'Exception recovery', description: 'Retry failed integrations, quarantine edge cases, and escalate unresolved issues.', owner: 'Operations' },
];

const auditActivity = [
	{ title: 'Schema version published', detail: 'Citizen profile schema updated to v2.9 by Identity platform.', time: '09:42' },
	{ title: 'Connector health alert', detail: 'CSV/SFTP sync for Education Services is degraded and under review.', time: '08:56' },
	{ title: 'Workflow policy applied', detail: 'Case identity resolution policy was enforced for 3 new cases.', time: '08:12' },
	{ title: 'Department certificate rotated', detail: 'Transport Authority integration certificate successfully renewed.', time: '07:35' },
];

const healthStyles: Record<string, string> = {
	Healthy: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
	Degraded: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
	Review: 'bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200',
	Monitoring: 'bg-slate-200 text-slate-700 ring-1 ring-inset ring-slate-300',
};

export default function AdminPage() {
	const [resetMessage, setResetMessage] = React.useState<string | null>(null);

	const handleDemoReset = () => {
		const confirmed = window.confirm(
			'This will reset the demo case, notifications, consent state, and audit trail for this browser. Continue?'
		);
		if (!confirmed) {
			return;
		}

		try {
			resetDemoState();
			setResetMessage('Demo reset complete. The workspace is ready for a fresh demonstration.');
		} catch {
			setResetMessage('Unable to reset the demo state in this browser session.');
		}
	};

	return (
		<>
			<PageHeader
				eyebrow="Admin console"
				title="Platform oversight for connected services and policy operations."
				description="Monitor agency connectivity, manage integration layers, and keep operational risk visible across departments, workflows and system health."
			/>

			<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="text-sm text-muted-foreground">Prototype environment for demo coordination and operational monitoring.</div>
				<button
					type="button"
					onClick={handleDemoReset}
					className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
				>
					Reset demo state
				</button>
			</div>

			{resetMessage ? (
				<div className="mb-6 rounded-md border border-border bg-muted/30 p-3 text-sm text-foreground">
					{resetMessage}
				</div>
			) : null}

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{adminMetrics.map((metric) => (
					<MetricCard key={metric.label} {...metric} />
				))}
			</div>

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
				<Card className="p-5 sm:p-6">
					<SectionLabel className="mb-4">Departments</SectionLabel>
					<div className="grid gap-3 sm:grid-cols-2">
						{departments.map((department) => (
							<div key={department.name} className="rounded-lg border border-border bg-muted/40 p-4">
								<div className="flex items-center justify-between gap-3">
									<p className="text-base font-semibold text-foreground">{department.name}</p>
									<span
										className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${healthStyles[department.status]}`}
									>
										{department.status}
									</span>
								</div>
								<dl className="mt-4 space-y-2 text-sm text-muted-foreground">
									<div className="flex items-center justify-between gap-3">
										<dt>Region</dt>
										<dd className="font-medium text-foreground">{department.region}</dd>
									</div>
									<div className="flex items-center justify-between gap-3">
										<dt>Owner</dt>
										<dd className="font-medium text-foreground">{department.owner}</dd>
									</div>
								</dl>
							</div>
						))}
					</div>
				</Card>

				<Card className="p-5 sm:p-6">
					<SectionLabel className="mb-4">Recent audit activity</SectionLabel>
					<div className="space-y-4">
						{auditActivity.map((item) => (
							<div key={`${item.title}-${item.time}`} className="rounded-md border border-border bg-muted/30 p-3">
								<div className="flex items-center justify-between gap-3">
									<p className="text-sm font-semibold text-foreground">{item.title}</p>
									<span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
										{item.time}
									</span>
								</div>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
							</div>
						))}
					</div>
				</Card>
			</div>

			<Card className="p-5 sm:p-6">
				<SectionLabel className="mb-4">Connectors</SectionLabel>
				<div className="overflow-x-auto">
					<table className="min-w-full text-left text-sm">
						<thead>
							<tr className="border-b border-border text-muted-foreground">
								<th className="pb-3 pr-4 font-medium">Connector ID</th>
								<th className="pb-3 pr-4 font-medium">Department</th>
								<th className="pb-3 pr-4 font-medium">Protocol</th>
								<th className="pb-3 pr-4 font-medium">Version</th>
								<th className="pb-3 pr-4 font-medium">Health</th>
								<th className="pb-3 pr-4 font-medium">Owner</th>
								<th className="pb-3 pr-4 font-medium">Last checked</th>
							</tr>
						</thead>
						<tbody>
							{connectors.map((connector) => (
								<tr key={connector.id} className="border-b border-border/80 align-top">
									<td className="py-3 pr-4 font-mono text-foreground">{connector.id}</td>
									<td className="py-3 pr-4 text-foreground">{connector.department}</td>
									<td className="py-3 pr-4 text-foreground">{connector.protocol}</td>
									<td className="py-3 pr-4 text-foreground">{connector.version}</td>
									<td className="py-3 pr-4">
										<span
											className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${healthStyles[connector.health]}`}
										>
											{connector.health}
										</span>
									</td>
									<td className="py-3 pr-4 text-foreground">{connector.owner}</td>
									<td className="py-3 pr-4 font-mono text-muted-foreground">{connector.checked}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="p-5 sm:p-6">
					<SectionLabel className="mb-4">Schemas</SectionLabel>
					<div className="space-y-3">
						{schemas.map((schema) => (
							<div key={`${schema.name}-${schema.version}`} className="flex items-center justify-between gap-4 rounded-md border border-border bg-muted/30 p-3">
								<div>
									<p className="font-semibold text-foreground">{schema.name}</p>
									<p className="mt-1 text-sm text-muted-foreground">{schema.owner}</p>
								</div>
								<div className="text-right">
									<p className="font-mono text-sm text-foreground">{schema.version}</p>
									<p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
										{schema.status}
									</p>
								</div>
							</div>
						))}
					</div>
				</Card>

				<Card className="p-5 sm:p-6">
					<SectionLabel className="mb-4">Mappings</SectionLabel>
					<div className="space-y-3">
						{mappings.map((mapping) => (
							<div key={`${mapping.sourceField}-${mapping.version}`} className="rounded-md border border-border bg-muted/30 p-3">
								<div className="flex items-center justify-between gap-4">
									<p className="font-mono text-xs text-muted-foreground">{mapping.sourceField}</p>
									<span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">v{mapping.version}</span>
								</div>
								<p className="mt-2 text-sm text-foreground">→ {mapping.canonicalField}</p>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">{mapping.transformation}</p>
							</div>
						))}
					</div>
				</Card>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="p-5 sm:p-6">
					<SectionLabel className="mb-4">Policies</SectionLabel>
					<div className="space-y-3">
						{policies.map((policy) => (
							<div key={policy.name} className="rounded-md border border-border bg-muted/30 p-3">
								<div className="flex items-center justify-between gap-4">
									<p className="font-semibold text-foreground">{policy.name}</p>
									<span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{policy.version}</span>
								</div>
								<p className="mt-2 text-sm leading-6 text-muted-foreground">{policy.purpose}</p>
								<p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{policy.owner}</p>
							</div>
						))}
					</div>
				</Card>

				<Card className="p-5 sm:p-6">
					<SectionLabel className="mb-4">Workflows</SectionLabel>
					<div className="space-y-3">
						{workflows.map((workflow) => (
							<div key={workflow.name} className="rounded-md border border-border bg-muted/30 p-3">
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="font-semibold text-foreground">{workflow.name}</p>
										<p className="mt-2 text-sm leading-6 text-muted-foreground">{workflow.description}</p>
									</div>
									<span className="inline-flex rounded-full bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground ring-1 ring-inset ring-border">
										Active
									</span>
								</div>
								<p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Owner: {workflow.owner}</p>
							</div>
						))}
					</div>
				</Card>
			</div>
		</>
	);
}
