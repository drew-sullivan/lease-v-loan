import { Component, OnInit } from '@angular/core';

import { Car } from '../car';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  private priceOptions: number[];
  private downPaymentOptions: number[];
  private loanTermOptions: number[];
  private leaseTermOptions: number[];

  private submitted: boolean;

  model = new Car(30000, 2500, 6, 3);

  constructor() { }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.priceOptions = getPriceOptions();
    this.downPaymentOptions = getDownPaymentOptions();
    this.loanTermOptions = Array.from({length: 11}, (x, i) => i);
    this.leaseTermOptions = Array.from({length: 11}, (x, i) => i);
  }

  onSubmit(carForm: any) {
    this.submitted = true;
    console.log(carForm.controls['totalPrice'].value);
  }

  submit(form: any): void {
    console.log(form);
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
