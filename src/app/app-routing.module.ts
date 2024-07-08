import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home';
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
const prospectusModule = () =>
  import('./prospectus/prospectus.module').then((x) => x.prospectusModule);
const teachersModule = () =>
  import('./teachers/teacher.module').then((x) => x.TeacherModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  {
    path: 'prospectus',
    loadChildren: prospectusModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'admin',
    loadChildren: adminModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'teachers',
    loadChildren: teachersModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'schedule/1st-year',
    component: firstSchedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'schedule/2nd-year',
    component: secondSchedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'schedule/3rdYear',
    component: thirdSchedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'schedule/4thYear',
    component: fourthSchedComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
