import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';

import { AppState } from 'src/app/store/app.reducer';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-start',
  templateUrl: './car-start.component.html',
  styleUrls: ['./car-start.component.css']
})
export class CarStartComponent implements OnInit, OnDestroy {
  cars: Car[];
  private subscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('cars')
      .pipe(map((cartState) => cartState.cars))
      .subscribe((cars: Car[]) => {
        this.cars = cars;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
