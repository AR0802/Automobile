import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";
import { AppState } from "../store/app.reducer";
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = '';
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective; 
    private closeSub: Subscription;
    private storeSub: Subscription;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.error;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;


        if (this.isLoginMode) {
            this.store.dispatch(new AuthActions.LoginStart({ email, password }));
        } else {
            this.store.dispatch(new AuthActions.SignupStart({ email, password }));
        }

        form.reset();
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
        this.storeSub.unsubscribe();
    }

    showErrorAlert(message: string) {
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(AlertComponent);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
    
}