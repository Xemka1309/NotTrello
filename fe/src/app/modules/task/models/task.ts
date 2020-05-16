export class Task {
  id: number;
  column_id?: string;
  priority_id?: string;
  title?: string;
  description?: string;
  dueTime?: string;
  completed?: boolean;
  position: number;
}
