import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor() {}

  private _rTemp: any;
  public get rTemp(): any {
    return this._rTemp;
  }
  public set rTemp(value: any) {
    this._rTemp = value;
  }

  private _cTemp: any;
  public get cTemp(): any {
    return this._cTemp;
  }
  public set cTemp(value: any) {
    this._cTemp = value;
  }

  private _ccTemp: any;
  public get ccTemp(): any {
    return this._ccTemp;
  }
  public set ccTemp(value: any) {
    this._ccTemp = value;
  }

  private _csTemp: any;
  public get csTemp(): any {
    return this._csTemp;
  }
  public set csTemp(value: any) {
    this._csTemp = value;
  }
}
