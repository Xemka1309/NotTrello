export class TaskMark {
  id?: number;
  task_id?: number;
  mark_id?: number;
  constructor(t, m)
  {
    this.task_id = t;
    this.mark_id = m;
  }
}
