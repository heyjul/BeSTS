import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[action-swipe]'
})
export class ActionSwipeDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.reset();
    this.create();
    this.setEventListeners();
    this.update();
  }

  @Input() activeSwipeThreshold = 30;
  @Input() swipeMessage?: string;
  @Input() swipeColor?: string;
  @Output() swipped = new EventEmitter<void>();
  @Output() touched = new EventEmitter<void>();

  private _divInitialTouch!: number;
  private _initialTouch!: number;
  private _width!: number;
  private _text!: any;
  private _div!: any;
  private _left!: string;
  private _active = false;

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    event.stopPropagation();
    this._initialTouch = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    event.stopPropagation();

    if (this._active)
      this._left = Math.max(0 - (this._initialTouch - event.touches[0].clientX), 0) + 'px';
    else
      this._left = Math.max(this._width - (this._initialTouch - event.touches[0].clientX), 0) + 'px';

    this.update();
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    event.stopPropagation();
    if (!this._width)
      return;

    const delta = this._initialTouch - event.changedTouches[0].clientX;
    this._active = delta / this._width * 100 >= this.activeSwipeThreshold;

    if (!this._active) {
      this._left = this._width + 'px';
      this.update();
      return;
    }

    this._left = '0px';
    this.update();
    this.swipped.emit();
  }

  private create() {
    this._text = this.renderer.createElement('p');
    this.renderer.appendChild(this._text, this.renderer.createText(this.swipeMessage ?? ''));

    this._div = this.renderer.createElement('div');

    this.renderer.appendChild(this._div, this._text);
    this.renderer.appendChild(this.el.nativeElement, this._div);

    this.renderer.addClass(this._div, 'action-swipe--div');
    this.renderer.addClass(this._text, 'action-swipe--text');

    this.renderer.setStyle(this._div, 'background-color', this.swipeColor ?? '');
  }

  private update() {
    this.renderer.setStyle(this._div, 'left', this._left);
  }

  private reset() {
    this._width = this.el.nativeElement.offsetWidth + 1; // +1 because width might be a floating point and offsetWidth returns a integer
    this._left = this._width + 'px';
  }

  private setEventListeners() {
    this.renderer.listen(this._div, 'touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._divInitialTouch = e.touches[0].clientX;
    });

    this.renderer.listen(this._div, 'touchend', (e: TouchEvent) => {
      e.preventDefault();

      // if user moves too much, it should no be considered as a "click"
      const delta = Math.abs(this._divInitialTouch - e.changedTouches[0].clientX);
      if (delta / this._width * 100 > 5) {
        return;
      }

      this.touched.emit();
    });
  }
}
