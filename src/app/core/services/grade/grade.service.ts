import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grades } from 'src/app/courses/courses/courses.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GradeService {

  constructor (
    private http: HttpClient
  ) {
  }

  getGrades(id: number) {
    return this.http.get<Grades[]>(`${environment.url_api}/api/v1/grade/myGrade/${id}`);
  }
  getAllGrades() {
    return this.http.get<Grades[]>(`${environment.url_api}/api/v1/grade`);
  }
  getGradeByList(id: number) {
    return this.http.get<Grades>(`${environment.url_api}/api/v1/list/listWithGrade/${id}`);
  }
  getGradeByStudent(id: number) {
    return this.http.get<Grades>(`${environment.url_api}/api/v1/grade/gradeByStudent/${id}`);
  }
  patchGrade(id: number, data: Grades) {
    return this.http.patch<Grades>(`${environment.url_api}/api/v1/grade/${id}`, data);
  }
  createGrade(data: Grades) {
    return this.http.post<Grades>(`${environment.url_api}/api/v1/grade`, data);
  }
}