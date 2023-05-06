import { Component, Input} from '@angular/core';

import { Car } from '../../car.model';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html'
})
export class CarItemComponent {
  @Input() car: Car;
  @Input() index: number;
}
