import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { USERDATA } from '../../data/user.test-data';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userSErvice: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, NgbDropdownModule],
      providers: [UserService]
    });
    userSErvice = TestBed.inject(UserService);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected user on select user', () => {
    const user: User = USERDATA;
    component.onSelectUser(user);
    userSErvice.selectedUser$.subscribe(
      selectedUser => expect(selectedUser).toEqual(user)
    )
  });

});
