import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  usersList$: Observable<User[]>
  selectedUser$: BehaviorSubject<User | null>

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.selectedUser$ = this.userService.selectedUser$;
    this.getUsersList();
  }

  getUsersList() {
    this.usersList$ = this.apiService.get('users');
  }

  onSelectUser(user: User) {
    this.userService.selectedUser$.next(user);
  }

}
