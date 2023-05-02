import { Component, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart-pure',
  templateUrl: './chart-pure.component.html',
  styleUrls: ['./chart-pure.component.css'],
})
export class ChartPureComponent implements OnInit {
  @ViewChild('my') input;
  a: any;
  ngOnInit(): void {}
  ngAfterViewInit() {
    console.log(this.input.nativeElement);
  }
}
