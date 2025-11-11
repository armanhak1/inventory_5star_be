export type ItemType = 'qty' | 'pct';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  value: number;
  notes?: string;
  updatedAt: string;
}

