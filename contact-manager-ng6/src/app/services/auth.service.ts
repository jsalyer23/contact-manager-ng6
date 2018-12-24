import { Injectable } from '@angular/core';
import { AngularTokenService, RegisterData } from 'angular-token';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSignedIn: Subject<boolean> = new Subject();

  constructor(private tokenService: AngularTokenService) { }

  public getUser(loginInfo: RegisterData) {
    return this.tokenService.signIn(loginInfo)
      .subscribe(
        (response) => {
          this.userSignedIn.next(true);
          return response.body.data,
            (error) => {
              // handle error and encourage them to try again
              console.error(error);
            }
        });
  }

  public registerUser(loginInfo: RegisterData) {
    if (!loginInfo.passwordConfirmation) { return; } // Probably need to do this differently
    return this.tokenService.registerAccount(loginInfo).subscribe((response) => {
      this.userSignedIn.next(true);
      return response.body.data,
      (error) => { console.error(error); }
    });
  }

  // public logOutUser() {
  //   return this.tokenService.signOut().map((response) => {
  //     this.userSignedIn.next(false);
  //     return response;
  //   });
  // }
}
