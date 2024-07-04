import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Account, Role } from './_models';
import { SharedService } from 'src/app/shared.service';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  Role = Role;
  account: Account;

  constructor(
    private accountService: AccountService,
    public sharedService: SharedService
  ) {
    this.accountService.account.subscribe((x) => (this.account = x));
  }

  logout() {
    this.accountService.logout();
  }
}
