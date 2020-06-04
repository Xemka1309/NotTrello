import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarService} from '../../../../services/snack-bar/snack-bar.service';
import {JoinBoardService} from '../../../../services/join-board/join-board.service';

@Component({
  selector: 'app-board-join',
  templateUrl: './board-join.component.html'
})
export class BoardJoinComponent {
  private hash;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private joinService: JoinBoardService,
              private snack: SnackBarService) {

    console.log(this.activatedRoute.snapshot.params);
    this.hash = this.activatedRoute.snapshot.params.str;
    joinService.tryJoin(this.hash).subscribe(result => {
      if (result) {
        this.router.navigate(['/board/' + result]);
      } else {
        this.router.navigate(['/home']);
        this.snack.openLongSnackBar('чевота ссылка битая...');
      }
    }, error => {
      this.router.navigate(['/home']);
      this.snack.openLongSnackBar('чевота ссылка битая...');
      console.log(error);
    });
  }
}
