import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from "./courses/courses.component";
import { SeeActivitiesComponent } from "./see-activities/see-activities.component";
import { SeeCoursesComponent } from "./see-courses/see-courses.component";

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
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule {}