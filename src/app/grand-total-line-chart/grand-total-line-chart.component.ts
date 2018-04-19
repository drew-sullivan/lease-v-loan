import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-grand-total-line-chart',
  templateUrl: './grand-total-line-chart.component.html',
  styleUrls: ['./grand-total-line-chart.component.css']
})
export class GrandTotalLineChartComponent implements OnInit {

  @Input() set loanData(value: any[]) { this._loanData = value; }
  @Input() set leaseData(value: any[]) { this._leaseData = value; }

  private _loanData: any[];
  private _leaseData: any[];

  // lineChart
  public lineChartData: Array<any> = [];
  public lineChartLabels: string[];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return new Intl.NumberFormat(
            'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(tooltipItem.yLabel);
        }
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: (label, index, labels) => `${new Intl.NumberFormat(
              'en-US',
              { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }
            ).format(label / 1000)}k`
          },
          scaleLabel: {
            display: true,
            labelString: 'GRAND TOTAL'
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'YEAR'
          }
        }
      ]
    }
  };
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

  constructor(private helperService: HelpersService) { }

  ngOnInit() {
    this.setLineChartData();
  }

  setLineChartData(): void {
    this.lineChartData.push({data: this._loanData, label: 'Loan', lineTension: 0});
    this.lineChartData.push({data: this._leaseData, label: 'Lease', lineTension: 0});
    this.lineChartLabels = this.helperService.generateRangeArray(1, this._loanData.length, 1)
      .map(lineChartLabel => `Year ${lineChartLabel}`);
  }
}
