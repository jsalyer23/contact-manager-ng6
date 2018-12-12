import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getUser(userId: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  }

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  /**
   * Get a single Post by ID
   * @param  postId { Number }
   * @return        { Post }
   */
  getPost(postId: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
  /**
   * Get Comments from a single Post
   * @param  postId { Number }
   * @return        { [Comment] } Array of Comments
   */
  getComments(postId: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  }
}
