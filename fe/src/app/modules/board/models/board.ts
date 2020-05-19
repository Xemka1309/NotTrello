import {Column} from '../../column/models/column';
import {Mark} from '../../mark/models/mark';

export interface Board {
  id: number;
  title: string;
  description: string;
  boardType: string;
  pictureUrl: string;
  columns?: Column[];
  marks?: Mark[];
}
