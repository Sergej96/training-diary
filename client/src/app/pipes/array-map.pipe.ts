import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'arrayMap'
})
export class ArrayMapPipe implements PipeTransform {
  transform(value: any, fn: Function) {
    if (Array.isArray(value) || fn) {
      return value.map(fn);
    }
    return value;

  }
}
