import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/modules/user/models/user';
import {FormControl, FormGroup} from "@angular/forms";
import {SnackBarService} from '../../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.css']
})
export class ProfileComponent implements OnInit {
  public avatar_stock = '/assets/icons/avatar.svg';
  user: User;
  public userForm: FormGroup;
  constructor(private userService: UserService,
              private snack: SnackBarService,) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(result => {
      this.user = result;
      console.log(this.user);

      this.userForm.controls.name.setValue(this.user.name);
      this.userForm.controls.surname.setValue(this.user.family);
      this.userForm.controls.nickname.setValue(this.user.nickname);
      this.userForm.controls.login.setValue(this.user.login);
      this.userForm.controls.email.setValue(this.user.email);
    }, error => console.log(error));
    this.userForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      nickname: new FormControl(),
      email: new FormControl(),
      login: new FormControl(),
    });
   }

  public isValid(){
    if (!this.userForm.controls.name.value || (this.userForm.controls.name.value as string).length < 4){
      return false;
    }
    if (!this.userForm.controls.email.value || (this.userForm.controls.email.value as string).length < 4) {
      return false;
    }
    return true;
  }

  public submit() {
    let user = this.user;
    user.name = this.userForm.controls.name.value;
    user.email = this.userForm.controls.email.value;
    user.family = this.userForm.controls.surname.value;
    user.nickname = this.userForm.controls.nickname.value;
    console.log(user);
    this.userService.editUser(this.user).subscribe((result) => {
      console.log(result);
      if (result.status === 200) {
        this.snack.openLongSnackBar('Данные профиля обновлены!');
      }
    }, error => console.log(error));
  }
}
