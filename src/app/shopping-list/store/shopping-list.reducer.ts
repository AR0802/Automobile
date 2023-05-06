import { Detail } from 'src/app/shared/detail.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  details: Detail[];
  editedDetail: Detail;
  editedDetailIndex: number;
}

const initialState: ShoppingListState = {
  details: [],
  editedDetail: null as any,
  editedDetailIndex: -1,
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActions
): ShoppingListState {
  switch (action.type) {
    case ShoppingListActions.ADD_DETAIL:
      return {
        ...state,
        details: [...state.details, action.payload]
      };
    case ShoppingListActions.UPDATE_DETAIL:
      const detail = state.details[state.editedDetailIndex];
      const updatedDetail = {
        ...detail,
        ...action.payload
      };
      const updatedDetails = [...state.details];
      updatedDetails[state.editedDetailIndex] = updatedDetail;
      return {
        ...state,
        details: updatedDetails,
        editedDetailIndex: -1
      };
    case ShoppingListActions.DELETE_DETAIL:
      return {
        ...state,
        details: state.details.filter((detail, detailIndex) => {
          return detailIndex !== state.editedDetailIndex;
        })
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedDetail: { ...state.details[action.payload] },
        editedDetailIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedDetail: null as any,
        editedDetailIndex: -1
      };
    case ShoppingListActions.SET_DETAILS:
      return {
          ...state,
          details: [ ...action.payload ]
      }
    default:
      return state;
  }
}
