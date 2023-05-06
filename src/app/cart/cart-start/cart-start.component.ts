import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription, map } from "rxjs";

import { AppState } from "src/app/store/app.reducer";
import { Car } from "src/app/cars/car.model";

@Component({
    selector: 'app-cart-start',
    templateUrl: './cart-start.component.html',
    styleUrls: ['./cart-start.component.css']
})
export class CartStartComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  private subscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('cars')
      .pipe(map((carsState) => carsState.cars))
      .subscribe((cars: Car[]) => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') || '{}');
        for (let i = 0; i < cars.length; i++) {
          const userIndexInCart = cars[i].inCart.findIndex(user => user.userId === userData.id);
          if (userIndexInCart !== -1) {
            this.cars.push(cars[i]);
          }
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}