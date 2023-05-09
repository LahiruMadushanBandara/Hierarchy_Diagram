import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-control-node',
  templateUrl: './control-node.component.html',
  styleUrls: ['./control-node.component.css']
})
export class ControlNodeComponent implements OnInit {
  @ViewChild('controlTemplate') controlTemplateInput;

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
