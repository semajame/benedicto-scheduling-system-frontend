import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
// import { environment } from '../../environments/environment';
import { Teachers } from '../_models/teachers';

const baseUrl = `${environment.apiUrl}/teachers`;

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private teacherSubject: BehaviorSubject<Teachers>;
  public teachers: Observable<Teachers>;

  constructor(private router: Router, private http: HttpClient) {
    this.teacherSubject = new BehaviorSubject<Teachers>(null);
    this.teachers = this.teacherSubject.asObservable();
  }

  public get teacherValue(): Teachers {
    return this.teacherSubject.value;
  }

  getAll() {
    return this.http.get<Teachers[]>(`${baseUrl}/all-teachers`);
  }

  getById(id: string) {
    return this.http.get<Teachers>(`${baseUrl}/${id}`);
  }

  // create(params) {
  //   return this.http.post(baseUrl, params);
  // }

  createTeacher(teacher: Teachers) {
    return this.http.post(`${baseUrl}/add-teacher`, teacher);
  }
  // update(id, params) {
  //   return this.http.put(`${baseUrl}/${id}`, params).pipe(
  //     map((teachers: any) => {
  //       // update the current teachers if it was updated
  //       if (teachers.id === this.teachersValue.id) {
  //         // publish updated teachers to subscribers
  //         teachers = { ...this.teachersValue, ...teachers };
  //         this.teachersSubject.next(teachers);
  //       }
  //       return teachers;
  //     })
  //   );
  // }

  // delete(id: string) {
  //   return this.http.delete(`${baseUrl}/${id}`).pipe(
  //     finalize(() => {
  //       // auto logout if the logged in account was deleted
  //       if (id === this.accountValue.id) this.logout();
  //     })
  //   );
  // }
}
