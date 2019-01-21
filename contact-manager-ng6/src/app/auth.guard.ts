import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularTokenService } from 'angular-token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: AngularTokenService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenService.userSignedIn()) {
      console.log(this.tokenService.currentUserData);

      return true;
    } else {
      console.log('User not signed in..');
      
      this.router.navigate(['/']); // This default redirect may need to be adjusted
      return false;
    }
  }
}
