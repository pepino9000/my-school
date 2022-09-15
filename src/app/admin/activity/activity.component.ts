import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeService } from 'src/app/core/services/grade/grade.service';

interface Answer {
  text: string,
  isCorrect: boolean;
}
export interface Activity {
  question: string,
  answers: Answer[],
}
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activities: Activity[] = [];
  userId!: number;
  activityId!: number;
  validQuestion: boolean = true;
  constructor (
    private gradeService: GradeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.productForm = this.fb.group({
      preguntas: this.fb.array([]),
    });
  }
  productForm!: FormGroup;
  preguntas(): FormArray {
    return this.productForm.get("preguntas") as FormArray;
  }
  newpregunta(): FormGroup {
    return this.fb.group({
      resp: ''
    });
  }

  async ngOnInit(): Promise<void> {
    let { id } = this.activatedRoute.snapshot.params;
    this.activityId = id;
    const userData = window.localStorage.getItem('user');
    if (userData !== null && userData !== undefined) {
      const { id } = JSON.parse(userData);
      this.userId = id;
    }
    await this.getActivityToAnswer(Number(this.activityId), this.userId);
  }

  async getActivityToAnswer(id: number, userId: number) {
    this.gradeService.getActivity(id, userId)
      .subscribe(act => {
        this.activities = act;
        if (act) {
          act.forEach((a: Activity) => {
            this.preguntas().push(this.newpregunta());
          });
        }else{
          this.validQuestion = act
        }
      });
  }
  async postActivityAnswer(data: any) {
    this.gradeService.createActivitySelectionAnswers(data)
      .subscribe(act => {
        console.log(act)
      });
  }
  onSubmit() {
    let data: any = [];
    this.productForm.value.preguntas.forEach((p: any, index: number) => {
      data.push({
        answer: p.resp.split('::')[0],
        question: p.resp.split('::')[1] ? Number(p.resp.split('::')[1]) : index,
        isCorrect: p.resp.split('::')[2] === 'true' ? true : false,
        userId: this.userId,
        activityId:this.activityId,
      });
      let answerData = {
        answer: p.resp.split('::')[0],
        questionId: p.resp.split('::')[1] ? Number(p.resp.split('::')[1]) : index,
        isCorrect: p.resp.split('::')[2] === 'true' ? true : false,
        userId: this.userId,
        activityId:this.activityId,
      }
      this.postActivityAnswer(answerData)
    });
    this.router.navigate([`/courses/see-activities`]);
  }
}
