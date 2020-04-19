import { Component, OnInit, Inject } from '@angular/core';
import { BoardService } from 'src/app/services/board/boardService';
import { Board } from '../../models/board';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list-component.html',
  styleUrls: ['./boards-list-component.css']
})
export class BoardsListComponent implements OnInit {
  public boards: any;
  constructor(private boardService: BoardService, private router: Router) { }

  public ngOnInit(): void {
    this.boardService.getBoards().subscribe( (result) => {
      console.log("RES");
      console.log(result);
      this.boards = result;
      console.log("BOARDS");
      console.log(this.boards);
      this.boards = result.map( (x) => {return {
        title: x.title,
        description: x.description,
        bordType: x.bordType,
        id: x.id,
        columns: null
      }; });
      this.boards = result;
    }, error => console.log(error));

  }

  public createLink(id: number):string {
    return this.router.createUrlTree(['/boards' + id]).fragment;
  }
}
