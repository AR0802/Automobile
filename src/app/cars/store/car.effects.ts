import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';

import { Car } from '../car.model';
import { AppState } from 'src/app/store/app.reducer';
import * as CarsActions from './car.actions';

@Injectable()
export class CarsEffects {
  fetchCars = createEffect(() =>
    this.actions$.pipe(
      ofType(CarsActions.FETCH_CARS),
      switchMap(() =>
        this.http
          .get<Car[]>(
            'https://angular-app-16977-default-rtdb.europe-west1.firebasedatabase.app/cars.json'
          )
          .pipe(
            map((fetchedCars) => {
              const cars = fetchedCars ? fetchedCars : [];
              return cars.map((car) => {
                return {
                  ...car,
                  details: car.details ? car.details : [],
                  inCart: car.inCart ? car.inCart : []
                };
              });
            }),
            map((cars) => {
              const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
              } = JSON.parse(localStorage.getItem('userData') || '{}');
              const carsInCart: Car[] = [];
              const carsIndexes: number[] = [];
              for (let i = 0; i < cars.length; i++) {
                const userIndexInCart = cars[i].inCart.findIndex(
                  (user) => user.userId === userData.id
                );
                if (userIndexInCart !== -1) {
                  carsInCart.push(cars[i]);
                  carsIndexes.push(i);
                }
              }
              return { cars, carsInCart, carsIndexes };
            }),
            map(
              ({ cars, carsInCart, carsIndexes }) =>
                new CarsActions.SetCars({ cars, carsInCart, carsIndexes })
            )
          )
      )
    )
  );

  storeCars = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CarsActions.ADD_CAR, CarsActions.UPDATE_CAR, CarsActions.DELETE_CAR),
        withLatestFrom(this.store.select('cars')),
        switchMap(([actionData, carsState]) => {
          return this.http.put(
            'https://angular-app-16977-default-rtdb.europe-west1.firebasedatabase.app/cars.json',
            carsState.cars
          );
        })
      ),
    { dispatch: false }
  );

  addCarToCart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CarsActions.ADD_CAR_TO_CART),
        withLatestFrom(this.store.select('cars')),
        switchMap(([actionData, carsState]) => {
          return this.http.put(
            `https://angular-app-16977-default-rtdb.europe-west1.firebasedatabase.app/cars.json`,
             carsState.cars
          );
        })
      ),
    { dispatch: false }
  );

  deleteCarFromCart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CarsActions.DELETE_CAR_FROM_CART),
        withLatestFrom(this.store.select('cars')),
        switchMap(([actionData, carsState]) => {
          return this.http.put(
            'https://angular-app-16977-default-rtdb.europe-west1.firebasedatabase.app/cars.json',
            carsState.cars
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
