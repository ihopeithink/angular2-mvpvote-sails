import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  loading = false;
  ServerEmailError = false;

  loginForm: FormGroup;
  emailFormControl: FormControl;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    builder: FormBuilder
  ) {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]);
    this.loginForm = builder.group({
      email: this.emailFormControl
    });
  }

  signup() {
    event.preventDefault();
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.email)
      .subscribe(result => {


        if (result === true) {
          const currentUserSess = JSON.parse(localStorage.getItem('currentUser'));
          console.log(currentUserSess, 'login succ');
          // login successful
          this.router.navigate(['/ranking/list']);
        } else {
          // login failed
          this.ServerEmailError = true;
          this.loading = false;


        }
      }, err => {


        // login failed
        this.ServerEmailError = true;
        this.loading = false;
        console.log(this.ServerEmailError);
      });
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

}
