import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // the open css class opens the div containing the menu items
  @HostBinding('class.open') isOpen = false;
  // the below was the first attempt
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}
