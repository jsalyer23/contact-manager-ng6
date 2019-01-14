import { Injectable } from '@angular/core';
import { AngularTokenService, RegisterData } from 'angular-token';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSignedIn$: Subject<boolean> = new Subject();
  // public currentUser: Object;
  private result: Response;

  constructor(private tokenService: AngularTokenService) {
    this.validateToken();
  }
  // : Observable<Response>
  public getUser(loginInfo: RegisterData) {
    console.log('Getting Exsisting User');
    return this.tokenService.signIn(loginInfo).pipe(map(
      (response) => {
        this.userSignedIn$.next(true);
        return response;
      }));
  }

  public registerUser(loginInfo: RegisterData) {
    if (!loginInfo.passwordConfirmation) { return; } // Probably need to do this differently
    console.log('Registering New User');
    
    return this.tokenService.registerAccount(loginInfo).pipe(map(
      (response) => {
        this.userSignedIn$.next(true);
        console.log('Within registerUser() AuthService');
        return response;
      }));
  }

  public logOutUser() {
    return this.tokenService.signOut().pipe(map(
      (response) => {
        this.userSignedIn$.next(false);
        console.log('User Logged Out...');
        console.log(response);
        
        return response;
    }));
  }

  public validateToken() {
    return this.tokenService.validateToken().subscribe(
      (response) => {
        (response.status == 200) ? this.userSignedIn$.next(response.json().success) : this.userSignedIn$.next(false);
      }
    );
  }
}
