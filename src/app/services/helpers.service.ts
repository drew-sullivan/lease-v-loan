import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

  constructor() { }

  generateRangeArray = (start, stop, step) => {
    const rangeArray = [];
    let arrayItem = start;
    do {
      rangeArray.push(arrayItem);
      arrayItem += step;
    }
    while (rangeArray[rangeArray.length - 1] <= stop - 1);
    return rangeArray;
  }

}
