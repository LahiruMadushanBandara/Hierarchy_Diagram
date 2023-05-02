import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-central-node',
  templateUrl: './central-node.component.html',
  styleUrls: ['./central-node.component.css'],
})
export class CentralNodeComponent implements OnInit, AfterViewInit {
  @ViewChild('my') input;
  nodeSet = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.nodeSet.emit(this.input);
  }
}
