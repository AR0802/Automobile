import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
    user: User | null,
    error: string,
    loading: boolean
}

const initialState: AuthState = {
    user: null,
    error: '',
    loading: false
};

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActions): AuthState {
    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS: 
            const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationTime);
            return {
                ...state,
                user,
                loading: false,
                error: ''
            };
        case AuthActions.LOGOUT: 
            return {
                ...state,
                user: null
            };
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                error: '',
                loading: true
            }
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                error: action.payload,
                loading: false
            } 
        case AuthActions.CLEAR_ERROR: 
            return {
                ...state,
                error: ''
            };
        default: 
            return state;
    }
}