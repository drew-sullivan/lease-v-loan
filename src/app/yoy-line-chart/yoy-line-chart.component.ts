import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yoy-line-chart',
  templateUrl: './yoy-line-chart.component.html',
  styleUrls: ['./yoy-line-chart.component.css']
})
export class YoyLineChartComponent {
  // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Loan', lineTension: 0},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Lease', lineTension: 0}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  // light-pink #FFA6C4
  // primary-pink #FF85AE;
  // primary-purple #8C97D2
  public lineChartColors: Array<any> = [
    { // loan
      backgroundColor: 'rgba(255, 133, 173, 0.2)',
      borderColor: 'rgba(255, 133, 173, 1)',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#FF85AE',
      pointHoverBackgroundColor: 'rgba(255, 133, 173, 0.2)',
      pointHoverBorderColor: 'rgba(255, 133, 173, 1)'
    },
    { // lease
      backgroundColor: 'rgba(140, 151, 210, 0.2)',
      borderColor: 'rgba(140, 151, 210, 1)',
      pointBackgroundColor: '#fff',
      pointBorderColor: 'rgba(140, 151, 210, 1)',
      pointHoverBackgroundColor: 'rgba(140, 151, 210, 0.2)',
      pointHoverBorderColor: 'rgba(140, 151, 210, 1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
