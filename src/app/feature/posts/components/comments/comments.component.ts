import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, delay, shareReplay } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() postId: number;
  comments$: Observable<Comment[]>

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.comments$ = this.apiService
      .get<Comment[]>(`comments?postId=${this.postId}`)
      .pipe(
        delay(300),
        shareReplay()
      )
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
