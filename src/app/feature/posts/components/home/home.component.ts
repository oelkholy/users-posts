import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userPosts$: Observable<Post[]>

  constructor(
    public userService: UserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getUserPosts();
  }

  getUserPosts() {
    this.userPosts$ = this.userService.selectedUser$
      .pipe(
        switchMap(user => this.apiService.get<Post[]>(`posts?userId=${user?.id}`))
      )
  }

}
