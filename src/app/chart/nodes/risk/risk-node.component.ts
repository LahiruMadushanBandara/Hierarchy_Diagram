import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-risk-node',
  templateUrl: './risk-node.component.html',
  styleUrls: ['./risk-node.component.css'],
})
export class RiskNodeComponent implements OnInit, AfterViewInit {
  @ViewChild('my') input;
  nodeSet = new EventEmitter<any>();
  @Input() nodeDetail: any;
  
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.nodeSet.emit(this.input);
  }
}