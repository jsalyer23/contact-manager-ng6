import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: []
  },
  {
    path: 'details/:id', // TODO: This should only be for admin users or just removed completely
    component: DetailsComponent,
    children: []
  },
  {
    path: 'posts',
    component: PostsComponent,
    children: []
  },
  {
    path: 'posts/:id/comments',
    component: CommentsComponent,
    children: []
  },
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
