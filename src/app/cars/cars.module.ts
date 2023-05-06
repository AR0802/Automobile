import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarEditComponent } from "./car-edit/car-edit.component";
import { CarItemComponent } from "./car-list/car-item/car-item.component";
import { CarListComponent } from "./car-list/car-list.component";
import { CarStartComponent } from "./car-start/car-start.component";
import { CarsRoutingModule } from "./cars-routing.module";
import { CarsComponent } from "./cars.component";

@NgModule({
    declarations: [
        CarsComponent,
        CarListComponent,
        CarDetailComponent,
        CarItemComponent,
        CarStartComponent,
        CarEditComponent
    ],
    imports: [
        CarsRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class CarsModule { }