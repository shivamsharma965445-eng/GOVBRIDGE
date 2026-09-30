'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { entityReviewActions, entityReviewMatchTypeStyles, entityReviewStateStyles, type EntityDecisionAction, type EntityReviewRow } from '@/lib/entity-review-data';

export interface ReviewDetailPanelProps {
  review: EntityReviewRow;
}

export function ReviewDetailPanel({ review }: ReviewDetailPanelProps) {
  const [selectedAction, setSelectedAction] = React.useState<EntityDecisionAction>('Review');
  const [reason, setReason] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  const currentAction = entityReviewActions.find((action) => action.label === selectedAction) ?? entityReviewActions[0];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (currentAction.requiresConfirmation && !confirmed) {
      setNotice('Please confirm the action before saving the human decision.');
      return;
    }

    if (currentAction.requiresReason && !reason.trim()) {
      setNotice('Please provide a reason for this decision.');
      return;
    }

    setNotice(null);
    setSubmitted(true);
  };

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Human decision
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{review.reviewId}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{review.summary}</p>
        </div>
        <div className="space-y-2 text-left sm:text-right">
          <Badge className="border-[#D7E9D7] bg-[#F3FAF4] text-[#1F5B36]">AI suggestion</Badge>
          <p className="text-sm font-medium text-foreground">Confidence: <span className="font-mono">{review.confidence}%</span></p>
          <p className="text-sm text-muted-foreground">Current state: {review.currentState}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <p className="text-sm font-medium text-foreground">AI suggestion</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{review.aiSuggestion}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Match type: {review.matchType}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm font-medium text-foreground">Evidence</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            {review.evidence.map((item) => (
              <li key={item.label} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-accent" />
                <span>
                  <span className="font-medium text-foreground">{item.label}:</span> {item.value}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">Choose an action</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {entityReviewActions.map((action) => {
              const active = selectedAction === action.label;
              return (
                <label
                  key={action.label}
                  className={active ? 'rounded-lg border border-accent bg-[#FFF9EC] p-4' : 'rounded-lg border border-border bg-card p-4'}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="entityReviewAction"
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
          <label htmlFor="decision-reason" className="block text-sm font-medium text-foreground">
            Reason
          </label>
          <textarea
            id="decision-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="mt-2 min-h-[120px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)]"
            placeholder="Add a concise human explanation or review note"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <span>
            I confirm this decision reflects a human review of the evidence and I understand it will not automatically merge records.
          </span>
        </label>

        {notice ? (
          <p className="text-sm leading-6 text-[#8B3A3A]" role="alert">
            {notice}
          </p>
        ) : null}

        {submitted ? (
          <Card className="border-[#D7E9D7] bg-[#F3FAF4] p-4 text-sm leading-6 text-[#1F5B36]">
            The human decision has been recorded in the demo console. No records were merged automatically.
          </Card>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit">Save decision</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSelectedAction('Review');
              setReason('');
              setConfirmed(false);
              setNotice(null);
              setSubmitted(false);
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      <div className="mt-6 rounded-lg border border-border bg-muted/40 p-4">
        <p className="text-sm font-medium text-foreground">Current state</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {entityReviewStateStyles[review.currentState].label}. Human accountability remains explicit for every outcome.
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Match type: {entityReviewMatchTypeStyles[review.matchType].label}
        </p>
      </div>
    </Card>
  );
}
