import { CheckList } from './check-list';
import { Mark } from './mark';

export class Task {
  idNum?: number;
  id?: string;
  column_id?: number;
  priority_id?: number;
  title?: string;
  description?: string;
  dueTime?: string;
  completed?: boolean;
  position?: number;
  check_lists?: CheckList[];
  marks?: Mark[];
  pos?: number;
  marks_ids?: number[];
}
