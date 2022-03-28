import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchingTextHighlight'
})
export class MatchingTextHighlightPipe implements PipeTransform {
  transform(source: string, matchingPart: string): string {
    return source.replace(new RegExp(`(${matchingPart})`, 'gi'), '<b>$1</b>');
  }
}
