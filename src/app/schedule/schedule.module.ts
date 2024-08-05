import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
// import { ProspectusFirstComponent } from './IT/1st-year/prospectus-1st.component';
// import { ProspectusSecondComponent } from './IT/2nd-year/prospectus-2nd.component';
// import { ProspectusThirdComponent } from './IT/3rd-year/prospectus-3rd.component';
// import { ProspectusFourthComponent } from './IT/4th-year/prospectus-4th.component';
import { LayoutComponent } from './layout.component';
import { ProspectusRoutingModule } from './schedule.routing.module';
import { ScheduleComponent } from './schedule.component';

// SCHEDULE
import { firstSchedComponent } from './IT/1st-year/firstSched.component';
import { secondSchedComponent } from './IT/2nd-year/secondSched.component';

// ENLISTMENT
import { firstEnlistmentComponent } from './IT/1st-year/firstEnlistment.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProspectusRoutingModule,
    jqxSchedulerModule,
  ],
  declarations: [
    // ProspectusFirstComponent,
    // ProspectusSecondComponent,
    // ProspectusThirdComponent,
    // ProspectusFourthComponent,
    firstSchedComponent,
    secondSchedComponent,

    firstEnlistmentComponent,

    LayoutComponent,
    ScheduleComponent,
  ],
})
export class scheduleModule {}
