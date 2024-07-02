import { Component, OnInit } from '@angular/core';

import { TeacherService } from '@app/_services/teacher.service';
import { Teachers } from '../_models/teachers';

import { first } from 'rxjs/operators';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent implements OnInit {
  teachers: Teachers[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    this.teacherService
      .getAll()
      .pipe(first())
      .subscribe((teachers) => (this.teachers = teachers));
  }

  loadTeachers() {
    this.teacherService.getAll().subscribe((data: Teachers[]) => {
      this.teachers = data;
    });
  }

  // deleteAccount(id: string) {
  //     const account = this.teachers.find(x => x.id === id);
  //     account.isDeleting = true;
  //     this.teacherService.delete(id)
  //         .pipe(first())
  //         .subscribe(() => {
  //             this.teachers = this.teachers.filter(x => x.id !== id)
  //         });
  // }
}
