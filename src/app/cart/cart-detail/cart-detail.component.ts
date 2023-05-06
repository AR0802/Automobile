import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Car } from '../../cars/car.model';
import { AppState } from 'src/app/store/app.reducer';
import * as CarsActions from '../../cars/store/car.actions';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit, OnDestroy {
  car: Car;
  id: number;
  private routeSub: Subscription;
  private carsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.carsSub = this.store.select('cars').subscribe((carsData) => {
        this.car = carsData.cars[this.id];
      });
    });
  }

  onDeleteCarFromCart() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    this.store.dispatch(new CarsActions.DeleteCarFromCart({ index: this.id, car: this.car, userId: userData.id }));
    this.router.navigate(['/cart']);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.carsSub.unsubscribe();
  }
}
