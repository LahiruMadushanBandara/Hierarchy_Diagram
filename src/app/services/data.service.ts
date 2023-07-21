import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { data } from '../models/data.model';
import { DataConnection } from '../models/dataConnection.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {


  private _originalData: data[] = [
    { "Id": 1, "Type": 1, "ParentNodeId": 0, "Title": "Risk Node", "Header": "Risk", "Color": "", htmlTemplate: "<div>Node 1</div>" },
    { "Id": 2, "Type": 2, "ParentNodeId": 1, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 3, "Type": 2, "ParentNodeId": 2, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 4, "Type": 2, "ParentNodeId": 3, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 5, "Type": 2, "ParentNodeId": 4, "Title": "Cause Node", "Header": "Cause", "Color": "#3399cc", htmlTemplate: "<div>Agreed process </div>" },
    { "Id": 6, "Type": 2, "ParentNodeId": 1, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 7, "Type": 2, "ParentNodeId": 6, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 8, "Type": 2, "ParentNodeId": 7, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 9, "Type": 2, "ParentNodeId": 8, "Title": "Cause Node", "Header": "Cause", "Color": "#3399cc", htmlTemplate: "<div>Agreed process</div>" },
    { "Id": 10, "Type": 2, "ParentNodeId": 1, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 11, "Type": 2, "ParentNodeId": 10, "Title": "Cause Node", "Header": "Cause", "Color": "#3399cc", htmlTemplate: "<div>Agreed process</div>" },





    { "Id": 12, "Type": 3, "ParentNodeId": 1, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 13, "Type": 3, "ParentNodeId": 12, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 14, "Type": 3, "ParentNodeId": 13, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 15, "Type": 3, "ParentNodeId": 14, "Title": "Consequences Node", "Header": "Consequences", "Color": "#3399cc", htmlTemplate: "<div>Agreed process </div>" },
    { "Id": 16, "Type": 3, "ParentNodeId": 1, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 17, "Type": 3, "ParentNodeId": 16, "Title": "Control Node", "Header": "Control", "Color": "", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 18, "Type": 3, "ParentNodeId": 17, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 19, "Type": 3, "ParentNodeId": 18, "Title": "Consequences Node", "Header": "Consequences", "Color": "#3399cc", htmlTemplate: "<div>Agreed process </div>" },
    { "Id": 20, "Type": 3, "ParentNodeId": 1, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 20, "Type": 3, "ParentNodeId": 1, "Title": "Control Node", "Header": "Control", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },      
    { "Id": 21, "Type": 3, "ParentNodeId": 20, "Title": "Consequences Node", "Header": "Consequences", "Color": "#3399cc", htmlTemplate: "<div>Agreed process </div>" },


    { "Id": 22, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "riskExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 23, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "riskActionExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 24, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "incidentExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 25, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "complianceExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 26, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "KPIExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 27, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "riskActionExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 28, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "incidentExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 29, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "complianceExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 30, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "KPIExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 31, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "incidentExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 32, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "complianceExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 33, "Type": 4, "ParentNodeId": 1, "Title": "Other Node", "Header": "complianceExpand", "Color": "#3399cc", htmlTemplate: "<div>Agreed process for staff to anonymously raise concerns about workplacr practices</div>" },
    { "Id": 34, "Type": 2, "ParentNodeId": 1, "Title": "Cause Node", "Header": "Cause", "Color": "#3399cc", htmlTemplate: "<div>Agreed process </div>" },
    // { "Id": 35, "Type": 2, "ParentNodeId": 1, "Title": "Cause Node", "Header": "Cause", "Color": "#3399cc", htmlTemplate: "<div>Agreed process </div>" },
   
    
  ];


  private _dataConnections: DataConnection[] = [
    { "Id": 0, "FromShapeId": 1, "ToShapeId": 2, "Text": null },
    { "Id": 1, "FromShapeId": 2, "ToShapeId": 3, "Text": null },
    { "Id": 2, "FromShapeId": 3, "ToShapeId": 4, "Text": null },
    { "Id": 3, "FromShapeId": 4, "ToShapeId": 5, "Text": null },
    { "Id": 4, "FromShapeId": 1, "ToShapeId": 6, "Text": null },
    { "Id": 5, "FromShapeId": 6, "ToShapeId": 7, "Text": null },
    { "Id": 6, "FromShapeId": 7, "ToShapeId": 8, "Text": null },
    { "Id": 7, "FromShapeId": 8, "ToShapeId": 9, "Text": null },
    { "Id": 8, "FromShapeId": 1, "ToShapeId": 10, "Text": null },
    { "Id": 9, "FromShapeId": 10, "ToShapeId": 11, "Text": null },

    { "Id": 10, "FromShapeId": 1, "ToShapeId": 12, "Text": null },
    { "Id": 11, "FromShapeId": 12, "ToShapeId": 13, "Text": null },
    { "Id": 12, "FromShapeId": 13, "ToShapeId": 14, "Text": null },
    { "Id": 13, "FromShapeId": 14, "ToShapeId": 15, "Text": null },
    { "Id": 14, "FromShapeId": 1, "ToShapeId": 16, "Text": null },
    { "Id": 15, "FromShapeId": 16, "ToShapeId": 17, "Text": null },
    { "Id": 16, "FromShapeId": 17, "ToShapeId": 18, "Text": null },
    { "Id": 17, "FromShapeId": 18, "ToShapeId": 19, "Text": null },
    { "Id": 18, "FromShapeId": 1, "ToShapeId": 20, "Text": null },
    { "Id": 19, "FromShapeId": 20, "ToShapeId": 21, "Text": null },


    { "Id": 20, "FromShapeId": 1, "ToShapeId": 22, "Text": null },
    { "Id": 21, "FromShapeId": 1, "ToShapeId": 23, "Text": null },
    { "Id": 22, "FromShapeId": 1, "ToShapeId": 24, "Text": null },
    { "Id": 23, "FromShapeId": 1, "ToShapeId": 25, "Text": null },
    { "Id": 24, "FromShapeId": 1, "ToShapeId": 26, "Text": null },
    { "Id": 25, "FromShapeId": 1, "ToShapeId": 27, "Text": null },
    { "Id": 26, "FromShapeId": 1, "ToShapeId": 28, "Text": null },
    { "Id": 27, "FromShapeId": 1, "ToShapeId": 29, "Text": null },
    { "Id": 28, "FromShapeId": 1, "ToShapeId": 30, "Text": null },
    { "Id": 29, "FromShapeId": 1, "ToShapeId": 31, "Text": null },
    { "Id": 30, "FromShapeId": 1, "ToShapeId": 32, "Text": null },
    { "Id": 23, "FromShapeId": 1, "ToShapeId": 33, "Text": null },
    { "Id": 24, "FromShapeId": 1, "ToShapeId": 34, "Text": null },
  ];

  public get dataConnections(): DataConnection[] {
    return this._dataConnections;
  }
  
  public get originalData(): data[] {
    return this._originalData;
  }
 


  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();

  constructor() {}

  setData(data) {
    this.data.next(data);
  }


}
