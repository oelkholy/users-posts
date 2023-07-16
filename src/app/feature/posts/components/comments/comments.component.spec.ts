import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let modalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('NgbModal', ['dismissAll']);
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: NgbModal, useValue: modalService }]
    }).compileComponents();
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss the modal', () => {
    component.closeModal();
    expect(modalService.dismissAll).toHaveBeenCalled();
  });

});
