import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'offersOderBy'
})
export class OffersOderByPipe implements PipeTransform {

  transform(array: Array<any>, field: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }

    if (field.startsWith('-')) {
      field = field.substring(1);
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return 1;
        } else if (a[field] > b[field]) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    return array;
  }

}
