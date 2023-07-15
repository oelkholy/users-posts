import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    HomeComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
