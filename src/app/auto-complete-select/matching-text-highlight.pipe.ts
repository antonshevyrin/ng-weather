import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'matchingTextHighlight'
})
export class MatchingTextHighlightPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(source: string, matchingPart: string): string {
    return this.domSanitizer.sanitize(
      SecurityContext.HTML,
      source.replace(new RegExp(`(${matchingPart})`, 'gi'), '<b>$1</b>')
    );
  }
}
