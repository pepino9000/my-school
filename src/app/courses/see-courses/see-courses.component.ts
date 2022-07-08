import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { EditUserComponent } from 'src/app/admin/edit-user/edit-user.component';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
import { Grades } from '../courses/courses.component';

@Component({
  selector: 'app-see-courses',
  templateUrl: './see-courses.component.html',
  styleUrls: ['./see-courses.component.scss']
})
export class SeeCoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'rut', 'actions'];

  roleParams: Params = {};
  students: Student[] = [];
  grade!: Grades;
  constructor (
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private gradeService: GradeService
  ) {}

  async ngOnInit(): Promise<void> {
    this.roleParams = this.activatedRoute.snapshot.params;
    let id = this.roleParams["id"];
    await this.getStudentsByGrade(id);
    await this.getAllGrades(id);
  }

  async getStudentsByGrade(id: number) {
    this.studentService.getStudentsByList(id)
      .subscribe(student => {
        this.students = student;
      });
  }
  async getAllGrades(id: number) {
    this.gradeService.getGradeByList(id)
      .subscribe(grade => {
        this.grade = grade;
      });
  }
  openDialog(id: number): void {
    let dialogRef = this.dialog.open(EditUserComponent, {
      width: '313px',
      panelClass: 'my-custom-dialog-class',
      data: {
        id: id
      }
    });
  }
}
