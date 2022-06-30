import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Student, StudentService } from 'src/app/core/services/students/students.service';

@Component({
  selector: 'app-see-courses',
  templateUrl: './see-courses.component.html',
  styleUrls: ['./see-courses.component.scss']
})
export class SeeCoursesComponent implements OnInit {

  roleParams: Params = {};
  students: Student[] = [];
  constructor (private activatedRoute: ActivatedRoute, private studentService: StudentService) {}

  async ngOnInit(): Promise<void> {
    this.roleParams = this.activatedRoute.snapshot.params;
    await this.getAllGrades();
  }

  async getAllGrades() {
    this.studentService.getStudents()
      .subscribe(student => {
        this.students = student;
        console.log(this.students);
      });
  }
}
