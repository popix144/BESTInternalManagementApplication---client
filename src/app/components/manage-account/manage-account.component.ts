import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  showProgressBar: boolean = false;
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [
        Validators.required
    ])
  });

  constructor(private userService: UserService,
              private snackBar: MatSnackBar) { }

  get passwordInput() { return this.changePasswordForm.get('password'); }

  ngOnInit() {
  }

  onSubmit() {
    this.showProgressBar = true;
    this.userService.changePassword(this.passwordInput.value).subscribe(
      (data) => {
        this.snackBar.open("Password changed successfully.");
      }, (error) => {
        this.snackBar.open("Password could not be changed.");
        this.showProgressBar = false;
      }, () => {
        this.showProgressBar = false;
    });
  }

}
