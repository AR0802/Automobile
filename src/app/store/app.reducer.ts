import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCars from '../cars/store/car.reducer';

export interface AppState {
    shoppingList: fromShoppingList.ShoppingListState,
    auth: fromAuth.AuthState,
    cars: fromCars.CarsState
}

export const AppReducer: ActionReducerMap<AppState, any> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    cars: fromCars.carReducer
}