import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { MatCardModule } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser: Object;
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public passwordConfirmation: FormControl = new FormControl('', [Validators.required])

  constructor(private tokenService: AngularTokenService) {}

  ngOnInit() {}

  private loginUser() {
    // If there is no email or password provided, don't make the request
    if (!this.email.value || !this.password.value) { return; }
    this.tokenService.signIn({ login: this.email.value, password: this.password.value })
      .subscribe(
        (response) => {
          // handle response and navigate to their profile
          this.currentUser = response.body.data;
          console.log(response),
        (error) => {
          // handle error and encourage them to try again
          console.error(error); } });
  }

  private registerUser() {
    this.tokenService.registerAccount({
      login: this.email.value, password: this.password.value, passwordConfirmation: this.passwordConfirmation.value
    }).subscribe((response) => { console.log(response), (error) => { console.error(error); } })
  }
}
