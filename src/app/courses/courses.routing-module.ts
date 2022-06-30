import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from "./courses/courses.component";
import { SeeCoursesComponent } from "./see-courses/see-courses.component";

const routes: Routes = [
    {
        path: '',
        component: CoursesComponent,
    },
    {
        path: 'students',
        component: SeeCoursesComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule {}