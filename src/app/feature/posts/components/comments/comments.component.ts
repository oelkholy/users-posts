import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, shareReplay } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
        shareReplay()
      )
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
