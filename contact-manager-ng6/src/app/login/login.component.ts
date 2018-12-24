import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterData } from 'angular-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser: any;
  private newUser: boolean;
  // Form Inputs
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public passwordConfirmation: FormControl = new FormControl('', [Validators.required])

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  private loginUser() {
    // If there is no email or password provided, don't make the request
    if (!this.email.value || !this.password.value) { return; }
    let loginInfo: RegisterData = {
      login: this.email.value,
      password: this.password.value,
      passwordConfirmation: this.passwordConfirmation.value
    };
    // This setting of the current user will probably go away
    this.currentUser = (this.newUser) ? 
          this.authService.registerUser(loginInfo) : this.authService.getUser(loginInfo);
  }
}
