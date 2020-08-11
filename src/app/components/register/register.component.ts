import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../login/login.component';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    nickname: new FormControl('', [
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
        Validators.required,
        Validators.min(4)
    ]),
    role: new FormControl('ROLE_MEMBER', [
        Validators.required,
    ])
  });
  hide = true;
  matcher = new MyErrorStateMatcher();
  submitted = false;
  loading = false;
  roles = [{ ufName: 'Member', name: 'ROLE_MEMBER' },
  { ufName: 'Alumni', name: 'ROLE_ALUMNI' },
  { ufName: 'Freshman', name: 'ROLE_FRESHMEN' }]

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.registerService.register({
      firstName: this.firstNameInput.value,
      lastName: this.lastNameInput.value,
      nickname: this.nicknameInput.value,
      email: this.emailInput.value,
      password: this.passwordInput.value,
      roles: [this.roleInput.value.name],
    }).pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['']);
          this.loading = false;
        },
        () => {
          this.snackBar.open('New user could not be created.');
          this.loading = false;
        });
  }

  get firstNameInput() { return this.registerForm.get('firstName'); }
  get lastNameInput() { return this.registerForm.get('lastName'); }
  get nicknameInput() { return this.registerForm.get('nickname'); }
  get emailInput() { return this.registerForm.get('email'); }
  get passwordInput() { return this.registerForm.get('password'); }
  get roleInput() { return this.registerForm.get('role'); }
}
