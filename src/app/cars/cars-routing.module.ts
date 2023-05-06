import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarEditComponent } from "./car-edit/car-edit.component";
import { CarStartComponent } from "./car-start/car-start.component";
import { CarsResolverService } from "./cars-resolver.service";
import { CarsComponent } from "./cars.component";
import { AuthGuard } from "../auth/auth.guard";
import { CarsGuard } from "./cars.guard";

const routes: Routes = [
    { 
        path: '', 
        component: CarsComponent,
        canActivate: [AuthGuard],
        resolve: [CarsResolverService],
        children: [
            { path: '', component: CarStartComponent },
            { path: 'new', component: CarEditComponent },
            { 
                path: ':id',
                component: CarDetailComponent
            },
            { 
                path: ':id/edit',
                component: CarEditComponent,
                canActivate: [CarsGuard]
            }
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarsRoutingModule {}