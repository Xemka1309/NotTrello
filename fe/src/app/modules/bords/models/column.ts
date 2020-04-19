import {Task} from './task';

export class Column {
  id: number;
  title: string;
  position: number;
  tasks: Task[];
}
