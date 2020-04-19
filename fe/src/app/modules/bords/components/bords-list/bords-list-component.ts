import { Component, OnInit, Inject } from '@angular/core';
import { BordsService } from 'src/app/services/bords/bordsService';
import { Bord } from '../../models/bord';

@Component({
  selector: 'app-bords-list',
  templateUrl: './bords-list-component.html',
  styleUrls: ['./bords-list-component.css']
})
export class BordsListComponent implements OnInit {
  public boards: Bord[];
  constructor(private bordService: BordsService) { }
  public ngOnInit(): void {
    this.bordService.getBords().subscribe(result => {
      this.boards = result;
    }, error => console.log(error));
    console.log("BOARDS");
    console.log(this.boards);
  }
}
