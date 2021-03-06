import {
  Component,
  ViewEncapsulation,
  HostListener,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'iw-popover-container',
  templateUrl: './popover-container.component.html',
  styleUrls: ['./popover-container.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PopoverContainerComponent {
  escToClose: boolean;
  onClose = new EventEmitter(true);

  constructor() {}

  @HostListener('body:keydown', ['$event'])
  onKeyDown($event: KeyboardEvent) {
    if (this.escToClose && $event.keyCode === 27) {
      $event.preventDefault();
      this.onClose.emit();
    }
  }

}
