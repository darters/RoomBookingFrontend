import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = this.elementRef.nativeElement as HTMLInputElement;
    const filteredValue = input.value.replace(/[^0-9]/g, '');
    input.value = filteredValue;
  }
}
