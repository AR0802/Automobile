import { Action } from '@ngrx/store';

import { Car } from '../car.model';

export const ADD_CAR = '[Cars] Add Car';
export const SET_CARS = '[Cars] Set Cars';
export const UPDATE_CAR = '[Cars] Update Car';
export const DELETE_CAR = '[Cars] Delete Car';
export const FETCH_CARS = '[Cars] Fetch Cars';
export const ADD_CAR_TO_CART = '[Cars] Add Car To Cart';
export const DELETE_CAR_FROM_CART = '[Cart] Delete Car From Cart';

export class AddCar implements Action {
  readonly type = ADD_CAR;

  constructor(public payload: Car) {}
}

export class SetCars implements Action {
  readonly type = SET_CARS;

  constructor(
    public payload: { cars: Car[]; carsInCart: Car[]; carsIndexes: number[] }
  ) {}
}

export class UpdateCar implements Action {
  readonly type = UPDATE_CAR;

  constructor(public payload: { index: number; newCar: Car }) {}
}

export class DeleteCar implements Action {
  readonly type = DELETE_CAR;

  constructor(public payload: number) {}
}

export class FetchCars implements Action {
  readonly type = FETCH_CARS;
}

export class AddCarToCart implements Action {
  readonly type = ADD_CAR_TO_CART;

  constructor(public payload: { index: number; car: Car; userId: string }) {}
}

export class DeleteCarFromCart implements Action {
  readonly type = DELETE_CAR_FROM_CART;

  constructor(public payload: { index: number; car: Car; userId: string }) {}
}

export type CarsActions =
  | AddCar
  | SetCars
  | UpdateCar
  | DeleteCar
  | FetchCars
  | AddCarToCart
  | DeleteCarFromCart;
