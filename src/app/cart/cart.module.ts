import { NgModule } from "@angular/core";

import { CartStartComponent } from './cart-start/cart-start.component';
import { CartItemComponent } from "./cart-list/cart-item/cart-item.component";
import { CartListComponent } from "./cart-list/cart-list.component";
import { CartDetailComponent } from "./cart-detail/cart-detail.component";
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        CartStartComponent,
        CartItemComponent,
        CartListComponent,
        CartDetailComponent,
        CartComponent
    ],
    imports: [
        CartRoutingModule,
        SharedModule
    ]
})
export class CartModule {}