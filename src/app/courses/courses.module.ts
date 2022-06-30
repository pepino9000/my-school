import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { MaterialModule } from '../material/material.module';
import { CoursesRoutingModule } from './courses.routing-module';
import { SeeCoursesComponent } from './see-courses/see-courses.component';



@NgModule({
  declarations: [
    CoursesComponent,
    SeeCoursesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule {}
