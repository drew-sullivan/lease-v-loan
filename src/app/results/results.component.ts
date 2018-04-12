import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { CARS } from '../mock-cars';

const TIME_PERIOD = 20;
const LOANS_UNDERTAKEN = 2;

export interface Year {
  year: number | string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  june: number;
  july: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private displayedColumns = [
    'year', 'jan', 'feb', 'mar', 'apr', 'may', 'june',
    'july', 'aug', 'sep', 'oct', 'nov', 'dec'];
  private leaseMonthlyPrice: number;
  private savingForNextLease: number;
  private leaseYearlyPrice: number;
  private leaseTotalCost: number;
  private lifestyleTotalCostForLeasing: number;
  private loanMonthlyPrice: number;
  private loanYearlyPrice: number;
  private loanTotalCost: number;
  private lifestyleTotalCostForLoan: number;
  private dataSource = [];

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    const rav4 = CARS[0];
    this.leaseMonthlyPrice = 220;
    this.savingForNextLease = Math.round(rav4.downPayment / (rav4.leaseTermLength * 12));
    this.leaseYearlyPrice = Math.round((this.leaseMonthlyPrice + this.savingForNextLease) * 12);
    this.leaseTotalCost = Math.round(this.leaseYearlyPrice * rav4.leaseTermLength);
    this.lifestyleTotalCostForLeasing = Math.round(TIME_PERIOD * this.leaseYearlyPrice);
    this.loanMonthlyPrice = Math.round(rav4.totalPrice / (rav4.loanTermLength * 12));
    this.loanYearlyPrice = Math.round(this.loanMonthlyPrice * 12);
    this.loanTotalCost = Math.round(this.loanYearlyPrice * rav4.loanTermLength);
    this.lifestyleTotalCostForLoan = Math.round(this.loanTotalCost * LOANS_UNDERTAKEN);
    this.dataSource = this.getTableData();
  }

  getTableData(): any[] {
    const tableData = [];
    const months = this.displayedColumns.slice(1);
    const leaseChartData = new Array(TIME_PERIOD * 12).fill(Math.round(this.leaseMonthlyPrice + this.savingForNextLease));
    const loanChartData = this.getLoanChartData();
    let i = 0;
    let j = 12;
    let k = 1;
    while (j <= TIME_PERIOD * 12) {
      const leaseData = leaseChartData.slice(i, j);
      const loanData = loanChartData.slice(i, j);
      tableData.push(Object.assign({}, ...months.map((m, index) => ({year: k, [m]: loanData[index]}))));
      tableData.push(Object.assign({}, ...months.map((m, index) => ({year: '', [m]: leaseData[index]}))));
      i += 12;
      j += 12;
      k += 1;
    }
    return tableData;
  }

  getLoanChartData(): number[] {
    const loanChartData: number[] = [];
    const tempNumMonths = (TIME_PERIOD * 12) / LOANS_UNDERTAKEN;
    let tempLoanTotalAmount = this.loanTotalCost;
    while (loanChartData.length < tempNumMonths) {
      if (tempLoanTotalAmount < 1) {
        loanChartData.push(0);
      } else {
        loanChartData.push(Math.round(this.loanMonthlyPrice));
      }
      tempLoanTotalAmount -= this.loanMonthlyPrice;
    }
    return loanChartData.concat(loanChartData);
  }

  yell(): void {
    console.log(`YOU CLICKED ME!`);
  }

}
