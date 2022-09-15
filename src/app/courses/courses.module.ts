import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { MaterialModule } from '../material/material.module';
import { CoursesRoutingModule } from './courses.routing-module';
import { SeeCoursesComponent } from './see-courses/see-courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentModalComponent } from './student-modal/student-modal.component';
import { SeeActivitiesComponent } from './see-activities/see-activities.component';
import { ActividadesRespondidasComponent } from './actividades-respondidas/actividades-respondidas.component';
import { StudentActivitiesComponent } from './student-activities/student-activities.component';
import { HomeComponent } from '../home/home/home.component';
import { ActivityModalComponent } from './activities-modal/activity-modal.component';

@NgModule({
  declarations: [
    CoursesComponent,
    SeeCoursesComponent,
    StudentModalComponent,
    SeeActivitiesComponent,
    ActividadesRespondidasComponent,
    StudentActivitiesComponent,
    ActivityModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoursesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule {}
