import {Component, OnInit} from "@angular/core";
import {BoardService} from "../../../../services/board/boardService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.css']
})
export class BoardMenuComponent implements OnInit {
  private boardId: string;
  constructor(private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.params);
    this.boardId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {

  }
}
