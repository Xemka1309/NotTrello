import {Column} from './column';

export interface Board {
  id: number;
  title: string;
  description: string;
  boardType: string;
  columns?: Column[];
}
