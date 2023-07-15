import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
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

  constructor(
    private apiService: ApiService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.usersList$ = this.apiService.get<User[]>('users');
  }

  onSelectUser(user: User) {
    this.userService.selectedUser$.next(user);
  }

}
