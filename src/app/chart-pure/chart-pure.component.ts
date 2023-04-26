import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-pure',
  templateUrl: './chart-pure.component.html',
  styleUrls: ['./chart-pure.component.css'],
})
export class ChartPureComponent implements OnInit {
  nodes = [
    {
      name: 'CEO',
      children: [
        {
          name: 'CFO',
          children: [
            {
              name: 'Accounting',
            },
            {
              name: 'Finance',
            },
          ],
        },
        {
          name: 'COO',
          children: [
            {
              name: 'Operations',
            },
            {
              name: 'Logistics',
            },
          ],
        },
        {
          name: 'CTO',
          children: [
            {
              name: 'Engineering',
            },
            {
              name: 'IT',
            },
          ],
        },
      ],
    },
  ];

  edges = [
    {
      source: 'CEO',
      target: 'CFO',
    },
    {
      source: 'CEO',
      target: 'COO',
    },
    {
      source: 'CEO',
      target: 'CTO',
    },
  ];

  constructor() {}

  ngOnInit() {}

  renderChart() {}
}
