import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-manager-ng6';

  constructor(private tokenService: AngularTokenService) {
    // this.loginUser('user@example.com', 'monkey67');
  }

  private loginUser(login: string, password: string) {
    this.tokenService.signIn({login: login, password: password})
        .subscribe((response) => { console.log(response), (error) => { console.error(error);}});
  }

  private registerUser(login: string, password: string, passwordConfirmation: string) {
    this.tokenService.registerAccount({
      login: login, password: password, passwordConfirmation: passwordConfirmation
    }).subscribe((response) => { console.log(response), (error) => { console.error(error); }})
  }
}
