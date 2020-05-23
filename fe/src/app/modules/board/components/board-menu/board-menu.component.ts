import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoardService} from '../../../../services/board/boardService';
import {ActivatedRoute} from '@angular/router';
import {Board} from '../../../../models/board';
import {Mark} from '../../../../models/mark';
import {FormControl, FormGroup} from '@angular/forms';
import {Participant} from '../../../../models/participant';
import {UserService} from '../../../../services/user/user.service';

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.css']
})
export class BoardMenuComponent implements OnInit {
  private boardId: string;
  private boardModel: Board;
  private markList: Mark[] = [];
  private particList: Participant[] = [];
  private userList = [];
  @Input() menuVisible: string;
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() picChanged = new EventEmitter<boolean>();
  private isCreator: boolean;
  private creatorVisible = 'hidden';
  private markId = 0;
  private menuState = 'Меню';
  private bgList: string[] = [];
  public updateBoardForm: FormGroup;
  private iconSrc = {};

  constructor(private activatedRoute: ActivatedRoute,
              private boardService: BoardService,
              private userService: UserService) {
    console.log(this.activatedRoute.snapshot.params);
    this.boardId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.boardService.getBoardById(this.boardId).subscribe(value => {
      this.boardModel = value;
      this.markList = this.boardModel.marks;
      this.particList = this.boardModel.participants;
      this.particList.forEach(partic => {
        if (partic.role === 'ADMINISTRATOR') {
          this.iconSrc = '/assets/icons/admin.svg';
        } else if (partic.role === 'SENIOR') {
          this.iconSrc = '/assets/icons/senior.svg';
        } else if (partic.role === 'DEVELOPER') {
          this.iconSrc = '/assets/icons/developer.svg';
        }
        const iconObject = {icon: this.iconSrc};
        this.userService.getUserById(partic.user_id.toString()).subscribe(result => {
          this.userList.push(Object.assign({}, result, iconObject));
        });
      });
    });
    this.updateBoardForm = new FormGroup({
      title: new FormControl(),
      desc: new FormControl()
    });
    this.bgList.push('assets/pictures/bg1.jpg');
    this.bgList.push('assets/pictures/bg2.jpg');
    this.bgList.push('assets/pictures/bg3.jpg');
    this.bgList.push('assets/pictures/bg4.jpg');
    this.bgList.push('assets/pictures/bg5.jpg');
    this.bgList.push('assets/pictures/bg6.jpg');
  }

  infoClick(): void {
    this.menuState = 'Инфо';
  }

  bgClick(): void {
    this.menuState = 'Сменить фон';
  }

  marksClick(): void {
    this.menuState = 'Метки';
  }

  back(): void {
    this.menuState = 'Меню';
  }

  hideMenu(closed: boolean): void {
    this.isClosed.emit(closed);
    this.creatorVisible = 'hidden';
  }

  setBG(bg): void {
    this.boardModel.pictureUrl = bg;
    console.log(this.boardModel);
    this.boardService.updateBoard(this.boardModel).subscribe( value => {
      console.log(value);
      this.boardModel.pictureUrl = bg;
      this.picChanged.emit(true);
    });
  }

  openMarkCreator(isCreator, id): void {
    this.isCreator = isCreator;
    this.markId = id;
    this.creatorVisible = 'visible';
  }

  creatorIsClosed(closed: any) {
    closed ? this.creatorVisible = 'hidden' : this.creatorVisible = 'visible';
  }

  markCreated(mark: any) {
    this.markList.push(mark);
  }

  markUpdated(mark: any) {
    for (const i in this.markList) {
      if (this.markList[i].id === mark.id) {
        this.markList[i] = mark;
      }
    }
  }

  markDeleted(markId: any) {
    let index;
    for (index = 0; index < this.markList.length; ++index) {
      if (this.markList[index].id === markId) {
        this.markList.splice(index, 1);
      }
    }
  }

  updateBoard() {
    this.boardModel.title = this.updateBoardForm.controls.title.value;
    this.boardModel.description = this.updateBoardForm.controls.desc.value;
    this.boardService.updateBoard(this.boardModel).subscribe(result => {
      console.log(result);
    });
  }
}
