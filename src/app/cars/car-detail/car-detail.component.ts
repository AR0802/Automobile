import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Car } from '../car.model';
import { AppState } from 'src/app/store/app.reducer';
import * as CarsActions from '../store/car.actions';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit, OnDestroy {
  car: Car;
  id: number;
  belongToUser: boolean;
  addedToCart: boolean;
  private userData: {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
  };
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
        if (this.car) {
          this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
          this.belongToUser = this.userData.id === this.car.userId;
          this.addedToCart = this.car.inCart.findIndex(user => user.userId === this.userData.id) > -1;
        }
      });
    });
  }

  onEditCar() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteCar() {
    this.store.dispatch(new CarsActions.DeleteCar(this.id));
    this.router.navigate(['/cars']);
  }

  onAddToCart() {
    this.store.dispatch(new CarsActions.AddCarToCart({ index: this.id, car: this.car, userId: this.userData.id }));
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.carsSub.unsubscribe();
  }
}
