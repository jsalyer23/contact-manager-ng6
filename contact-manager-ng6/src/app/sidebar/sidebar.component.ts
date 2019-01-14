import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public user: Object;
  private currentUrl: String;

  constructor(private router: Router, public authService: AuthService) {
    router.events.subscribe((_: NavigationEnd) => { this.currentUrl = router.url });
    console.log(this.currentUrl);
  }

  ngOnInit() {
    console.log(this.currentUrl); // TODO: This needs cleaned up
    // this.user = this.authService.currentUser;
  }

  /** 
   * Logs out current user and navigates back to Home view
   */
  public logOut() {
    this.authService.logOutUser().subscribe(() => { this.router.navigate(['/'])});
  }

}
