import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {
  public regForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      name: new FormControl(),
      family: new FormControl(),
      nickname: new FormControl(),
      email: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.regForm.controls[controlName].hasError(errorName);
  }

  public submit() {
    const user = new User();
    user.id = 0;
    user.name = this.regForm.controls.name.value;
    user.email = this.regForm.controls.email.value;
    user.family = this.regForm.controls.family.value;
    user.login = this.regForm.controls.login.value;
    user.nickname = this.regForm.controls.nickname.value;
    user.password = this.regForm.controls.password.value;
    document.location.href = document.location.hostname;
  }
}
