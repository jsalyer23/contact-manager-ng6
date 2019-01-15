import { Injectable } from '@angular/core';
import { AngularTokenService, RegisterData } from 'angular-token';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userSignedIn$: Subject<boolean> = new Subject();
  private result: Response;

  constructor(private tokenService: AngularTokenService) {
    this.validateToken();
  }
  // 
  /**
   * Sign in User with email and password (TODO: Add optional userType param)
   *
   * @param {RegisterData} loginInfo
   * @returns {Observable<Response>}
   * @memberof AuthService
   */
  public getUser(loginInfo: RegisterData): Observable<Response> {
    return this.tokenService.signIn(loginInfo).pipe(map(
      (response) => {
        this.userSignedIn$.next(true);
        return response;
      }));
  }

  /**
   * Sends a new user's registration request to the server
   *
   * @param {RegisterData} loginInfo User register data
   * @returns {Observable<Response>}
   * @memberof AuthService
   */
  public registerUser(loginInfo: RegisterData): Observable<Response> {
    if (!loginInfo.passwordConfirmation) { return; } // Probably need to do this differently
  
    return this.tokenService.registerAccount(loginInfo).pipe(map(
      (response) => {
        this.userSignedIn$.next(true);
        return response;
      }));
  }
  
  
  /**
   * Destroys session and session data
   *
   * @returns {Observable<Response>}
   * @memberof AuthService
   */
  public logOutUser(): Observable<Response> {
    return this.tokenService.signOut().pipe(map(
      (response) => {
        this.userSignedIn$.next(false);
        return response;
    }));
  }

  /**
   * Validates the current token with the server
   *
   * @returns {Subscription}
   * @memberof AuthService
   */
  public validateToken() {
    return this.tokenService.validateToken().subscribe(
      (response) => {
        (response.status == 200) ? this.userSignedIn$.next(response.json().success) : this.userSignedIn$.next(false);
      }
    );
  }
}
