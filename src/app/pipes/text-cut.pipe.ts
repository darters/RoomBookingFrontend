import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCut',
  standalone: true
})
export class TextCutPipe implements PipeTransform {
  transform(text: string, maxLength: number): string {
    if(text.length >= maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}
