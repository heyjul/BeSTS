import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { SwipeAction } from '../models/swipe-action.model';

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
  @Input() swipeActions?: SwipeAction[];
  @Output() swipped = new EventEmitter<void>();
  @Output() touched = new EventEmitter<number>();

  private divInitialTouch!: number;
  private divTouched!: number;
  private initialTouch!: number;
  private width!: number;
  private div!: any;
  private left!: string;
  private active = false;
  private actionDivs!: any[];

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    event.stopPropagation();
    this.initialTouch = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    event.stopPropagation();

    if (this.active)
      this.left = Math.max(0 - (this.initialTouch - event.touches[0].clientX), 0) + 'px';
    else
      this.left = Math.max(this.width - (this.initialTouch - event.touches[0].clientX), 0) + 'px';

    this.update();
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    event.stopPropagation();
    if (!this.width)
      return;

    const delta = this.initialTouch - event.changedTouches[0].clientX;
    this.active = delta / this.width * 100 >= this.activeSwipeThreshold;

    if (!this.active) {
      this.left = this.width + 'px';
      this.update();
      return;
    }

    this.left = '0px';
    this.update();
    this.swipped.emit();
  }

  private create() {
    if (!this.swipeActions)
      return;

    this.actionDivs = [];
    this.div = this.renderer.createElement('div');

    for (const action of this.swipeActions) {
      const text = this.renderer.createElement('p');
      this.renderer.appendChild(text, this.renderer.createText(action.message ?? ''));
      const div = this.renderer.createElement('div');
      this.renderer.appendChild(div, text);

      this.renderer.setStyle(div, 'background-color', action.color ?? '');

      this.actionDivs.push(div);
      this.renderer.appendChild(this.div, div);
    }

    this.renderer.appendChild(this.el.nativeElement, this.div);

    this.renderer.addClass(this.div, 'action-swipe--div');
  }

  private update() {
    this.renderer.setStyle(this.div, 'left', this.left);
  }

  private reset() {
    this.width = this.el.nativeElement.offsetWidth + 1; // +1 because width might be a floating point and offsetWidth returns a integer
    this.left = this.width + 'px';
  }

  private setEventListeners() {
    this.renderer.listen(this.div, 'touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this.divInitialTouch = e.touches[0].clientX;
    });

    this.renderer.listen(this.div, 'touchend', (e: TouchEvent) => {
      e.preventDefault();

      // if user moves too much, it should no be considered as a "click"
      const delta = Math.abs(this.divInitialTouch - e.changedTouches[0].clientX);
      if (delta / this.width * 100 > 5) {
        return;
      }

      this.touched.emit(this.divTouched);
    });

    for (const [i, actionDiv] of this.actionDivs.entries()) {
      this.renderer.listen(actionDiv, 'touchstart', () => {
        this.divTouched = i;
      });
    }
  }
}
