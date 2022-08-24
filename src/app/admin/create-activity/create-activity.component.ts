import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { List } from 'src/app/core/services/list/list.service';
import { QuestionType, QuestionTypeService } from 'src/app/core/services/question/questions.service';
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
  response: boolean = false;
  grades!: Grades[];
  courseExist: boolean = false;
  questionTypes: QuestionType[] =[];
  checked = false;

  constructor (
    private formBuilder: FormBuilder,
    private questionService: QuestionTypeService,
    private gradeService: GradeService,
    private fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      preguntas: this.fb.array([]),
    });
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
      datePicker: ['', [Validators.required]]
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

  name = 'Angular';
  productForm: FormGroup;
  preguntas(): FormArray {
    return this.productForm.get("preguntas") as FormArray;
  }

  newpregunta(): FormGroup {
    return this.fb.group({
      pregunta: '',
      resp1: '',
      resp2: '',
      resp3: '',
      resp4: '',
      isCorrect: '',
    });
  }

  addPregunta() {
    this.preguntas().push(this.newpregunta());
  }

  removepreguntas(i: number) {
    this.preguntas().removeAt(i);
  }

  async newActivity(data: any) {
    this.gradeService.createActivity(
      data
    ).subscribe((activity: any) => {
      this.productForm.value.preguntas.forEach((p: any, index: number) => {
        this.response = true;
        let activityData = {
          gradeListId: data.gradeListId,
          activityId: activity.id,
          question: p.pregunta,
          answer: p.resp1,
          isCorrect: p.isCorrect === 'A' ? true : false,
          idQuestion: index
        };
        this.gradeService.createActivitySelectionQ(activityData).subscribe(d => {});
        let activityData2 = {
          gradeListId: data.gradeListId,
          activityId: activity.id,
          question: p.pregunta,
          answer: p.resp2,
          isCorrect: p.isCorrect === 'B' ? true : false,
          idQuestion: index
        };
        this.gradeService.createActivitySelectionQ(activityData2).subscribe(d => {});
        let activityData3 = {
          gradeListId: data.gradeListId,
          activityId: activity.id,
          question: p.pregunta,
          answer: p.resp3,
          isCorrect: p.isCorrect === 'C' ? true : false,
          idQuestion: index
        };
        this.gradeService.createActivitySelectionQ(activityData3).subscribe(d => {});
        let activityData4 = {
          gradeListId: data.gradeListId,
          activityId: activity.id,
          question: p.pregunta,
          answer: p.resp4,
          isCorrect: p.isCorrect === 'D' ? true : false,
          idQuestion: index
        };
        this.gradeService.createActivitySelectionQ(activityData4).subscribe(d => {});
      });
    });
  }

  onSubmit() {
    const userData = window.localStorage.getItem('user');
    if (userData !== null && userData !== undefined) {
      const { id } = JSON.parse(userData);
      const data = {
        gradeListId: Number(this.form.value.grade),
        questionTypeId: Number(this.form.value.questionTypes),
        teacherId: Number(id),
        closeDateAt: this.form.value.datePicker,
        answered: false,
        score: 0,
        open: true,
      };
      this.newActivity(data);
    }
  }

  // createActivity
}
