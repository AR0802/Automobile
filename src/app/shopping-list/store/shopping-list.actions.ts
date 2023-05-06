import { Action } from '@ngrx/store';

import { Detail } from 'src/app/shared/detail.model';

export const ADD_DETAIL = '[Shopping List] Add Detail';
export const ADD_DETAILS = '[Shopping List] Add Details';
export const UPDATE_DETAIL = '[Shopping List] Update Detail';
export const DELETE_DETAIL = '[Shopping List] Delete Detail';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';
export const FETCH_DETAILS = '[Shopping List] Fetch Details';
export const SET_DETAILS = '[Shopping List] Set Details';

export class AddDetail implements Action {
  readonly type = ADD_DETAIL;

  constructor(public payload: Detail) {}
}

export class UpdateDetail implements Action {
  readonly type = UPDATE_DETAIL;

  constructor(public payload: Detail) {}
}

export class DeleteDetail implements Action {
  readonly type = DELETE_DETAIL;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class FetchDetails implements Action {
  readonly type = FETCH_DETAILS;
}

export class SetDetails implements Action {
  readonly type = SET_DETAILS;

  constructor(public payload: Detail[]) {}
}

export type ShoppingListActions =
  | AddDetail
  | UpdateDetail
  | DeleteDetail
  | StartEdit
  | StopEdit
  | FetchDetails
  | SetDetails;
