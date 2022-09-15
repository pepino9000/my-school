import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from 'src/app/core/services/grade/grade.service';
import { ActivityModalComponent } from '../activities-modal/activity-modal.component';

@Component({
  selector: 'app-student-activities',
  templateUrl: './student-activities.component.html',
  styleUrls: ['./student-activities.component.scss']
})
export class StudentActivitiesComponent implements OnInit {
  students: any = []
  activityId!: any;
  displayedColumns: string[] = ['id', 'name', 'rut', 'email', 'activity-status', 'answers'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private gradeService: GradeService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.params["id"];
    if(this.activityId){
      this.getAllStudentsWithActivities(this.activityId)
    }
  }
  async getAllStudentsWithActivities(id: number) {
    this.gradeService.getActivitiesWithStudent(id)
      .subscribe(std => {
        this.students = std;
        console.log(std)
      });
  }
  openDialog(id: number, name:string): void {

    let dialogRef = this.dialog.open(ActivityModalComponent, {
      width: '313px',
      panelClass: 'my-custom-dialog-class',
      data: {
        studentId:id,
        activityId: Number(this.activityId),
        name: name,
      }
    });
  }
}
