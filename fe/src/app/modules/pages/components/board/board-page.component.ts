import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {
  private boardId: string;
  constructor(private activatedRoute: ActivatedRoute) {
    this.boardId = this.activatedRoute.snapshot.params.id;
  }
  ngOnInit(): void { }
}
