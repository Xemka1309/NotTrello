import {Column} from '../../column/models/column';

export interface Board {
  id: number;
  title: string;
  description: string;
  boardType: string;
  pictureUrl: string;
  columns?: Column[];
}
