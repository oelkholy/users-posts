import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LimitCharactersPipe } from './pipes/limit-characters.pipe';



@NgModule({
  declarations: [
    LimitCharactersPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    LimitCharactersPipe
  ]
})
export class SharedModule { }
