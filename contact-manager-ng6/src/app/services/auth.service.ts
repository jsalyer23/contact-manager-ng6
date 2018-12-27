import { Injectable } from '@angular/core';
import { AngularTokenService, RegisterData } from 'angular-token';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSignedIn$: Subject<boolean> = new Subject();
  private result: Response;

  constructor(private tokenService: AngularTokenService) {
    this.validateToken();
  }

  public getUser(loginInfo: RegisterData) {
    return this.tokenService.signIn(loginInfo).subscribe(
      (response) => {
        this.userSignedIn$.next(true);
        return response.body.data,
      (error) => { console.error(error); }
    });
  }

  public registerUser(loginInfo: RegisterData) {
    if (!loginInfo.passwordConfirmation) { return; } // Probably need to do this differently
    return this.tokenService.registerAccount(loginInfo).subscribe(
      (response) => {
        this.userSignedIn$.next(true);
        return response.body.data,
      (error) => { console.error(error); }
    });
  }

  public logOutUser() {
    return this.tokenService.signOut().subscribe(
      (response) => {
        this.userSignedIn$.next(false);
        console.log('User Logged Out...');
        return response.body.data,
      (error) => { console.error(error); }
    });
  }

  public validateToken() {
    return this.tokenService.validateToken().subscribe(
      (response) => {
        (response.status == 200) ? this.userSignedIn$.next(response.json().success) : this.userSignedIn.next(false);
      }
    );
  }
}
