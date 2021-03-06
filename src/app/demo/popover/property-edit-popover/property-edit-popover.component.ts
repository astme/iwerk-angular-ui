import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Popover } from '../../../ui/popover/popover.module';

@Component({
  selector: 'app-property-edit-popover',
  templateUrl: './property-edit-popover.component.html',
  styleUrls: ['./property-edit-popover.component.sass']
})
export class PropertyEditPopoverComponent implements OnInit {
  @Input() value: string;
  @Input() propertyName: string;
  @Output() onValueChange = new EventEmitter<string>();

  constructor(private popoverInstance: Popover) { }

  ngOnInit() {
  }

  close() {
    this.popoverInstance.close();
  }

}
