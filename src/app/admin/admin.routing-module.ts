import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from "./create-user/create-user.component";

const routes: Routes = [
    {
        path: 'create-user',
        component: CreateUserComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}