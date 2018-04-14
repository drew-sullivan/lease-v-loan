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
    this.load();
  }

  load(): void {
    this.priceOptions = getPriceOptions();
    this.downPaymentOptions = getDownPaymentOptions();
    this.loanTermOptions = Array.from({length: 11}, (x, i) => i);
    this.leaseTermOptions = Array.from({length: 11}, (x, i) => i);
    this.leaseDealOptions = getLeaseDealOptions();
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

const getPriceOptions = (): number[] => {
  const priceOptions = [0];
  let price = 5000;
  while (priceOptions[priceOptions.length - 1] < 99999) {
    priceOptions.push(price);
    price += 5000;
  }
  return priceOptions;
};

const getDownPaymentOptions = (): number[] => {
  const downPaymentOptions = [0];
  let downPayment = 500;
  while (downPaymentOptions[downPaymentOptions.length - 1] < 19999) {
    downPaymentOptions.push(downPayment);
    downPayment += 500;
  }
  return downPaymentOptions;
};

const getLeaseDealOptions = (): number[] => {
  const leaseDealOptions = [40];
  let leaseDeal = leaseDealOptions[0];
  while (leaseDealOptions[leaseDealOptions.length - 1] < 1199) {
    leaseDealOptions.push(leaseDeal);
    leaseDeal += 40;
  }
  return leaseDealOptions;
};
