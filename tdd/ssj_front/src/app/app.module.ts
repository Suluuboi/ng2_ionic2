import { NgModule } from '@angular/core';
import { NgZorroAntdModule }  from 'ng-zorro-antd';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { InterceptorService } from './_core/service/interceptor/interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './_core/_core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: '/assets/fonts/iconfont' })
  ],
  providers: [
    // {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }