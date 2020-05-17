import {Component, OnInit} from "@angular/core";
import {BoardService} from "../../../../services/board/boardService";
import {BackgroundService} from "../../../../services/board/backgroundsService";
import {ActivatedRoute} from "@angular/router";
import {Board} from "../../models/board";

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.css']
})
export class BoardMenuComponent implements OnInit {
  private boardId: string;
  private boardModel: Board;
  private menuState = 'Menu';
  private bgList: string[];
  constructor(private activatedRoute: ActivatedRoute,
              private boardService: BoardService) {
    console.log(this.activatedRoute.snapshot.params);
    this.boardId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.boardService.getBoardById(this.boardId).subscribe(value => {
      this.boardModel = value;
    });

  }

  infoClick(): void{
    this.menuState = 'Info';
  }

  bgClick(): void{

    this.menuState = 'Background';
  }

  marksClick(): void{
    this.menuState = 'Marks';
  }

  back(): void {
    this.menuState = 'Menu';
  }

  close(): void {

  }
}
