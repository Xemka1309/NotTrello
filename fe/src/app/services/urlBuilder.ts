
export enum Actions{
  add = '/add',
  delete = '/delete',
  edit = '/edit',
  get = '/get',
  getColByBoardId = '/getByBoadrdId',
}

export enum Models{
  column = '/column',
  task = '/task',
  board = '/board'
}

export class ApiUrlBuilder {
  private static baseUrl = '/api';
  public static getUrl(model: Models, action: Actions): string {
    return `${this.baseUrl}${model}${action}`;
  }
}
