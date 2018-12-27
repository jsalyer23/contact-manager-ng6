import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private currentUrl: String;

  constructor(private router: Router, public authService: AuthService) {
    router.events.subscribe((_: NavigationEnd) => { this.currentUrl = router.url });
    console.log(this.currentUrl);
  }

  ngOnInit() {
    console.log(this.currentUrl);
  }

  /**
   * Logs out current user and navigates back to Home view
   */
  public logOutUser() {
    this.authService.logOutUser().subscribe(() => { this.router.navigate(['/'])});
  }

}
