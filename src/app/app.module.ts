import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
// import { SchedComponent } from './schedule/';
import { firstSchedComponent } from './schedule/1st-year';
import { secondSchedComponent } from './schedule/2nd-year';
import { thirdSchedComponent } from './schedule/3rdYear';
import { fourthSchedComponent } from './schedule/4thYear';
// import { TeacherRoutingComponent } from './teachers/teacher.component';
// import { TeacherModule } from './teachers/teacher.module';
import { prospectusModule } from './prospectus/prospectus.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    prospectusModule,
    // TeacherModule,
    jqxSchedulerModule,
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    firstSchedComponent,
    secondSchedComponent,
    thirdSchedComponent,
    fourthSchedComponent,

    // TeacherRoutingComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AccountService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
