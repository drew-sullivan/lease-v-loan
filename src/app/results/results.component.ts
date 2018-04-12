import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { CARS } from '../mock-cars';

const TIME_PERIOD = 20;
const LOANS_UNDERTAKEN = 2;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private leaseMonthlyPrice: number;
  private savingForNextLease: number;
  private leaseYearlyPrice: number;
  private leaseTotalCost: number;
  private lifestyleTotalCostForLeasing: number;
  private loanMonthlyPrice: number;
  private loanYearlyPrice: number;
  private loanTotalCost: number;
  private lifestyleTotalCostForLoan: number;
  private monthlyData: number[][];
  private yearlyData: number[][][];

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
    this.monthlyData = this.getMonthlyData();
    this.yearlyData = this.getYearlyData();
  }

  getYearlyData(): number[][][] {
    const yearlyData = [];
    const temp_monthlyData = this.monthlyData;
    let i = 0;
    let j = 12;
    while (j <= TIME_PERIOD * 12) {
      yearlyData.push(temp_monthlyData.slice(i, j));
      i += 12;
      j += 12;
    }
    return yearlyData;
  }

  getMonthlyData(): number[][] {
    const leaseChartData = new Array(TIME_PERIOD * 12).fill(Math.round(this.leaseMonthlyPrice + this.savingForNextLease));
    const loanChartData = this.getLoanChartData();
    return loanChartData.map((loanChartDataPoint, i) => [loanChartDataPoint, leaseChartData[i]]);
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

}
