import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsModule } from '../../posts.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user.model';
import { ApiService } from 'src/app/core/services/api.service';
import { finalize, of } from 'rxjs';
import { USERDATA } from 'src/app/core/data/user.test-data';
import { UserService } from 'src/app/core/services/user.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let modalService: jasmine.SpyObj<NgbModal>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async() => {
    modalService = jasmine.createSpyObj('modalService', ['open'])
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, PostsModule],
      providers: [
        UserService,
        { provide: NgbModal, useValue: modalService },
        { provide: ApiService, useValue: apiService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should get user post if there is any selected user', () => {
    const user: User = USERDATA;
    const userService = new UserService();
    userService.selectedUser$.next(user);
    component.checkSelectedUser();
    expect(component.userPosts$).toBeTruthy();
  });

  it('should get user posts with correct url and userId', () => {
    const user: User = USERDATA;
    apiService.get.and.returnValue(of([]));
    component.getUserPosts(user);
    expect(apiService.get).toHaveBeenCalledWith(`posts?userId=${user.id}`);
  });

  it('should set isLoading to true before getting user posts', () => {
    const user = USERDATA;
    apiService.get.and.returnValue(of([]));
    component.getUserPosts(user);
    expect(component.isLoading.value).toBeTrue();
  });

  it('should set isLoading to false after getting user posts', () => {
    const user = USERDATA;
    apiService.get.and.returnValue(of([]));
    component.getUserPosts(user).pipe(
      finalize(() => expect(component.isLoading.value).toBeFalse())
    ).subscribe()
  });

  it('should update postId while clicking on a post comment', () => {
    spyOn(component, 'openModal');
    const postId = 1;
    component.onClickComment(postId);
    expect(component.postId).toEqual(postId);
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should call modalService.open() with correct options', () => {
    component.commentsModal = {} as any;
    component.openModal();
    expect(modalService.open).toHaveBeenCalledWith(component.commentsModal, {
      centered: true,
      size: "md",
      windowClass: "modal",
      scrollable: true,
    });
  });

});
