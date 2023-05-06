import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CartComponent } from "./cart.component";
import { CartStartComponent } from "./cart-start/cart-start.component";
import { CartDetailComponent } from "./cart-detail/cart-detail.component";
import { CartResolverService } from "./cart-resolver.service";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
    { 
        path: '', 
        component: CartComponent,
        canActivate: [AuthGuard],
        resolve: [CartResolverService],
        children: [
            { path: '', component: CartStartComponent },
            { 
                path: ':id',
                component: CartDetailComponent
            }
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule {}