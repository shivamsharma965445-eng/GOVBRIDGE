"use client";

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { AuditDetail } from '@/components/audit/audit-detail';
import { AuditFilters } from '@/components/audit/audit-filters';
import { AuditTable } from '@/components/audit/audit-table';
import { auditFilters, auditRecords, type AuditRecord } from '@/lib/audit-data';

const pageSize = 5;

export function AuditPage({ roleLabel }: { roleLabel: string }) {
  const [actorFilter, setActorFilter] = useState('All actors');
  const [actionFilter, setActionFilter] = useState('All actions');
  const [resourceFilter, setResourceFilter] = useState('All resources');
  const [outcomeFilter, setOutcomeFilter] = useState('All outcomes');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(auditRecords[0]?.id ?? null);

  const filteredRecords = useMemo(() => {
    return auditRecords.filter((record) => {
      const actorMatches = actorFilter === 'All actors' || record.actor === actorFilter;
      const actionMatches = actionFilter === 'All actions' || record.action === actionFilter;
      const resourceMatches = resourceFilter === 'All resources' || record.resource === resourceFilter;
      const outcomeMatches = outcomeFilter === 'All outcomes' || record.outcome === outcomeFilter;
      const dateMatches = !dateFilter || record.timestamp.startsWith(dateFilter);
      return actorMatches && actionMatches && resourceMatches && outcomeMatches && dateMatches;
    });
  }, [actorFilter, actionFilter, resourceFilter, outcomeFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedRecords = filteredRecords.slice((safePage - 1) * pageSize, safePage * pageSize);

  const selectedRecord = paginatedRecords.find((record) => record.id === selectedId) ?? filteredRecords.find((record) => record.id === selectedId) ?? null;

  const applyFilterReset = () => {
    setActorFilter('All actors');
    setActionFilter('All actions');
    setResourceFilter('All resources');
    setOutcomeFilter('All outcomes');
    setDateFilter('');
    setPage(1);
  };

  return (
    <>
      <PageHeader
        eyebrow="Audit log"
        title="Operational activity and accountability trail."
        description="Review task decisions, policy changes, identity actions and consent events without exposing unnecessary payload content."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <SectionLabel>{roleLabel}</SectionLabel>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Audit records</h2>
        </div>
        <button
          type="button"
          onClick={applyFilterReset}
          className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
          aria-label="Reset audit filters"
        >
          Reset filters
        </button>
      </div>

      <AuditFilters
        actor={actorFilter}
        action={actionFilter}
        resource={resourceFilter}
        outcome={outcomeFilter}
        date={dateFilter}
        onActorChange={(value) => {
          setActorFilter(value);
          setPage(1);
        }}
        onActionChange={(value) => {
          setActionFilter(value);
          setPage(1);
        }}
        onResourceChange={(value) => {
          setResourceFilter(value);
          setPage(1);
        }}
        onOutcomeChange={(value) => {
          setOutcomeFilter(value);
          setPage(1);
        }}
        onDateChange={(value) => {
          setDateFilter(value);
          setPage(1);
        }}
        actorOptions={auditFilters.actors}
        actionOptions={auditFilters.actions}
        resourceOptions={auditFilters.resources}
        outcomeOptions={auditFilters.outcomes}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,0.8fr)]">
        <Card className="p-0">
          <AuditTable
            records={paginatedRecords}
            selectedId={selectedRecord?.id ?? selectedId}
            onSelect={(record: AuditRecord) => setSelectedId(record.id)}
            pageSize={pageSize}
            currentPage={safePage}
            totalRecords={filteredRecords.length}
            onNextPage={() => setPage((current) => Math.min(current + 1, totalPages))}
            onPreviousPage={() => setPage((current) => Math.max(current - 1, 1))}
          />
        </Card>

        <AuditDetail record={selectedRecord} />
      </div>
    </>
  );
}
