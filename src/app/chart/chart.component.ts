import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import '@progress/kendo-ui';

declare var $: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})

export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('diagram', { static: false }) diagram: any;
  riskTemplate: string = "";
  controlTemplate: string = "";
  causeTemplate: string = "";
  consequencesTemplate: string = "";


  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }
}