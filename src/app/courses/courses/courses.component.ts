import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateCoursesComponent } from 'src/app/admin/create-courses/create-courses.component';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { StudentModalComponent } from '../student-modal/student-modal.component';

export interface Grades {
  id: number,
  letter: string,
  teacherId: number,
  listId?: number,
  list_id?: number,
  createdAt: string;
  year: string;
  name: string;
  lastName: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  roleParams: Params = {};
  grades: Grades[] = [];
  constructor (
    private activatedRoute: ActivatedRoute,
    private gradeService: GradeService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  async ngOnInit(): Promise<void> {
    const userData = window.localStorage.getItem('user');
    if (userData !== null) {
      this.roleParams = this.activatedRoute.snapshot.params;
      let user = JSON.parse(userData);
      await this.getAllGrades(user.id);
    }
  }

  async getAllGrades(id: number) {
    this.gradeService.getGrades(id)
      .subscribe(grade => {
        this.grades = grade;
      });
  }

  async more(id: number) {
    this.router.navigate([`/courses/students/${id}`]);
  }
  async activities(id: number) {
    this.router.navigate([`/courses/activities/${id}`]);
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(CreateCoursesComponent, {
      width: '313px',
      panelClass: 'my-custom-dialog-class',
    });
  };
}
