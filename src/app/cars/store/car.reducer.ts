import { Car } from '../car.model';
import * as CarsActions from './car.actions';
import { isEqual } from 'src/app/shared/object-comparison.component';

export interface CarsState {
  cars: Car[];
  carsInCart: Car[];
  carsIndexes: number[];
}

const initialState: CarsState = {
  cars: [],
  carsInCart: [],
  carsIndexes: []
};

export function carReducer(
  state: CarsState = initialState,
  action: CarsActions.CarsActions
): CarsState {
  switch (action.type) {
    case CarsActions.ADD_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload]
      };
    case CarsActions.SET_CARS:
      return {
        ...state,
        cars: [...action.payload.cars],
        carsInCart: [...action.payload.carsInCart],
        carsIndexes: [...action.payload.carsIndexes]
      };
    case CarsActions.UPDATE_CAR:
      const updatedCar = {
        ...state.cars[action.payload.index],
        ...action.payload.newCar,
      };
      const updatedCars = [...state.cars];
      updatedCars[action.payload.index] = updatedCar;
      return {
        ...state,
        cars: updatedCars
      };
    case CarsActions.DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car, carIndex) => {
          return carIndex !== action.payload;
        })
      };
    case CarsActions.ADD_CAR_TO_CART:
      const inCart = [
        ...(state.cars[action.payload.index].inCart || []),
        { userId: action.payload.userId },
      ];
      const carToUpdate = {
        ...state.cars[action.payload.index],
        ...action.payload.car,
        inCart
      };
      const carsToUpdate = [...state.cars];
      carsToUpdate[action.payload.index] = carToUpdate;
      return {
        ...state,
        cars: carsToUpdate,
        carsInCart: [...state.carsInCart, action.payload.car],
        carsIndexes: [...state.carsIndexes, action.payload.index]
      };
    case CarsActions.DELETE_CAR_FROM_CART:
      const updInCart = [
        ...state.cars[action.payload.index].inCart.filter(
          (user) => user.userId !== action.payload.userId
        ),
      ];
      const updCar = {
        ...state.cars[action.payload.index],
        inCart: updInCart
      };
      const cars = [...state.cars];
      cars[action.payload.index] = updCar;
      return {
        ...state,
        cars,
        carsInCart: state.carsInCart.filter(
          (car) => !isEqual(car, action.payload.car)
        ),
        carsIndexes: state.carsIndexes.filter(index => index !== action.payload.index)
      };
    default:
      return state;
  }
}
