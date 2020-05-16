import {Column} from './column';

export interface Board {
  id: number;
  title: string;
  description: string;
  boardType: string;
  pictureUrl: string;
  columns?: Column[];
}
