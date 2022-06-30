import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GradeService } from 'src/app/core/services/grade/grade.service';

export interface Grades {
  id: number,
  letter: string,
  courseId: number,
  teacherId: number,
  listId: number,
  createdAt: string;
  year: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  roleParams: Params = {};
  grades: Grades[] = [];
  constructor (private activatedRoute: ActivatedRoute, private gradeService: GradeService) {}

  async ngOnInit(): Promise<void> {
    this.roleParams = this.activatedRoute.snapshot.params;
    await this.getAllGrades();
  }

  async getAllGrades() {
    this.gradeService.getGrades()
      .subscribe(grade => {
        this.grades = grade;
      });
  }
}
