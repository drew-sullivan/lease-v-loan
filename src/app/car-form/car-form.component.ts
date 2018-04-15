import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Car } from '../car';
import { HelpersService } from '../services/helpers.service';

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

  constructor(private helperService: HelpersService) { }

  ngOnInit() {
    this.loadFormOptions();
    // this.car.emit(new Car(30000, 2000, 5, 3, 220));
  }

  loadFormOptions(): void {
    this.priceOptions = this.helperService.generateRangeArray(2500, 100000, 2500);
    this.downPaymentOptions = this.helperService.generateRangeArray(250, 20000, 250);
    this.loanTermOptions = this.helperService.generateRangeArray(1, 10, 1);
    this.leaseTermOptions = this.helperService.generateRangeArray(1, 10, 1);
    this.leaseDealOptions = this.helperService.generateRangeArray(40, 1200, 20);
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
