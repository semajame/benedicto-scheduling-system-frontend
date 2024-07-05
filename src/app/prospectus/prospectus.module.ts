import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProspectusFirstComponent } from './1st-year/prospectus-1st.component';
import { LayoutComponent } from './layout.component';
import { ProspectusRoutingModule } from './prospectus.routing.module';
import { ProspectusComponent } from './prospectus.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ProspectusRoutingModule],
  declarations: [
    ProspectusFirstComponent,
    LayoutComponent,
    ProspectusComponent,
  ],
})
export class prospectusModule {}
