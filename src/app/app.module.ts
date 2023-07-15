import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiCacheInterceptor } from './core/interceptors/api-cache.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiCacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
