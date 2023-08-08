import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { data } from '../models/data.model';
import { DataConnection } from '../models/dataConnection.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  
  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();

  constructor() {}

  setData(data) {
    this.data.next(data);
  }


}
