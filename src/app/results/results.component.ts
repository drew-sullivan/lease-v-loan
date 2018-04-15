import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { CARS } from '../mock-cars';
import { Year } from '../year';

import { HelpersService } from '../services/helpers.service';

const TIME_PERIOD = 20;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private car: Car;
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
  private timePeriod: number;

  private calendarTableDataSource = [];
  private summaryTableDataSource = [];

  constructor(private helpersService: HelpersService) { }

  ngOnInit() {
    this.timePeriod = TIME_PERIOD;
    this.timeFrameOptions = this.helpersService.generateRangeArray(10, 60, 10);
  }

  loadData() {
    this.loansUndertaken = this.timePeriod / 10;

    this.loanMonthlyPrice = Math.round((this.car.totalPrice - this.car.downPayment) / (this.car.loanTermLength * 12));
    this.loanYearlyPrice = Math.round(this.loanMonthlyPrice * 12);
    this.loanTotalCost = Math.round(this.loanYearlyPrice * this.car.loanTermLength);
    this.lifetimeLoanCost = Math.round(this.loanTotalCost * this.loansUndertaken);
    this.numNewCarLoans = this.loansUndertaken;

    this.leaseMonthlyPrice = this.car.leaseDeal;
    this.savingForNextLease = Math.round(this.car.downPayment / (this.car.leaseTermLength * 12));
    this.leaseYearlyPrice = Math.round((this.leaseMonthlyPrice + this.savingForNextLease) * 12);
    this.leaseTotalCost = Math.round(this.leaseYearlyPrice * this.car.leaseTermLength);
    this.lifetimeLeaseCost = Math.round(this.timePeriod * this.leaseYearlyPrice);
    this.numNewCarLeases = Math.round((this.timePeriod / this.car.leaseTermLength * 10 )) / 10;

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
    const leaseChartData = new Array(this.timePeriod * 12).fill(Math.round(this.leaseMonthlyPrice + this.savingForNextLease));
    const loanChartData = this.getLoanChartData();
    let i = 0;
    let j = 12;
    let k = 1;
    let loanGrandTotal = 0;
    let leaseGrandTotal = 0;
    while (j <= this.timePeriod * 12) {
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
      i += 12;
      j += 12;
      k += 1;
    }
    return calendarTableData;
  }

  getLoanChartData(): number[] {
    let finalData: number[] = [];
    const loanChartData: number[] = [];
    const tempNumMonths = (this.timePeriod * 12) / this.loansUndertaken;
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

  onTimeFrameChange(event: any) {
    this.timePeriod = event.value;
    this.loadData();
  }

}
