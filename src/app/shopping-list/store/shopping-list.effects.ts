import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';

import { Detail } from '../../shared/detail.model';
import { AppState } from 'src/app/store/app.reducer';
import * as ShoppingListActions from './shopping-list.actions';

@Injectable()
export class ShoppingListEffects {
  fetchDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.FETCH_DETAILS),
      switchMap(() =>
        this.http
          .get<Detail[]>(
            'https://angular-app-16977-default-rtdb.europe-west1.firebasedatabase.app/details.json'
          )
          .pipe(
            map((details) => new ShoppingListActions.SetDetails(details ? details : []))
          )
      )
    )
  );

  storeDetails = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShoppingListActions.ADD_DETAIL, ShoppingListActions.UPDATE_DETAIL, ShoppingListActions.DELETE_DETAIL),
        withLatestFrom(this.store.select('shoppingList')),
        switchMap(([actionData, shoppingListState]) => {
          return this.http.put(
            'https://angular-app-16977-default-rtdb.europe-west1.firebasedatabase.app/details.json',
            shoppingListState.details
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