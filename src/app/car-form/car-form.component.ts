import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Car } from '../car';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  @Input() car: Car;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmitted = new EventEmitter<Car>();
  priceOptions: number[];
  downPaymentOptions: number[];
  loanTermOptions: number[];
  leaseTermOptions: number[];
  leaseDealOptions: number[];
  timeFrameOptions: number[];
  ageOptions: string[];
  genderOptions: string[];
  interestRateOptions: number[];

  private submitted: boolean;

  constructor(private helperService: HelpersService) { }

  ngOnInit() {
    this.loadFormOptions();
    // this.onSubmitted.emit(new Car(30000, 2000, 5, 3, 220, 50, 5, '20-34', 'female')); // Test data
  }

  loadFormOptions(): void {
    this.priceOptions = this.helperService.generateRangeArray(2500, 100000, 2500);
    this.downPaymentOptions = this.helperService.generateRangeArray(0, 20000, 250);
    this.loanTermOptions = this.helperService.generateRangeArray(0, 10, 1);
    this.leaseTermOptions = this.helperService.generateRangeArray(1, 10, 1);
    this.leaseDealOptions = this.helperService.generateRangeArray(40, 1200, 20);
    this.timeFrameOptions = this.helperService.generateRangeArray(10, 50, 10);
    this.interestRateOptions = this.helperService.generateRangeArray(.25, 12.75, .25);
    this.ageOptions = ['16-19', '20-34', '35-54', '55-64', '65+'];
    this.genderOptions = ['Male', 'Female'];
  }

  onSubmit(carForm: any) {
    this.submitted = true;
    const userCar = new Car(
      carForm.controls['totalPrice'].value,
      carForm.controls['downPayment'].value,
      carForm.controls['loanTermLength'].value,
      carForm.controls['leaseTermLength'].value,
      carForm.controls['leaseDeal'].value,
      carForm.controls['timeFrame'].value,
      carForm.controls['interestRate'].value,
      carForm.controls['age'].value,
      carForm.controls['gender'].value
    );
    this.onSubmitted.emit(userCar);
  }

}
