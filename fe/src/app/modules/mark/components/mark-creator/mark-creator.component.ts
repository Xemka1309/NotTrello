import {BoardService} from "../../../../services/board/boardService";
import {ActivatedRoute} from "@angular/router";
import {Board} from "../../../board/models/board";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-mark-creator',
  templateUrl: './mark-creator.component.html',
  styleUrls: ['./mark-creator.component.css']
})
export class MarkCreatorComponent implements OnInit {
  private boardId: string;
  private boardModel: Board;
  @Input() visible;
  @Output() creatorIsClosed = new EventEmitter<Boolean>();
  private colorList1: string[] = [];
  private colorList2: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private boardService: BoardService) {
    console.log(this.activatedRoute.snapshot.params);
    this.boardId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.boardService.getBoardById(this.boardId).subscribe(value => {
      this.boardModel = value;
    });
    this.colorList1.push('#FF00FF');
    this.colorList1.push('#0000FF');
    this.colorList1.push('#FFFF00');
    this.colorList1.push('#00FFFF');
    this.colorList1.push('#C0C0C0');
    this.colorList2.push('#00FF00');
    this.colorList2.push('#FF0000');
    this.colorList2.push('#CC6600');
    this.colorList2.push('#660099');
    this.colorList2.push('#00FF66');
  }

  hideCreator(closed): void {
    this.creatorIsClosed.emit(closed);
  }

  createMark(): void {
    this.boardService.updateBoard(this.boardModel).subscribe( value => {
      console.log(value);
    });
  }
}
