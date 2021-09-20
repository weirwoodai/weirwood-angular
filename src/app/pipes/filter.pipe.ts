import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(values: any[], searchText: string): any[] {
    if (!values) {
      return [];
    }

    if (!searchText) {
      return values;
    }

    return values.filter((v) => v.toLowerCase().includes(searchText.toLowerCase()));
  }
}
