import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padding'
})
export class PaddingPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let paddedValue = value.toString();

    if(paddedValue.length !=5){
      while (paddedValue.length < 5) {
        paddedValue = '0' + paddedValue;
      }
      return paddedValue;
    }
    else
    return paddedValue;

   
  
  }

}
