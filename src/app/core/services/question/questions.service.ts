import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface QuestionType {
  id:number,
  description: string
}
@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {

  constructor (
    private http: HttpClient
  ) {
  }

  getQuestionTypes() {
    return this.http.get<QuestionType[]>(`${environment.url_api}/api/v1/questionType`);
  }
  // getAllGrades() {
  //   return this.http.get<QuestionType[]>(`${environment.url_api}/api/v1/grade`);
  // }
  // getGradeByList(id: number) {
  //   return this.http.get<Grades>(`${environment.url_api}/api/v1/list/listWithGrade/${id}`);
  // }
  // getGradeByStudent(id: number) {
  //   return this.http.get<Grades>(`${environment.url_api}/api/v1/grade/gradeByStudent/${id}`);
  // }
  // patchGrade(id: number, data: Grades) {
  //   return this.http.patch<Grades>(`${environment.url_api}/api/v1/grade/${id}`, data);
  // }
  // createGrade(data: Grades) {
  //   return this.http.post<Grades>(`${environment.url_api}/api/v1/grade`, data);
  // }
}