import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
import { LOCALE_ID, NgModule } from '@angular/core';

@Component({
  selector: 'app-see-activities',
  templateUrl: './see-activities.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  styleUrls: ['./see-activities.component.scss']
})
export class SeeActivitiesComponent implements OnInit {
  id: any;
  userId: any;
  activities: any;
  constructor (
    private router: Router,
    private gradeService: GradeService,

  ) {}

  ngOnInit(): void {
    this.id = window.localStorage.getItem('user');
    if (this.id !== null && this.id !== undefined) {
      this.userId = JSON.parse(this.id).id;
      this.getAllActivities(this.userId);
    }
  }

  async getAllActivities(id: number) {
    this.gradeService.getActivitiesByStudent(id)
      .subscribe(act => {
        this.activities = act;
      });
  }
  async more(id: number, questionTypeId: number) {
    if (questionTypeId === 2) {
      this.router.navigate([`/admin/s-activity/${id}`]);
    }
  }
}

