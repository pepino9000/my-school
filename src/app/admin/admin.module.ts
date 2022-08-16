import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { AdminRoutingModule } from './admin.routing-module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { CreateCoursesComponent } from './create-courses/create-courses.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';



@NgModule({
  declarations: [
    CreateUserComponent,
    EditUserComponent,
    AllStudentsComponent,
    CreateCoursesComponent,
    CreateActivityComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule {}
