import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answer'
})
export class AnswerPipe implements PipeTransform {

  transform(value: any, questionName: string): any {
    switch (questionName) {
      case 'totalPrice':
      case 'downPayment':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      case 'leaseDeal':
        return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}/month`;
      case 'loanTermLength':
      case 'leaseTermLength':
        return `${value * 12} months`;
      case 'timeFrame':
        return `${value} years`;
      case 'interestRate':
        return `${value}%`;
      case 'age':
        return `${value} years old`;
      default:
        return value;
    }
  }

}
