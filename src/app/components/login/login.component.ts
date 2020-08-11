import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
        Validators.required,
        Validators.min(4)
    ])
  });
  hide = true;
  matcher = new MyErrorStateMatcher();
  submitted = false;
  loading = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
    if (this.loginService.currentUserValue) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() { }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.emailInput.value, this.passwordInput.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['']);
          this.loading = false;
        },
        () => {
          this.snackBar.open("Email or password incorrect.");
          this.loading = false;
        });
  }

  get emailInput() { return this.loginForm.get('email'); }
  get passwordInput() { return this.loginForm.get('password'); }
}
