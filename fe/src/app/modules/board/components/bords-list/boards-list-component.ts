import {Component, OnInit} from '@angular/core';
import {BoardService} from 'src/app/services/board/boardService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list-component.html',
  styleUrls: ['./boards-list-component.css']
})
export class BoardsListComponent implements OnInit {
  public boards: any;
  public displayedBoards: any;

  constructor(private boardService: BoardService, private router: Router) {
  }

  public ngOnInit(): void {
    this.boardService.getBoards().subscribe((result) => {
      console.log('RES');
      console.log(result);
      this.boards = result;
      console.log('BOARDS');
      console.log(this.boards);
      this.boards = result.map((x) => {
        return {
          title: x.title,
          description: x.description,
          boardType: x.boardType,
          id: x.id,
          columns: null
        };
      });
      this.boards = result;
      this.displayedBoards = this.boards;
    }, error => console.log(error));
  }

  public displayAll(): void {
    this.displayedBoards = this.boards;
  }

  public displayPrivate(): void {
    this.displayedBoards = [];
    this.boards.forEach(board => {
      if(board.boardType === 'PRIVATE'){
        this.displayedBoards.push(board);
      }
    })
  }

  public displayPublic(): void {
    this.displayedBoards = [];
    this.boards.forEach(board => {
      console.log(board);
      if(board.boardType === 'PUBLIC'){
        this.displayedBoards.push(board);
      }
    })
  }
}
