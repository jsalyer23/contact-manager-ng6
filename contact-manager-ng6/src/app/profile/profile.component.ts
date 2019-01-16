import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Intended for logOut() if used
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: Object;

  constructor(private tokenService: AngularTokenService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Pull logged in user from AngularToken
    this.user = this.tokenService.currentUserData
  }

}
