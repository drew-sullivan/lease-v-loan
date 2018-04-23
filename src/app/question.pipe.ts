import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'question'
})
export class QuestionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1).join(' ').toUpperCase();
  }

}
