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
import { Detail } from '../shared/detail.model';
import * as ShoppingListActions from './store/shopping-list.actions';

@Injectable({ providedIn: 'root' })
export class ShoppingListResolverService implements Resolve<Detail[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('shoppingList').pipe(
      take(1),
      map((shoppingListState) => shoppingListState.details),
      switchMap((details) => {
        if (details.length === 0) {
          this.store.dispatch(new ShoppingListActions.FetchDetails());
          return this.actions$.pipe(ofType(ShoppingListActions.SET_DETAILS), take(1));
        } else {
          return of(details);
        }
      })
    );
  }
}