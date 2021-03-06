import { Component, OnInit } from '@angular/core';
import { PropertyEditPopoverComponent } from '../property-edit-popover/property-edit-popover.component';
import { PopoverService } from '../../../ui/popover/popover.module';

@Component({
  selector: 'app-popover-demo',
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.sass']
})
export class PopoverDemoComponent implements OnInit {
  editedPerson: Person;
  editedField: string;
  persons: Person[] = [];
  firsts = ['Mark', 'Edy', 'Jack', 'John', 'Mike'];
  lasts = ['Johnson', 'Willis', 'Chapman', 'Bob', 'Last'];
  isPopoverOpen3 = false;
  isPopoverOpen2 = false;
  isPopoverOpen = false;
  isPopoverOpen4 = false;
  isPopoverOpen5 = false;

  constructor(private popoverService: PopoverService) {
    for (let i = 0; i < this.firsts.length; i++) {
      for (let j = 0; j < this.lasts.length; j++) {
        this.persons.push({
          first: this.firsts[i],
          last: this.lasts[j],
        });
      }
    }
  }

  trackBy(index: number) {
    return index;
  }

  openEditFirstNamePopover(person: Person, $event: MouseEvent) {
    return this.openEditPropertyPopover(person, 'First Name', 'first', $event);
  }

  openEditLastNamePopover(person: Person, $event: MouseEvent) {
    return this.openEditPropertyPopover(person, 'Last Name', 'last', $event);
  }

  openEditPropertyPopover(person: Person, propertyName: string, p: keyof Person, $event: MouseEvent) {
    this.popoverService.open(PropertyEditPopoverComponent, <HTMLElement>$event.target, {
      popoverClass: 'popover-demo',
      escToClose: true
    }, component => {
      component.value = person[p];
      component.propertyName = propertyName;
      component.onValueChange.subscribe((v: string) => {
        person[p] = v;
      });
    });
  }

  ngOnInit() {
  }
}

interface Person {
  first: string;
  last: string;
}
