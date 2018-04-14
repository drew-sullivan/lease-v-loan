import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Car } from '../car';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  @Output() car = new EventEmitter<Car>();
  private priceOptions: number[];
  private downPaymentOptions: number[];
  private loanTermOptions: number[];
  private leaseTermOptions: number[];
  private leaseDealOptions: number[];

  private submitted: boolean;

  constructor() { }

  ngOnInit() {
    this.loadFormOptions();
    this.car.emit(new Car(30000, 2000, 5, 3, 220));
  }

  loadFormOptions(): void {
    this.priceOptions = generateRangeArray(2500, 100000, 2500);
    this.downPaymentOptions = generateRangeArray(250, 20000, 250);
    this.loanTermOptions = generateRangeArray(1, 10, 1);
    this.leaseTermOptions = generateRangeArray(1, 10, 1);
    this.leaseDealOptions = generateRangeArray(40, 1200, 20);
  }

  onSubmit(carForm: any) {
    this.submitted = true;
    const userCar = new Car(
      carForm.controls['totalPrice'].value,
      carForm.controls['downPayment'].value,
      carForm.controls['loanTermLength'].value,
      carForm.controls['leaseTermLength'].value,
      carForm.controls['leaseDeal'].value,
    );
    this.car.emit(userCar);
  }

}

const generateRangeArray = (start, stop, step) => {
  const rangeArray = [];
  let arrayItem = start;
  do {
    rangeArray.push(arrayItem);
    arrayItem += step;
  }
  while (rangeArray[rangeArray.length - 1] <= stop - 1);
  return rangeArray;
};
