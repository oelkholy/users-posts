import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, delay, distinctUntilChanged, filter, finalize, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';
import { Post } from '../../models/post.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  userPosts$: Observable<Post[]>;
  postCharactersLength = 150;
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    public userService: UserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.checkSelectedUser();
  }

  checkSelectedUser() {
    this.userPosts$ = this.userService.selectedUser$
      .pipe(
        filter(user => !!user),
        distinctUntilChanged(), // Prevent duplicate Api requests while clicking on the same user (Caching also can fix)
        switchMap(user => this.getUserPosts(user!)),
      )
  }

  getUserPosts(user: User) {
    this.isLoading.next(true);
    return this.apiService
      .get<Post[]>(`posts?userId=${user?.id}`)
      .pipe(
        delay(150),
        finalize(()=> this.isLoading.next(false))
      )
  }

}
