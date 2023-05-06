import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Car } from 'src/app/cars/car.model';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html'
})
export class CartListComponent {
  carsInCart: Car[] = [];
  carsIndexes: number[] = [];
  private subscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('cars')
      .subscribe((carsState) => {
        this.carsInCart = carsState.carsInCart;
        this.carsIndexes = carsState.carsIndexes;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
