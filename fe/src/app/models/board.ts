import {Column} from './column';
import {Mark} from './mark';

export class Board {
  id?: number;
  title?: string;
  description?: string;
  boardType?: string;
  pictureUrl?: string;
  columns?: Column[];
  marks?: Mark[];

  public static deleteColumn(board: Board, columnId: number) {
    const col = board.columns.filter(co => co.id === columnId).pop();
    board.columns.splice(board.columns.indexOf(col), 1);
    board.columns.forEach((c, pos) => {
      c.position = pos;
    });
  }

}
