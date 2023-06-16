import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cause',
  templateUrl: './cause.component.html',
  styleUrls: ['./cause.component.css']
})
export class CauseComponent implements OnInit {
  @ViewChild('causeTemplate') causeTemplateInput;
  @Input() nodeDetail: any;
  
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  sendTemplateData(data:any) 
  {
    this.dataService.setData(data);
  }
}
