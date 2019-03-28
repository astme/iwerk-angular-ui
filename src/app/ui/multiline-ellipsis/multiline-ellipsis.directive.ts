import { AfterViewChecked, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { TaskRunnerService } from './task-runner.service';

/**
 * The multiline ellipsis directive can be used to display multi-line
 * text with an ellipsis character at the end if the text is too long.
 *
 ```ts
 import { MultilineEllipsisModule } from 'iwerk-angular-ui';
 ```
 */
@Directive({
  selector: '[iwMultilineEllipsis]'
})
export class MultilineEllipsisDirective implements AfterViewChecked, OnInit {

  /**
   * The text to display.
   */
  @Input() iwMultilineEllipsis: string;
  /**
   * An event that is emitted that indicates whether the text is truncated.
   */
  @Output() truncated = new EventEmitter<boolean>();

  /**
   * A boolean that indicates if the text overflows.
   */
  get isOverflowing(): boolean {
    return this.__isOverflowing;
  }

  private __isOverflowing: boolean;
  private needsAdjust: boolean;
  private oldText: string;
  private oldHeight: number;
  private oldWidth: number;

  constructor(
    private elementRef: ElementRef,
    private taskRunner: TaskRunnerService
  ) {
  }

  /**
   * @ignore
   */
  ngOnInit() {
    const self: HTMLElement = this.elementRef.nativeElement;
    self.classList.add('multiline-ellipsis');
  }

  /**
   * @ignore
   */
  ngAfterViewChecked() {
    const self: HTMLElement = this.elementRef.nativeElement;
    if (this.iwMultilineEllipsis !== this.oldText || this.oldHeight !== self.offsetHeight || this.oldWidth !== self.offsetWidth) {
      this.oldText = this.iwMultilineEllipsis;
      this.oldHeight = self.offsetHeight;
      this.oldWidth = self.offsetWidth;
      this.needsAdjust = true;
    }
    this.adjustInner();
  }

  /**
   * @ignore
   */
  @HostListener('window:resize', [])
  onResize() {
    this.needsAdjust = true;
    this.adjustInner();
  }

  /**
   * @ignore
   */
  private adjustInner() {
    if (!this.needsAdjust) {
      return;
    }
    this.needsAdjust = false;
    const self: HTMLElement = this.elementRef.nativeElement;
    self.innerHTML = this.iwMultilineEllipsis || '';
    const height = self.clientHeight;
    const contentHeight = self.scrollHeight;
    let overflow = height < contentHeight;
    const ellipsis = document.createElement('span');
    ellipsis.classList.add('ellipsis');
    ellipsis.innerText = '…';
    if (!overflow) {
      this.emitTruncated(false);
      return;
    }
    this.emitTruncated(true);
    self.appendChild(ellipsis);
    if (self.childNodes.length > 1) {
      const child = self.childNodes.item(self.childNodes.length - 2);
      if (this.removeLastByteAux(child)) {
        self.removeChild(child);
      }
    }
    while (overflow) {
      if (this.removeLastByte(self)) {
        break;
      }
      overflow = self.offsetHeight < self.scrollHeight;
    }
  }

  private emitTruncated(truncated: boolean) {
    this.taskRunner.addTaskForNextRound(() => {
      this.truncated.emit(truncated);
    });
    this.__isOverflowing = truncated;
  }

  /**
   * @ignore
   */
  private removeLastByte(element: HTMLElement): boolean {
    if (element.childNodes.length > 1) {
      const child = element.childNodes.item(element.childNodes.length - 2);
      if (this.removeLastByteAux(child)) {
        element.removeChild(child);
      }
    }
    return element.childNodes.length === 1;
  }

  /**
   * @ignore
   */
  private removeLastByteAux(element: Node): boolean {
    // true to remove
    if (element.nodeType === Node.TEXT_NODE) {
      const split = element.textContent.split(' ');
      split.pop();
      element.textContent = split.join(' ');
      return element.textContent === '';
    }
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.hasChildNodes()) {
        const last = element.childNodes.item(element.childNodes.length - 1);
        const result = this.removeLastByteAux(last);
        if (result) {
          element.removeChild(last);
          return this.removeLastByteAux(element);
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    throw new Error('This node type is not handled');
  }

}
