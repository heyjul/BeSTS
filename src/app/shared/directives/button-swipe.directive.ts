import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[button-swipe]'
})
export class ButtonSwipeDirective {

  private _initialTouch: undefined | number;
  @Output() swipped = new EventEmitter<void>();

  constructor() {

  }

  @HostListener('touchstart') onTouchStart(e: TouchEvent) {
    console.log(e.touches[0].clientX);
    this._initialTouch = e.touches[0].clientX;
  }

  @HostListener('touchend') onTouchEnd(e: TouchEvent) {
    alert(e.touches[0].clientX - Number(this._initialTouch));
    this._initialTouch = undefined;
  }



}
