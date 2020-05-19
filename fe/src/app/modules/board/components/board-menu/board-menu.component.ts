import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {BoardService} from "../../../../services/board/boardService";
import {ActivatedRoute} from "@angular/router";
import {Board} from "../../models/board";
import {Mark} from "../../../mark/models/mark";

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.css']
})
export class BoardMenuComponent implements OnInit {
  private boardId: string;
  private boardModel: Board;
  @Input() menuVisible:string;
  @Output() isClosed = new EventEmitter<Boolean>();
  private creatorVisible = 'hidden';
  private menuState = 'Menu';
  private bgList: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private boardService: BoardService) {
    console.log(this.activatedRoute.snapshot.params);
    this.boardId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.boardService.getBoardById(this.boardId).subscribe(value => {
      this.boardModel = value;
    });
    this.bgList.push('assets/pictures/bg1.jpg');
    this.bgList.push('assets/pictures/bg2.jpg');
    this.bgList.push('assets/pictures/bg3.jpg');
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

  hideMenu(closed:boolean): void {
    this.isClosed.emit(closed);
  }

  setBG(bg): void {
    this.boardModel.pictureUrl = bg;
    console.log(this.boardModel);
    this.boardService.updateBoard(this.boardModel).subscribe( value => {
      console.log(value);
    });
  }

  openMarkCreator(): void {
    this.creatorVisible = 'visible';
  }

  creatorIsClosed(closed:any){
    closed==true?this.creatorVisible='hidden':this.creatorVisible='visible';
  }
}
