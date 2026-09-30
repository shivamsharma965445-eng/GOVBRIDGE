'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type WorkflowActionOption } from '@/lib/official-case-review-data';

export interface WorkflowTaskProps {
  actions: WorkflowActionOption[];
}

export function WorkflowTask({ actions }: WorkflowTaskProps) {
  const [selectedAction, setSelectedAction] = React.useState<WorkflowActionOption['label']>('Approve');
  const [reason, setReason] = React.useState('');
  const [confirmation, setConfirmation] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  const currentAction = actions.find((action) => action.label === selectedAction) ?? actions[0];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (currentAction.requiresConfirmation && !confirmation) {
      setNotice('Please confirm this action before continuing.');
      return;
    }

    if (currentAction.requiresReason && !reason.trim()) {
      setNotice('Please provide a reason for this action.');
      return;
    }

    setNotice(null);
    setSubmitted(true);
  };

  return (
    <Card className="p-5 sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Current workflow
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground">Institution Verification</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Choose an action carefully. Some actions require a reason, and approvals/rejections require explicit confirmation.
      </p>

      <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">Actions</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {actions.map((action) => {
              const active = selectedAction === action.label;
              return (
                <label
                  key={action.label}
                  className={active ? 'rounded-lg border border-accent bg-[#FFF9EC] p-4' : 'rounded-lg border border-border bg-card p-4'}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="workflowAction"
                      value={action.label}
                      checked={active}
                      onChange={() => setSelectedAction(action.label)}
                      className="mt-1 h-4 w-4 border-border text-accent focus:ring-accent"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{action.label}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{action.description}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {action.requiresReason ? 'Reason required' : 'Reason optional'} · {action.requiresConfirmation ? 'Confirmation required' : 'Confirmation optional'}
                      </p>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="workflow-reason" className="block text-sm font-medium text-foreground">
            Reason / notes
          </label>
          <textarea
            id="workflow-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="mt-2 min-h-[120px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)]"
            placeholder="Add a short operational reason or note"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            checked={confirmation}
            onChange={(event) => setConfirmation(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <span>
            I confirm this action is appropriate for the selected case and aligns with the operational record.
          </span>
        </label>

        {notice ? (
          <p className="text-sm leading-6 text-[#8B3A3A]" role="alert">
            {notice}
          </p>
        ) : null}

        {submitted ? (
          <Card className="border-[#D7E9D7] bg-[#F3FAF4] p-4 text-sm leading-6 text-[#1F5B36]">
            The workflow action has been recorded in the demo interface. Backend enforcement will be connected later.
          </Card>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit">Submit workflow action</Button>
          <Button type="button" variant="secondary" onClick={() => {
            setReason('');
            setConfirmation(false);
            setNotice(null);
            setSubmitted(false);
            setSelectedAction('Approve');
          }}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}
