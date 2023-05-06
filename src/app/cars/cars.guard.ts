import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';

import { AppState } from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class CarsGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('cars').pipe(
      take(1),
      map(carsData => { 
        if (carsData.cars.length) {
            return true;
        }
        return this.router.createUrlTree(['/cars', +route.params['id']]);
      })
    );
    
  }
}
