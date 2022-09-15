import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { Student, StudentService } from 'src/app/core/services/students/students.service';
import { MyValidators } from 'src/utils/validator';

export interface DialogData {
  studentId: any;
  activityId: any;
  name: string;
}
@Component({
  selector: 'app-activity-modal.',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.scss']
})

export class ActivityModalComponent implements OnInit {
  form!: FormGroup;
  account: any = [];
  user: Student | undefined;
  response: boolean = false;
  student!: Student;
  activity: any;
  correctAnswers:any=0;
  puntajeTotal = 0;
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gradeService: GradeService,
  ) {
  }

  get rut() {
    return this.form.get('rut');
  }

  ngOnInit(): void {
    this.getAllStudentsWithActivities(this.data.studentId,this.data.activityId)
    console.log(this.data.name)
  }
  async getAllStudentsWithActivities(studentId: number, activityId: number) {
    this.gradeService.getActivityByStudent(studentId, activityId)
      .subscribe(std => {
        this.activity = std;
        this.activity.forEach((element:any) => {
          this.puntajeTotal = 70/this.activity.length
          if(element.filter((e:any)=>e.answered && e.is_correct).length > 0){
            this.correctAnswers=this.correctAnswers+1
          }
        });
      });
  }
}
