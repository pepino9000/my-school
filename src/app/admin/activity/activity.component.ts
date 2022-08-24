import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor (
    private gradeService: GradeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
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
    await this.getActivityToAnswer(Number(id));
  }

  async getActivityToAnswer(id: number) {
    this.gradeService.getActivity(id)
      .subscribe(act => {
        this.activities = act;
        if (act) {
          act.forEach((a: Activity) => {
            this.preguntas().push(this.newpregunta());
          });
        }
      });
  }
  onSubmit() {
    let data: any = [];
    this.productForm.value.preguntas.forEach((p: any, index: number) => {
      data.push({
        answer: p.resp.split('::')[0],
        question: p.resp.split('::')[1] ? Number(p.resp.split('::')[1]) : index,
        isCorrect: p.resp.split('::')[2] === 'true' ? true : false,
      });
    });
    console.log(data);
  }
}
