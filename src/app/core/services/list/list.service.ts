import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grades } from 'src/app/courses/courses/courses.component';
import { environment } from 'src/environments/environment';

export interface List {
  id?: number;
  studentId?: number;
  studentListId: number | undefined;
}
@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor (
    private http: HttpClient
  ) {
  }
  AddStudentToList(data: List) {
    return this.http.post<List>(`${environment.url_api}/api/v1/users/listStudent`, data);
  }
  patchStudentToList(id: number, data: any) {
    return this.http.put(`${environment.url_api}/api/v1/users/listStudent/${id}`, data);
  }
  changeStudentList(data: List) {
    return this.http.patch<Grades>(`${environment.url_api}/api/v1/users/listStudent/listId`,
      data);
  }
  deleteStudentToList(id: number) {
    return this.http.delete(`${environment.url_api}/api/v1/users/listStudent/${id}`,);
  }
}
