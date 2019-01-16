import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../users/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private user: Object;
  private userId: number;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => { this.userId = params.id; });
  }

  ngOnInit() {
    // Use this for admin rather than default users
    // this.dataService.getUser(this.userId).subscribe(data => this.user = data, err => console.error(err));
  }

  logOut() {
    // Don't need this yet but may in the future if there is other actions needed before redirecting
  }

}
