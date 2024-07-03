import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
// import { SchedComponent } from './schedule';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { firstSchedComponent } from './schedule/1st-year';
import { secondSchedComponent } from './schedule/2nd-year';
import { thirdSchedComponent } from './schedule/3rdYear';
import { fourthSchedComponent } from './schedule/4thYear';
import { TeacherRoutingComponent } from './teachers';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const adminModule = () =>
  import('./admin/admin.module').then((x) => x.AdminModule);
const profileModule = () =>
  import('./profile/profile.module').then((x) => x.ProfileModule);

const teachersModule = () =>
  import('./teachers/teacher.module').then((x) => x.TeacherModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  {
    path: 'admin',
    loadChildren: adminModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'teachers',
    loadChildren: teachersModule,
    component: TeacherRoutingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'schedule/1st-year',
    loadChildren: adminModule,
    component: firstSchedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'schedule/2nd-year',
    loadChildren: adminModule,
    component: secondSchedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'schedule/3rdYear',
    loadChildren: adminModule,
    component: thirdSchedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'schedule/4thYear',
    loadChildren: adminModule,
    component: fourthSchedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
