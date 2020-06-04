import { CheckListItem } from './check-list-item';

export class CheckList {
  id?: number;
  title?: string;
  position?: number;
  task_id?: number;
  items?: CheckListItem[];
}
