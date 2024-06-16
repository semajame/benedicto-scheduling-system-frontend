import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';

@Component({
  templateUrl: 'firstSched.component.html',
})
export class firstSchedComponent implements AfterViewInit {
  @ViewChild('schedulerReference', { static: false })
  scheduler: jqxSchedulerComponent;
  ngAfterViewInit(): void {}

  // generateAppointments(): any {
  //   let appointments = new Array();
  // }
  source: any = {
    dataType: 'json',
    dataFields: [
      { name: 'id', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'location', type: 'string' },
      { name: 'subject', type: 'string' },
      { name: 'calendar', type: 'string' },
      { name: 'start', type: 'date' },
      { name: 'end', type: 'date' },
    ],
    id: 'id',
  };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date();

  appointmentDataFields: any = {
    from: 'start',
    to: 'end',
    id: 'id',
    description: 'description',
    location: 'location',
    subject: 'subject',
    resourceId: 'calendar',
  };
  resources: any = {
    colorScheme: 'scheme03',
    dataField: 'calendar',
    source: new jqx.dataAdapter(this.source),
  };
  views: any[] = [
    {
      type: 'dayView',
      timeRuler: { hidden: false, scaleStartHour: 6 },
    },
    {
      type: 'weekView',
      timeRuler: { hidden: false, scaleStartHour: 6 },
      showAllDay: false,
    },
    { type: 'monthView' },
  ];

  editDialogCreate = (dialog, fields, editAppointment) => {
    // Hide the 'Repeat' field
    console.log(fields);

    fields.allDayContainer.hide();

    fields.descriptionContainer.hide();
    fields.colorContainer.hide();
    fields.statusContainer.hide();
    fields.timeZoneContainer.hide();

    let customContainer1 = '<div style:"display: block;>';
    customContainer1 +=
      "<div class='jqx-scheduler-edit-dialog-label'>Units</div>";
    customContainer1 +=
      "<div class='jqx-scheduler-edit-dialog-field'><table width='100%'border='0' cellspacing='0' cellpadding='0' ><tr><td width='90%'><input id='custom1'type='number' maxlength='3' minlength='1'></input ></td><td width='10%' align='right'></td></tr></table> </div>";
    customContainer1 += '</div>';
    fields.repeatContainer.append(customContainer1);

    let customContainer2 = '<div>';
    customContainer2 +=
      "<div class='jqx-scheduler-edit-dialog-label'>Sub Code</div>";
    customContainer2 +=
      "<div class='jqx-scheduler-edit-dialog-field'><input id='custom2'></input></div>";
    customContainer2 += '</div>';
    fields.repeatContainer.append(customContainer2);
  };

  closeDialogOnNavClick = () => {
    if (this.scheduler) {
      this.scheduler.closeDialog();
    }
  };
}
