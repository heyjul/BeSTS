import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[action-swipe]'
})
export class ActionSwipeDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this._width = this.el.nativeElement.offsetWidth + 1; // +1 because real width might be a floating point and offsetWidth returns a integer
    this._left = this._width + 'px';

    this._text = this.renderer.createElement('p');
    this.renderer.appendChild(this._text, this.renderer.createText(this.swipeMessage ?? ''));

    this._div = this.renderer.createElement('div');

    this.renderer.appendChild(this._div, this._text);
    this.renderer.appendChild(this.el.nativeElement, this._div);

    this.renderer.addClass(this._div, 'action-swipe--div');
    this.renderer.addClass(this._text, 'action-swipe--text');

    this.renderer.setStyle(this._div, 'background-color', this.swipeColor ?? '');

    this.renderer.listen(this._div, 'touchstart', (e: Event) => {
      e.preventDefault();
      this.touched.emit();
    });

    this.update();
  }

  @Input() swipeMin = 30;
  @Input() swipeMessage?: string;
  @Input() swipeColor?: string;
  @Output() swipped = new EventEmitter<void>();
  @Output() touched = new EventEmitter<void>();

  private _initialTouch: undefined | number;
  private _width!: number;
  private _text!: any;
  private _div!: any;
  private _left!: string;

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    event.stopPropagation();
    this._initialTouch = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    event.stopPropagation();
    if (!this._initialTouch)
      return;

    this._left = Math.min(this._width - (this._initialTouch - event.touches[0].clientX), Number(this._width)) + 'px';
    this.update();
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    event.stopPropagation();
    if (!this._initialTouch || !this._width)
      return;

    const delta = this._initialTouch - event.changedTouches[0].clientX;
    this._initialTouch = undefined;

    if (delta / this._width * 100 < this.swipeMin) {
      this._left = this._width + 'px';
      this.update();
      return;
    }

    this._left = '0px';
    this.update();
    this.swipped.emit();
  }

  private update() {
    this.renderer.setStyle(this._div, 'left', this._left);
  }
}
