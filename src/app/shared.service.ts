import { Injectable } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  scheduler: jqxSchedulerComponent; // Define the type of scheduler if possible

  constructor() {}

  closeDialogOnNavClick = () => {
    if (this.scheduler) {
      this.scheduler.closeDialog();
    }
  };
}
