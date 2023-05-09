import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = new BehaviorSubject("")
  currentData = this.data.asObservable();

  constructor() { }

  setData(data) {
    this.data.next(data);
  }
}