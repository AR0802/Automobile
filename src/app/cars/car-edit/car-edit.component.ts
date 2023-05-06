import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.reducer';
import * as CarsActions from '../store/car.actions';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  carForm: FormGroup;

  private storeSub: Subscription;
  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.editMode) {
      this.store.dispatch(
        new CarsActions.UpdateCar({
          index: this.id,
          newCar: this.carForm.value
        })
      );
    } else {
      this.store.dispatch(
        new CarsActions.AddCar({ ...this.carForm.value, userId: userData.id, inCart: [] })
      );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddDetail() {
    (<FormArray>this.carForm.get('details')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        value: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteDetail(index: number) {
    (<FormArray>this.carForm.get('details')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.carForm.get('details')).controls;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let carName = '';
    let carImagePath = '';
    let carDescription = '';
    let carPrice;
    let ownerPhone = '';
    let ownerEmail = '';
    let carDetails = new FormArray(new Array());

    if (this.editMode) {
      this.storeSub = this.store
        .select('cars')
        .pipe(map((carsState) => carsState.cars[this.id]))
        .subscribe((car) => {
          carName = car.name;
          carImagePath = car.imagePath;
          carDescription = car.description;
          carPrice = car.price;
          ownerPhone = car.phone;
          ownerEmail = car.email;
          if (car['details']) {
            for (let detail of car.details) {
              carDetails.push(
                new FormGroup({
                  name: new FormControl(detail.name, Validators.required),
                  value: new FormControl(detail.value, Validators.required),
                })
              );
            }
          }
        });
    }

    this.carForm = new FormGroup({
      name: new FormControl(carName, Validators.required),
      imagePath: new FormControl(carImagePath, Validators.required),
      description: new FormControl(carDescription, Validators.required),
      price: new FormControl(carPrice, Validators.required),
      phone: new FormControl(ownerPhone, Validators.required),
      email: new FormControl(ownerEmail),
      details: carDetails
    });
  }

  onCopyImageUrl(imagePath: HTMLInputElement) {
    imagePath.select();
    imagePath.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }
}
