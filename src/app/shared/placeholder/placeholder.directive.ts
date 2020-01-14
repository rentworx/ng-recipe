import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  // https://angular.io/guide/dynamic-component-loader
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
