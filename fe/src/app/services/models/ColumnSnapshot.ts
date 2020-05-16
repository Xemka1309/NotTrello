import { Task } from 'src/app/modules/board/models/task';

export class ColumnSnapshot {
  addedTasks: Task[];
  deletedTasks: Task[];
  updatedTasks: Task[];
  //movedTasks: Task[];
}
