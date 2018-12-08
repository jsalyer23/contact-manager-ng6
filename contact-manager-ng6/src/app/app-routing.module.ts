import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component'

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: []
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    children: []
  },
  {
    path: 'posts',
    component: PostsComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
