import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GradeService } from 'src/app/core/services/grade/grade.service';

@Component({
  selector: 'app-actividades-respondidas',
  templateUrl: './actividades-respondidas.component.html',
  styleUrls: ['./actividades-respondidas.component.scss']
})
export class ActividadesRespondidasComponent implements OnInit {
  activities: any = []

  constructor(
    private router: Router,
    private gradeService: GradeService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot.params)
    if (id !== null && id !== undefined) {
      this.getAllActivities(Number(id));
    }
  }

  async getAllActivities(id: number) {
    this.gradeService.getActivitiesByGrade(id)
      .subscribe(act => {
        this.activities = act;
      });
  }
  more(id:number){
    this.router.navigate([`courses/activities/students-activities/${id}`])
  }
}
