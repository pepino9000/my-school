import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Student {
  id: number,
  name: string,
  secondName: string,
  lastName: string,
  secondLastName: string,
  email: string,
  createdAt: string,
  rut: string,
  role: number,
}
@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor (
    private http: HttpClient
  ) {
  }
  getStudents() {
    return this.http.get<Student[]>(`${environment.url_api}/api/v1/users/student`);
  }
  createStudent(data: Student) {
    return this.http.post<Student>(`${environment.url_api}/api/v1/users/student`, data);
  }
}
