import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { List, ListService } from 'src/app/core/services/list/list.service';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
import { Grades } from 'src/app/courses/courses/courses.component';
import { MyValidators } from 'src/utils/validator';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.scss']
})
export class CreateCoursesComponent implements OnInit {
  form!: FormGroup;
  account: any = [];
  teachers: any = [];
  lists: List[] = [];
  data: Student | undefined;
  response: boolean = false;
  grades!: Grades[];
  courseExist: boolean = false;
  constructor (
    private formBuilder: FormBuilder,
    private listService: ListService,
    private gradeService: GradeService,
    private studentService: StudentService,
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
    await this.getAllList();
    await this.getAllTeachers();
    await this.getAllGrades();
  }

  async create(event: Event) {
    event.preventDefault();
    this.gradeService.getAllGrades()
      .subscribe(async grade => {
        this.grades = grade;
        if (!grade.find((g) => (Number(g.year) === Number(this.form.value.year) && g.letter === this.form.value.letter))) {
          this.courseExist = false;
          if (this.form.valid) {
            if (this.form.value.listId === "") {
              await this.createList();
            }
            else {
              let data = {
                ...this.form.value,
              };
              this.gradeService.createGrade(
                data
              ).subscribe((grade) => {
              });
            }
          }
        } else {
          this.courseExist = true;
        }
      });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      year: ['', [Validators.required]],
      letter: ['', [Validators.required]],
      listId: ['', []],
      teacherId: ['', []],
    });
  }

  async getAllList() {
    this.listService.getAllList()
      .subscribe(list => {
        this.lists = list;
      });
  }
  async getAllTeachers() {
    this.studentService.getTeachers()
      .subscribe(teachers => {
        this.teachers = teachers;
      });
  }
  async getAllGrades() {
    this.gradeService.getAllGrades()
      .subscribe(grade => {
        this.grades = grade;
      });
  }
  async createList() {
    this.listService.createList()
      .subscribe(list => {
        let data = {
          ...this.form.value,
          listId: list.id
        };
        this.gradeService.createGrade(
          data
        ).subscribe((grade) => {
          this.response = true;
        });
      });
  }

}
