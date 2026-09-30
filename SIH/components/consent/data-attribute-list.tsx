import { Card } from '@/components/ui/card';
import { type ConsentAttribute } from '@/lib/consent-data';

export interface DataAttributeListProps {
  attributes: ConsentAttribute[];
}

export function DataAttributeList({ attributes }: DataAttributeListProps) {
  return (
    <div className="space-y-3">
      {attributes.map((attribute) => (
        <Card key={attribute.label} className="p-4">
          <p className="font-medium text-foreground">{attribute.label}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{attribute.description}</p>
        </Card>
      ))}
    </div>
  );
}
