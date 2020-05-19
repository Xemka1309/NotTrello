import {ActivatedRoute} from "@angular/router";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MarkService} from "../../../../services/mark/markService";
import {Mark} from "../../models/mark";

@Component({
  selector: 'app-mark-creator',
  templateUrl: './mark-creator.component.html',
  styleUrls: ['./mark-creator.component.css']
})
export class MarkCreatorComponent implements OnInit {
  private boardId: number;
  public createMarkForm: FormGroup;
  @Input() isCreator: boolean;
  @Input() visible: string;
  @Input() markId: number;
  @Output() creatorIsClosed = new EventEmitter<Boolean>();
  @Output() markCreated = new EventEmitter<Mark>();
  @Output() markUpdated = new EventEmitter<Mark>();
  private colorList1: string[] = [];
  private colorList2: string[] = [];
  private buttonColor = '#008000';
  private markColor = '#696969';

  constructor(private activatedRoute: ActivatedRoute,
              private markService: MarkService) {
    console.log(this.activatedRoute.snapshot.params);
    this.boardId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.createMarkForm = new FormGroup({
      content: new FormControl()
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

  selectColor(index) {
    if(index>5){
      this.markColor = this.colorList2[index-5];
      this.buttonColor = this.markColor;
    } else {
      this.markColor = this.colorList1[index];
      this.buttonColor = this.markColor;
    }
  }

  createOrUpdateMark(): void {
    if(this.isCreator){
      this.createMark();
    } else {
      this.updateMark();
    }
  }

  createMark(): void {
    const content = this.createMarkForm.controls.content.value;
    const mark = new Mark();
    mark.content = content;
    mark.color = this.markColor;
    mark.board_id = this.boardId;
    this.markService.createMark(mark).subscribe(result => {
      console.log(result);
      if (result.status === 200) {
        this.markCreated.emit(result.body);
      }
    });
    this.hideCreator(true);
  }

  updateMark(): void {
    const content = this.createMarkForm.controls.content.value;
    const mark = new Mark();
    mark.content = content;
    mark.color = this.markColor;
    mark.board_id = this.boardId;
    mark.id = this.markId;
    this.markService.updateMark(mark).subscribe(result => {
      if (result.status === 200) {
        this.markUpdated.emit(mark);
      }
    });
    this.hideCreator(true);
  }
}
