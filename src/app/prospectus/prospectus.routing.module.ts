import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProspectusFirstComponent } from './1st-year/prospectus-1st.component';
import { LayoutComponent } from './layout.component';
import { ProspectusComponent } from './prospectus.component';

const routes: Routes = [
  {
    path: '',
    component: ProspectusComponent,
    children: [
      { path: '1st-year', component: ProspectusFirstComponent },
      { path: '', component: LayoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectusRoutingModule {}
