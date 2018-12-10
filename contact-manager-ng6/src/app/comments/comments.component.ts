import { Component, OnInit } from '@angular/core';
import { Comment } from './comment';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, transition,
         animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  private comments: [Comment];
  private postId: number;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => { if (params.id) { this.postId = params.id; } });
  }

  ngOnInit() {
    this.dataService.getComments(this.postId).subscribe((result) => { if (result) { this.comments = result; }});
  }

}
