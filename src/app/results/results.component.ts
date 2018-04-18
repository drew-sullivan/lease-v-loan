import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { Year } from '../year';

import { HelpersService } from '../services/helpers.service';

const TIME_PERIOD = 20;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  car: Car;
  private loansUndertaken: number;
  private calTableCols = [
    'year', 'jan', 'feb', 'mar', 'apr', 'may', 'june',
    'july', 'aug', 'sep', 'oct', 'nov', 'dec', 'yearly total', 'grand total'];
  private summaryTableCols = [
    'title', 'loan', 'lease'
  ];
  private timeFrameOptions: number[];
  private loanMonthlyPrice: number;
  private loanYearlyPrice: number;
  private loanTotalCost: number;
  private lifetimeLoanCost: number;
  private numNewCarLoans: number;

  private leaseMonthlyPrice: number;
  private savingForNextLease: number;
  private leaseYearlyPrice: number;
  private leaseTotalCost: number;
  private lifetimeLeaseCost: number;
  private numNewCarLeases: number;

  private calendarTableDataSource = [];
  private summaryTableDataSource = [];

  private grandTotalChartLoanData = [];
  private grandTotalChartLeaseData = [];

  constructor(private helpersService: HelpersService) { }

  ngOnInit() {

  }

  loadData() {
    this.car = new Car(30000, 2000, 5, 3, 220, 50, '20-34', 'female');
    this.loansUndertaken = this.car.timeFrame / 10;

    this.loanMonthlyPrice = Math.round(
      (this.car.totalPrice - this.car.downPayment - this.getTradeInValue()) / (this.car.loanTermLength * 12)
    );
    this.loanYearlyPrice = Math.round(this.loanMonthlyPrice * 12);
    this.loanTotalCost = Math.round(this.loanYearlyPrice * this.car.loanTermLength);
    this.lifetimeLoanCost = Math.round(this.loanTotalCost * this.loansUndertaken);
    this.numNewCarLoans = this.loansUndertaken;

    this.leaseMonthlyPrice = this.car.leaseDeal;
    this.savingForNextLease = Math.round(this.car.downPayment / (this.car.leaseTermLength * 12));
    this.leaseYearlyPrice = Math.round((this.leaseMonthlyPrice + this.savingForNextLease) * 12);
    this.leaseTotalCost = Math.round(this.leaseYearlyPrice * this.car.leaseTermLength);
    this.lifetimeLeaseCost = Math.round(this.car.timeFrame * this.leaseYearlyPrice);
    this.numNewCarLeases = Math.round((this.car.timeFrame / this.car.leaseTermLength * 10 )) / 10;

    this.summaryTableDataSource.push(
      { 'title': 'Monthly Cost', 'loan': this.loanMonthlyPrice, 'lease': this.leaseMonthlyPrice },
      { 'title': 'Monthly Saving for Next Lease Down Payment', 'loan': 0, 'lease': this.savingForNextLease},
      { 'title': 'Yearly Cost', 'loan': this.loanYearlyPrice, 'lease': this.leaseYearlyPrice},
      { 'title': 'Total Cost', 'loan': this.loanTotalCost, 'lease': this.leaseTotalCost},
      { 'title': 'Lifetime Cost', 'loan': this.lifetimeLoanCost, 'lease': this.lifetimeLeaseCost},
      { 'title': 'New Cars', 'loan': this.numNewCarLoans, 'lease': this.numNewCarLeases},
    );

    this.calendarTableDataSource = this.getCalendarTableData();
  }

  getCalendarTableData(): any[] {
    const calendarTableData = [];
    const months = this.calTableCols.slice(1);
    const leaseChartData = new Array(this.car.timeFrame * 12).fill(Math.round(this.leaseMonthlyPrice + this.savingForNextLease));
    const loanChartData = this.getLoanChartData();
    let i = 0;
    let j = 12;
    let k = 1;
    let loanGrandTotal = 0;
    let leaseGrandTotal = 0;
    while (j <= this.car.timeFrame * 12) {
      const loanData = loanChartData.slice(i, j);
      const leaseData = leaseChartData.slice(i, j);
      const loanYearlyTotal = loanData.reduce((total, currentValue) => total += currentValue);
      const leaseYearlyTotal = leaseData.reduce((total, currentValue) => total += currentValue);
      loanGrandTotal += loanYearlyTotal;
      leaseGrandTotal += leaseYearlyTotal;
      calendarTableData.push(Object.assign({}, ...months.map((m, index) => (
        {year: k, [m]: loanData[index], 'yearly total': loanYearlyTotal, 'grand total': loanGrandTotal}
      ))));
      calendarTableData.push(Object.assign({}, ...months.map((m, index) => (
        {year: '', [m]: leaseData[index], 'yearly total': leaseYearlyTotal, 'grand total': leaseGrandTotal}
      ))));
      this.grandTotalChartLoanData.push(loanGrandTotal);
      this.grandTotalChartLeaseData.push(leaseGrandTotal);
      i += 12;
      j += 12;
      k += 1;
    }
    return calendarTableData;
  }

  getLoanChartData(): number[] {
    let finalData: number[] = [];
    const loanChartData: number[] = [];
    const tempNumMonths = (this.car.timeFrame * 12) / this.loansUndertaken;
    let tempLoanTotalAmount = this.loanTotalCost;
    while (loanChartData.length < tempNumMonths) {
      if (tempLoanTotalAmount < 1) {
        loanChartData.push(0);
      } else {
        loanChartData.push(Math.round(this.loanMonthlyPrice));
      }
      tempLoanTotalAmount -= this.loanMonthlyPrice;
    }
    for (let i = 0; i < this.loansUndertaken; i++) {
      finalData = finalData.concat(loanChartData);
    }
    return finalData;
  }

  setCar(submittedCar: Car) {
    this.car = submittedCar;
    this.loadData();
  }

  print(submittedForm: Car) {
    console.log(submittedForm);
    this.car = submittedForm;
    this.loadData();
  }

  getTradeInValue(): number {
    const depreciationRate = this.getDepreciationRate();
    const valueAfterOneYear = this.car.totalPrice * Math.pow((1 - 35 / 100), 1);
    return Math.round((valueAfterOneYear * Math.pow(1 - depreciationRate / 100, 10 - 1)));
  }

  getDepreciationRate(): number {
    let depreciationRate;
    const gender = this.car.gender;
    const age = this.car.age;
    if (gender === 'male') {
      if (age === '20-34' || age === '35-54' || age === '55-64') {
        depreciationRate = 21.4;
      } else if (age === '16-19') {
        depreciationRate = 10.4;
      } else {
        depreciationRate = 15.6;
      }
    } else {
      if (age === '16-19' || age === '55-64' || age === '65+') {
        depreciationRate = 10.4;
      } else {
        depreciationRate = 15.6;
      }
    }
    return depreciationRate;
  }

}
