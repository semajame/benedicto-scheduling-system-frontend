import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { SharedService } from 'src/app/shared.service';

@Component({
  templateUrl: 'firstSched.component.html',
})
export class firstSchedComponent implements AfterViewInit {
  @ViewChild('schedulerReference') scheduler: jqxSchedulerComponent;

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    this.scheduler.ensureAppointmentVisible('1');
  }

  generateAppointments(): any {
    this.sharedService.getSchedules().subscribe(
      (data) => {
        const appointments = data.map((event) => ({
          id: event.id.toString(),
          subject_code: event.subject_code,
          subject: event.subject,
          units: event.units,
          location: event.location,
          start: new Date(event.start),
          end: new Date(event.end),
          draggable: false,
          resizable: false,
        }));

        this.source.localdata = appointments;
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.scheduler.source(this.dataAdapter);
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
      { name: 'draggable', type: 'boolean' },
      { name: 'resizable', type: 'boolean' },
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
    draggable: 'draggable',
    resizable: 'resizable',
  };

  AppointmentAdd(event: any): void {
    const appointment = event.args.appointment.originalData;

    setTimeout(() => {
      const subject_code = $('#subjectCode').val();
      const units = $('#units').val();
      const subject = $('#subject').val();

      const newAppointment = {
        subject_code: subject_code,
        subject: subject,
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
          window.location.reload();
        },
        (error) => console.error('Error adding schedule:', error)
      );
    }, 100);
  }

  editDialogCreate = (dialog, fields, editAppointment) => {
    let subjectCodeContainer = ` <div>
        <div class="jqx-scheduler-edit-dialog-label pr-0" style="padding-right: 0; padding-left: 0; ">Subject Code</div>
        <div class="jqx-scheduler-edit-dialog-field">
          <select id="subjectCode" name="subjectCode">
            <option value="IT110">IT110</option>
            <option value="IT111">IT111</option>
            <option value="UTS">UTS</option>
            <option value="MathWorld">MathWorld</option>
             <option value="Fil 1">Fil 1</option>
            <option value="PE 1">PE 1</option>
            <option value="NSTP 1">NSTP 1</option>
            <option value="MathPrep">MathPrep</option>
          </select>
        </div>
      </div>`;
    fields.subjectContainer.append(subjectCodeContainer);

    let subjectInput = `
    <div class="jqx-scheduler-edit-dialog-label">Subject</div>
      <div class="jqx-scheduler-edit-dialog-field">
        <select id="subject" name="subject">
          <option value="Introduction to Computing">Introduction to Computing</option>
          <option value="Computer Programming">Computer Programming</option>
          <option value="Understanding the Self">Understanding the Self</option>
          <option value="Math in the Modern World">Math in the Modern World</option>
           <option value="Komunikasyon sa Akademikong Filipino">Komunikasyon sa Akademikong Filipino</option>
          <option value="Wellness & Fitness">	Wellness & Fitness</option>
          <option value="National Service Training Prog. 1">	National Service Training Prog. 1</option>
          <option value="Pre Calculus for Non-STEM">Pre Calculus for Non-STEM</option>
        </select>
      </div>
 `;

    fields.subjectContainer.append(subjectInput);

    let unitsContainer = ` <div>
        <div class="jqx-scheduler-edit-dialog-label">Units</div>
        <div class="jqx-scheduler-edit-dialog-field">
          <select id="units" name="units">
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>`;
    fields.subjectContainer.append(unitsContainer);
  };

  editDialogOpen = (dialog, fields, editAppointment) => {
    fields.repeatContainer.hide();
    fields.subject.hide();
    fields.subjectLabel.hide();
    fields.descriptionContainer.hide();
    fields.statusContainer.hide();
    fields.timeZoneContainer.hide();
    fields.allDayContainer.hide();
    fields.locationLabel.html('Location');

    if (editAppointment) {
      const appointmentData = editAppointment.originalData;
      setTimeout(() => {
        $('#subjectCode').val(appointmentData.subject_code);
        $('#units').val(appointmentData.units);
        $('#subject').val(appointmentData.subject);
      }, 100); // Slight delay to ensure elements are available
    }
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  date: any = new jqx.date();

  resources: any = {
    colorScheme: 'scheme05',
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
      allDay: false,
    },
    {
      type: 'monthView',
      timeRuler: { hidden: false, scaleStartHour: 6 },
    },
  ];
}
