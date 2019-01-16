import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterData } from 'angular-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser: any;
  // Form Inputs
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public passwordConfirmation: FormControl = new FormControl('', [Validators.required])
  private newUser: boolean;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  private loginUser() {
    // If there is no email or password provided, don't make the request
    // TODO: Error handling for the user
    if (!this.email.value || !this.password.value) { return; }
    let loginInfo: RegisterData = this.getRegisterData();
    // TODO: Clean this up...
    (this.newUser) ?
      this.authService.registerUser(loginInfo)
        .subscribe(res => this.onLogin(res), err => this.onError(err)) :
      this.authService.getUser(loginInfo)
        .subscribe(res => this.onLogin(res), err => this.onError(err));
    }
    
    private onLogin(response: any) {
      this.currentUser = response.body.data || response;
      this.router.navigate([`/profile/${this.currentUser.id}`]);
    }

    private onError(error: any) {
      // Maybe error handling should go into an Alert service or component...
      // TODO: Handle errors better for the user and/or redirect
      console.error(error);
    }

    private getRegisterData(): RegisterData {
      return {
        login: this.email.value,
        password: this.password.value,
        passwordConfirmation: this.passwordConfirmation.value
      };
    }
}
