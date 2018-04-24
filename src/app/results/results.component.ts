import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { Year } from '../year';

import { HelpersService } from '../services/helpers.service';

import { FormQuestionPipe } from './../form-question.pipe';
import { FormAnswerPipe } from './../form-answer.pipe';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  car: Car;
  private objectKeys = Object.keys;
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
  private neededForMonthlyLoanToEqualMonthlyLease: number;
  interestRate: number;

  private summaryTableDataSource = [];
  private calendarTableDataSource: number[];

  private grandTotalChartLoanData: number[];
  private grandTotalChartLeaseData: number[];

  constructor(private helpersService: HelpersService) { }

  ngOnInit() { }

  loadData() {
    this.loansUndertaken = this.car.timeFrame / 10;

    this.loanMonthlyPrice = this.getLoanMonthlyPayment();
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

    this.interestRate = this.car.interestRate;

    this.neededForMonthlyLoanToEqualMonthlyLease = this.car.totalPrice - this.getMaxLoan();

    this.summaryTableDataSource = this.getSummaryTableData();

    const { grandTotalChartLoanData, grandTotalChartLeaseData } = this.getYearlyData();
    this.grandTotalChartLoanData = grandTotalChartLoanData;
    this.grandTotalChartLeaseData = grandTotalChartLeaseData;
  }

  getSummaryTableData(): any[] {
    const summaryTableData = [
      { 'title': 'Monthly Cost', 'loan': this.loanMonthlyPrice, 'lease': this.leaseMonthlyPrice },
      { 'title': 'Monthly Saving for Next Lease Down Payment', 'loan': 0, 'lease': this.savingForNextLease },
      { 'title': 'Down Payment Needed for Monthly Loan Payment to Equal Monthly Lease Payment',
          'loan': this.neededForMonthlyLoanToEqualMonthlyLease, 'lease': 0 },
      { 'title': 'Yearly Cost', 'loan': this.loanYearlyPrice, 'lease': this.leaseYearlyPrice },
      { 'title': 'Total Cost of Current Loan', 'loan': this.loanTotalCost, 'lease': this.leaseTotalCost },
      { 'title': 'Estimated Value of Trade-In', 'loan': this.getTradeInValue(), 'lease': 0 },
      { 'title': 'Lifetime Cost of Loaning vs. Leasing', 'loan': this.lifetimeLoanCost, 'lease': this.lifetimeLeaseCost },
      { 'title': 'New Cars', 'loan': this.numNewCarLoans, 'lease': this.numNewCarLeases },
    ];
    return summaryTableData;
  }

  getYearlyData() {
    const grandTotalChartLoanData = [];
    const grandTotalChartLeaseData = [];
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
      grandTotalChartLoanData.push(loanGrandTotal);
      grandTotalChartLeaseData.push(leaseGrandTotal);
      i += 12;
      j += 12;
      k += 1;
    }
    return { grandTotalChartLoanData, grandTotalChartLeaseData };
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

  setCar(submittedForm: Car): void {
    this.car = submittedForm;
    this.loadData();
  }

  getLoanMonthlyPayment(): number {
    const principal = this.car.totalPrice - this.getTradeInValue() - this.car.downPayment;
    return Math.round((this.car.interestRate / 100 / 12 * principal) /
           (1 - Math.pow(1 + this.car.interestRate / 100 / 12, -this.car.loanTermLength * 12)));
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

  getMaxLoan(): number {
    const numMonths = this.car.loanTermLength * 12;
    const interest = this.car.interestRate / 100;
    const leaseMonthlyPayment = this.car.leaseDeal;
    const principal = Math.round(leaseMonthlyPayment * (1 - Math.pow(1 + interest / 12, -numMonths)) * 12 / interest);
    return principal;
  }

  reset(): void {
    this.car = null;
  }

}
