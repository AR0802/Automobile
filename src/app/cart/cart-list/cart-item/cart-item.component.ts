import { Component, Input } from '@angular/core';

import { Car } from '../../../cars/car.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  @Input() car: Car;
  @Input() index: number;
}
