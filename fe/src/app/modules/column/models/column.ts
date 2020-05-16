import {Task} from '../../task/models/task';

export class Column {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
}
