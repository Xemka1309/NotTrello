import { Task } from 'src/app/modules/task/models/task';

export class ColumnSnapshot {
  addedTasks: Task[];
  deletedTasks: Task[];
  updatedTasks: Task[];
  //movedTasks: Task[];
}
