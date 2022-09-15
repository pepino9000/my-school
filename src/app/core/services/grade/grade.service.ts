import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from 'src/app/admin/activity/activity.component';
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
  createActivity(data: any) {
    return this.http.post(`${environment.url_api}/api/v1/activity`, data);
  }
  createActivitySelectionQ(data: any) {
    return this.http.post(`${environment.url_api}/api/v1/selectionQ`, data);
  }
  getActivitiesByStudent(id: number) {
    return this.http.get(`${environment.url_api}/api/v1/grade/getActivityByStudent/${id}`,);
  }
  getActivitiesWithStudent(id: number) {
    return this.http.get(`${environment.url_api}/api/v1/grade/getActivityByGradeWithStudents/${id}`,);
  }
  getActivityByStudent(studentId: number, activityId: number){
    return this.http.get(`${environment.url_api}/api/v1/grade/getActivityByStudent/${studentId}/${activityId}`)
  }
  getActivitiesByGrade(id: number) {
    return this.http.get(`${environment.url_api}/api/v1/grade/getActivityByGrade/${id}`,);
  }
  getActivity(id: number, userId: number) {
    return this.http.get<Activity[]>(`${environment.url_api}/api/v1/activity/getActivityWithQuestions/${id}/${userId}`,);
  }
  createActivitySelectionAnswers(data: any) {
    return this.http.post(`${environment.url_api}/api/v1/activityAnswer`, data);
  }
}
