import { Component, OnInit, Inject } from '@angular/core';
import { Board } from '../../models/board';
import { BoardService } from 'src/app/services/board/boardService';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list-component.html',
  styleUrls: ['./boards-list-component.css']
})
export class BoardsListComponent implements OnInit {
  public boards: Board[];
  constructor(private boardService: BoardService) { }
  public ngOnInit(): void {
    this.boardService.getBoards().subscribe(result => {
      console.log(result);
      this.boards = result;
    }, error => console.log(error));
    console.log("BOARDS");
    console.log(this.boards);
  }
}
