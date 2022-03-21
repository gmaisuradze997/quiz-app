import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBackground]',
})
export class BackgroundDirective {
  @Input() correctAnswer: number = 0;
  @Input() formDisabled: boolean = false;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onAnswered() {
    if (this.correctAnswer && !this.formDisabled) {
      this.renderer.setStyle(
        this.elRef.nativeElement,
        'background-color',
        'green'
      );
    } else if (!this.formDisabled) {
      this.renderer.setStyle(
        this.elRef.nativeElement,
        'background-color',
        'red'
      );
    }
  }
}
