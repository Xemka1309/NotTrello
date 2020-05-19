import {Task} from '../../models/task';

export class ColumnSnapshot {
  addedTasks: Task[];
  deletedTasks: Task[];
  updatedTasks: Task[];
}
