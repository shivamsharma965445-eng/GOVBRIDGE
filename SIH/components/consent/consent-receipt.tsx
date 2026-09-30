import { Card } from '@/components/ui/card';
import { type ConsentReceiptData } from '@/lib/consent-data';

export interface ConsentReceiptProps {
  receipt: ConsentReceiptData;
}

export function ConsentReceipt({ receipt }: ConsentReceiptProps) {
  return (
    <Card className="p-5 sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Consent receipt
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground">Decision summary</h2>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Requester</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{receipt.requester}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Provider</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{receipt.provider}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Purpose</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{receipt.purpose}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Attributes</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{receipt.attributes.join(', ')}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Timestamp</dt>
          <dd className="mt-1 font-mono text-sm leading-6 text-foreground">{new Date(receipt.timestamp).toLocaleString('en-IN')}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Expiry</dt>
          <dd className="mt-1 font-mono text-sm leading-6 text-foreground">{new Date(receipt.expiry).toLocaleString('en-IN')}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Citizen action</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{receipt.citizenAction}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Correlation ID</dt>
          <dd className="mt-1 font-mono text-sm leading-6 text-foreground">{receipt.correlationId}</dd>
        </div>
      </dl>
    </Card>
  );
}
