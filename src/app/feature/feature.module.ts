import { NgModule } from '@angular/core';

import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
