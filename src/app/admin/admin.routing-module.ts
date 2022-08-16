import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AllStudentsComponent } from "./all-students/all-students.component";
import { CreateActivityComponent } from "./create-activity/create-activity.component";
import { CreateUserComponent } from "./create-user/create-user.component";

const routes: Routes = [
    {
        path: 'create-user',
        component: CreateUserComponent,
    },
    {
        path: 'all-students',
        component: AllStudentsComponent,
    },
    {
        path: 'create-activity',
        component: CreateActivityComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}