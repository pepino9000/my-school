import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
import { EditUserComponent } from 'src/app/admin/edit-user/edit-user.component';
import { StudentModalComponent } from 'src/app/courses/student-modal/student-modal.component';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit {
  students!: Student[];
  constructor (
    private studentService: StudentService,
    public dialog: MatDialog,
  ) {}
  displayedColumns: string[] = ['id', 'name', 'rut', 'email', 'actions'];

  ngOnInit(): void {
    this.getAllStudents();
  }
  async getAllStudents() {
    this.studentService.getStudents()
      .subscribe(students => {
        this.students = students;
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
  openStudent(id: number): void {
    let dialogRef = this.dialog.open(StudentModalComponent, {
      width: '313px',
      panelClass: 'my-custom-dialog-class',
      data: {
        id: id
      }
    });
  }
}
