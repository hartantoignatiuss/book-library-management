import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paddingnew'
})
export class PaddingnewPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
