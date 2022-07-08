import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { MaterialModule } from '../material/material.module';
import { CoursesRoutingModule } from './courses.routing-module';
import { SeeCoursesComponent } from './see-courses/see-courses.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CoursesComponent,
    SeeCoursesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoursesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule {}
