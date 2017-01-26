import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip-demo',
  templateUrl: './tooltip-demo.component.html',
  styleUrls: ['./tooltip-demo.component.scss']
})
export class TooltipDemoComponent implements OnInit {
  value = 0;
  tooltipHtml1 = `<button [iwTooltip]="tooltipTemplate" (click)="value = value + 1">
  Increment
</button>

<button [iwTooltip]="tooltipTemplate2" (click)="value = 0">
  Reset
</button>

<template #tooltipTemplate>
  Click to go from {{value}} to {{value+1}}
</template>

<template #tooltipTemplate2>
  Reset to 0
</template>`.trim();

  constructor() {}

  ngOnInit() {
  }

}