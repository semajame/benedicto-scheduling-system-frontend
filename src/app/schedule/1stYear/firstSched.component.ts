import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { SharedService } from 'src/app/shared.service';

@Component({
  templateUrl: 'firstSched.component.html',
})
export class firstSchedComponent implements AfterViewInit {
  @ViewChild('schedulerReference')
  scheduler: jqxSchedulerComponent;
  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    this.scheduler.ensureAppointmentVisible('1');
    this.sharedService.scheduler = this.scheduler;
  }

  generateAppointments(): any {
    this.sharedService.getSchedules().subscribe(
      (data) => {
        this.source.localdata = data.map((event) => ({
          id: event.id,
          subject_code: event.subject_code,
          subject: event.subject,
          units: event.units,
          location: event.location,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        console.log(this.source.localdata);
      },
      (error) => {
        console.error('Error loading schedules:', error);
      }
    );
  }

  source: any = {
    dataType: 'array',
    localdata: this.generateAppointments(),
    dataFields: [
      { name: 'id', type: 'string' },
      { name: 'subject', type: 'string' },
      { name: 'subject_code', type: 'string' },
      { name: 'units', type: 'string' },
      { name: 'location', type: 'string' },
      { name: 'start', type: 'date' },
      { name: 'end', type: 'date' },
    ],
    id: 'id',
  };

  appointmentDataFields: any = {
    id: 'id',
    subject: 'subject',
    subject_code: 'subject_code',
    units: 'units',
    location: 'location',
    from: 'start',
    to: 'end',
  };

  AppointmentAdd(event: any): void {
    const appointment = event.args.appointment.originalData;

    const subject_code = $('#subjectCode').val();
    const units = $('#units').val();

    const newAppointment = {
      subject_code: subject_code,
      subject: appointment.subject,
      units: units,
      location: appointment.location,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
    };

    this.sharedService.addSchedule(newAppointment).subscribe(
      (response) => {
        appointment.id = response.id;
        this.source.localdata.push(appointment);
        this.scheduler.source(this.dataAdapter);
      },
      (error) => console.error('Error adding schedule:', error)
    );
  }

  editDialogCreate = (dialog, fields, editAppointment) => {
    let subjectCodeContainer = `
      <div>
        <div class='jqx-scheduler-edit-dialog-label'>Subject Code</div>
        <div class='jqx-scheduler-edit-dialog-field'>
          <input id='subjectCode' width='100%' />
        </div>
      </div>`;
    fields.subjectContainer.append(subjectCodeContainer);

    let unitsContainer = `
      <div>
        <div class='jqx-scheduler-edit-dialog-label'>Units</div>
        <div class='jqx-scheduler-edit-dialog-field'>
          <input id='units' type='number' min='1' max='3' width='100%' />
        </div>
      </div>`;
    fields.subjectContainer.append(unitsContainer);
  };

  editDialogOpen = (dialog, fields, editAppointment) => {
    fields.repeatContainer.hide();
    fields.descriptionContainer.hide();

    fields.statusContainer.hide();
    fields.timeZoneContainer.hide();
    fields.allDayContainer.hide();
    fields.locationLabel.html('Location');

    if (editAppointment) {
      const appointmentData = editAppointment.originalData;
      $('#subjectCode').val(appointmentData.subject_code);
      $('#units').val(appointmentData.units);
    }
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date();

  resources: any = {
    colorScheme: 'scheme05',
    dataField: 'id',
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
      allDay: false,
    },
    {
      type: 'monthView',
      timeRuler: { hidden: false, scaleStartHour: 6 },
    },
  ];
}
