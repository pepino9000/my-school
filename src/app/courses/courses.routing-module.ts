import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ActividadesRespondidasComponent } from "./actividades-respondidas/actividades-respondidas.component";
import { CoursesComponent } from "./courses/courses.component";
import { SeeActivitiesComponent } from "./see-activities/see-activities.component";
import { SeeCoursesComponent } from "./see-courses/see-courses.component";
import { StudentActivitiesComponent } from "./student-activities/student-activities.component";

const routes: Routes = [
    {
        path: '',
        component: CoursesComponent,
    },
    {
        path: 'students/:id',
        component: SeeCoursesComponent,
    },
    {
        path: 'see-activities',
        component: SeeActivitiesComponent,
    },
    {
      path: 'activities/:id',
      component: ActividadesRespondidasComponent,
    },
    {
      path: 'activities/students-activities/:id',
      component: StudentActivitiesComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule {}
