import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { List, ListService } from 'src/app/core/services/list/list.service';
import { QuestionType, QuestionTypeService } from 'src/app/core/services/question/questions.service';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
import { Grades } from 'src/app/courses/courses/courses.component';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {
  form!: FormGroup;
  account: any = [];
  teachers: any = [];
  lists: List[] = [];
  data: Student | undefined;
  response: boolean = false;
  grades!: Grades[];
  courseExist: boolean = false;
  questionTypes: QuestionType[] =[];
  constructor (
    private formBuilder: FormBuilder,
    private questionService: QuestionTypeService,
    private gradeService: GradeService,
  ) {
    this.buildForm();
  }

  get rut() {
    return this.form.get('rut');
  }
  get role() {
    return this.form.get('role');
  }

  async ngOnInit(): Promise<void> {
    await this.getAllQuestionType();
    await this.getAllGrades();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      grade: ['', [Validators.required]],
      questionTypes: ['', [Validators.required]],
    });
  }
  
  async getAllQuestionType() {
    this.questionService.getQuestionTypes()
      .subscribe(q => {
        this.questionTypes = q;
      });
  }
  async getAllGrades() {
    this.gradeService.getAllGrades()
      .subscribe(grade => {
        this.grades = grade;
      });
  }

}
