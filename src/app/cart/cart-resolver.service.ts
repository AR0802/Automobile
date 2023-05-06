import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { AppState } from '../store/app.reducer';
import { Car } from '../cars/car.model';
import * as CarsActions from '../cars/store/car.actions';

@Injectable({ providedIn: 'root' })
export class CartResolverService implements Resolve<Car[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new CarsActions.FetchCars());
    return this.actions$.pipe(ofType(CarsActions.SET_CARS), take(1));
  }
}
