import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, delay, distinctUntilChanged, filter, finalize, shareReplay, switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';
import { Post } from '../../models/post.model';
import { User } from 'src/app/core/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  userPosts$: Observable<Post[]>;
  isLoading = new BehaviorSubject<boolean>(false);
  postCharactersLength = 150;
  postId: number;
  
  @ViewChild('commentsModal') commentsModal: TemplateRef<any>;

  constructor(
    public userService: UserService,
    private apiService: ApiService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.checkSelectedUser();
  }

  checkSelectedUser() {
    this.userPosts$ = this.userService.selectedUser$
      .pipe(
        filter(user => !!user),
        distinctUntilChanged(), // Prevent duplicate Api requests while clicking on the same user (Caching also can fix).
        switchMap(user => this.getUserPosts(user!)),
        shareReplay()
      )
  }

  getUserPosts(user: User) {
    this.isLoading.next(true);
    return this.apiService
      .get<Post[]>(`posts?userId=${user?.id}`)
      .pipe(
        delay(150), // This delay is just to show the loading effect cause the api is so fast while getting data.
        finalize(()=> this.isLoading.next(false))
      )
  }

  onClickComment(postId: number) {
    this.postId = postId;
    this.openModal();
  }

  openModal() {
    this.modalService.open(this.commentsModal, {
      centered: true,
      size: "md",
      windowClass: "modal",
      scrollable: true,
    })
  }

}
