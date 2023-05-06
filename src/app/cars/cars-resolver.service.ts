import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, switchMap, take } from 'rxjs';

import { AppState } from '../store/app.reducer';
import { Car } from './car.model';
import * as CarsActions from './store/car.actions';

@Injectable({ providedIn: 'root' })
export class CarsResolverService implements Resolve<Car[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('cars').pipe(
      take(1),
      map((carsState) => carsState.cars),
      switchMap((cars) => {
        if (cars.length === 0) {
          this.store.dispatch(new CarsActions.FetchCars());
          return this.actions$.pipe(ofType(CarsActions.SET_CARS), take(1));
        } else {
          return of(cars);
        }
      })
    );
  }
}
