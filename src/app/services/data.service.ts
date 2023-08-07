import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { data } from '../models/data.model';
import { DataConnection } from '../models/dataConnection.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {


  private _originalData: data[] =[
    {
        "Id": 0,
        "Type": 1,
        "ParentNodeId": 0,
        "Title": "Risk Node",
        "Header": "Risk",
        "Rating": "",
        "htmlTemplate": "<dev>test_SH</dev>",
        "RiskData": {
            "RiskCode": "OR-81",
            "ResponsibleManager": "Anita Raymond2",
            "Category": "3",
            "ResidualRiskRating": "2",
            "TargetRiskRatinng": "2",
            "InherentRiskRating": "",
            "AppetiteRating": ""
        }
    },
    
    {
        "Id": 1776,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Electrical Test and Tag </dev>",
        "ControlData": {
            "ControlTitle": "Electrical Test and Tag ",
            "ControlOwner": "Owen Drummond",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 1777,
        "Type": 3,
        "ParentNodeId": 1776,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Mechanical aids</dev>",
        "ControlData": {
            
            "ControlTitle": "Mechanical aids",
            "ControlOwner": "Owen Drummond",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 1778,
        "Type": 3,
        "ParentNodeId": 1777,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Emergency procedure drills</dev>",
        "ControlData": {
           
            "ControlTitle": "Emergency procedure drills",
            "ControlOwner": "Chris Lonergan",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 1779,
        "Type": 3,
        "ParentNodeId": 1778,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>VINAH reporting guidelines</dev>",
        "ControlData": {
          
            "ControlTitle": "VINAH reporting guidelines",
            "ControlOwner": "Anne Lawrence",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 6,
        "Type": 3,
        "ParentNodeId": 1779,
        "Title": "Consequences Node",
        "Header": "Consequence",
        "Rating": "",
        "htmlTemplate": "<dev>Risktoreputationasaresultofmediacoverageandadverse</dev>"
    },
    {
        "Id": 2775,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Falls risk assessment</dev>",
        "ControlData": {
            "ControlTitle": "Falls risk assessment",
            "ControlOwner": "Anita Raymond2",
            "ControlOwnerRating": "Strongest",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2776,
        "Type": 3,
        "ParentNodeId": 2775,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Cleaning practices</dev>",
        "ControlData": {
            
            "ControlTitle": "Cleaning practices",
            "ControlOwner": "Michelle Brady",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2777,
        "Type": 3,
        "ParentNodeId": 2776,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Drugs and poisons legislation - DPCS </dev>",
        "ControlData": {
            
            "ControlTitle": "Drugs and poisons legislation - DPCS ",
            "ControlOwner": "Louise McMahon",
            "ControlOwnerRating": "Strongest",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2778,
        "Type": 3,
        "ParentNodeId": 2777,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Procurement Framework</dev>",
        "ControlData": {
           
            "ControlTitle": "Procurement Framework",
            "ControlOwner": "Owen Drummond",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 67,
        "Type": 3,
        "ParentNodeId": 2778,
        "Title": "Consequences Node",
        "Header": "Consequence",
        "Rating": "",
        "htmlTemplate": "<dev>Sustainability innovation and quality of care is affected</dev>"
    },
    {
        "Id": 2779,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Uniform and dress code protocol</dev>",
        "ControlData": {
            "ControlTitle": "Uniform and dress code protocol",
            "ControlOwner": "Lee Cochrane",
            "ControlOwnerRating": "Moderate",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2780,
        "Type": 3,
        "ParentNodeId": 2779,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Hospital Pool Vehicles Protocol</dev>",
        "ControlData": {
           
            "ControlTitle": "Hospital Pool Vehicles Protocol",
            "ControlOwner": "Michael Glaubitz",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2781,
        "Type": 3,
        "ParentNodeId": 2780,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Emergency Procedures Training</dev>",
        "ControlData": {
            
            "ControlTitle": "Emergency Procedures Training",
            "ControlOwner": "Chris Lonergan",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2782,
        "Type": 3,
        "ParentNodeId": 2781,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Occupational Violence and Aggression Prevention Protocol</dev>",
        "ControlData": {
            
            "ControlTitle": "Occupational Violence and Aggression Prevention Protocol",
            "ControlOwner": "Chris Lonergan",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2783,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Continual improvement of electronic discharge summaries</dev>",
        "ControlData": {
            "ControlTitle": "Continual improvement of electronic discharge summaries",
            "ControlOwner": "Adrian Shearer",
            "ControlOwnerRating": "Weak",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2784,
        "Type": 2,
        "ParentNodeId": 2783,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Development of internal process for the psychological support for patients, staff and families during the time period of the commission.</dev>",
        "ControlData": {
          
            "ControlTitle": "Development of internal process for the psychological support for patients, staff and families during the time period of the commission.",
            "ControlOwner": "Sebastian Romano",
            "ControlOwnerRating": "Moderate",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2785,
        "Type": 2,
        "ParentNodeId": 2784,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Senior mental health management forum utilised to monitor Weighted Occupancy Target (WOTs) for bed based services against performance.</dev>",
        "ControlData": {
           
            "ControlTitle": "Senior mental health management forum utilised to monitor Weighted Occupancy Target (WOTs) for bed based services against performance.",
            "ControlOwner": "Sebastian Romano",
            "ControlOwnerRating": "Moderate",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2786,
        "Type": 2,
        "ParentNodeId": 2785,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Falls Prevention and Management Policy</dev>",
        "ControlData": {
           
            "ControlTitle": "Falls Prevention and Management Policy",
            "ControlOwner": "Glenn Boulton",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 165,
        "Type": 2,
        "ParentNodeId": 2786,
        "Title": "Cause Node",
        "Header": "Cause",
        "Rating": "",
        "htmlTemplate": "<dev>AdversefindingsagainstLRHasaresultoftheMentalHealt</dev>"
    },
    {
        "Id": 2787,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Uniform and dress code protocol</dev>",
        "ControlData": {
            "ControlTitle": "Uniform and dress code protocol",
            "ControlOwner": "Lee Cochrane",
            "ControlOwnerRating": "Moderate",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2788,
        "Type": 2,
        "ParentNodeId": 2787,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Hospital Pool Vehicles Protocol</dev>",
        "ControlData": {
           
            "ControlTitle": "Hospital Pool Vehicles Protocol",
            "ControlOwner": "Michael Glaubitz",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2789,
        "Type": 2,
        "ParentNodeId": 2788,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Emergency Procedures Training</dev>",
        "ControlData": {
           
            "ControlTitle": "Emergency Procedures Training",
            "ControlOwner": "Chris Lonergan",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 2790,
        "Type": 2,
        "ParentNodeId": 2789,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Occupational Violence and Aggression Prevention Protocol</dev>",
        "ControlData": {
           
            "ControlTitle": "Occupational Violence and Aggression Prevention Protocol",
            "ControlOwner": "Chris Lonergan",
            "ControlOwnerRating": "Strong",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true
        }
    },
    {
        "Id": 58,
        "Type": 2,
        "ParentNodeId": 2790,
        "Title": "Cause Node",
        "Header": "Cause",
        "Rating": "",
        "htmlTemplate": "<dev>MediacoverageofadversefindingsagainstLRHasaresulto</dev>"
    },

    {
      "Id": 1775,
      "Type": 3,
      "ParentNodeId": 0,
      "Title": "Control Node",
      "Header": "Control",
      "Rating": "",
      "htmlTemplate": "<dev>Development of communication strategy to manage internal and external stakeholders.</dev>",
      "ControlData": {
         
          "ControlTitle": "Development of communication strategy to manage internal and external stakeholders.",
          "ControlOwner": "Sebastian Romano",
          "ControlOwnerRating": "Moderate",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true
      }
  },

    {
        "Id": 1,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "incidentExpand",
        "Rating": "",
        "htmlTemplate": "<dev>IMS - 1</dev>",
        "IncidentData": {
            "LinkageId": 2,
            "IncidentId": 1,
            "IncidentTitle": "IMS - 1",
            "IncidentCode": "Test",
            "IncidentType": "Mar 30 2020  9:55PM",
            "ReportedDate": "Near Miss",
            "ResponsiblePerson": "",
            "ImageType": ""
        }
    },
    {
        "Id": 2,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "incidentExpand",
        "Rating": "",
        "htmlTemplate": "<dev>IMS - 2</dev>",
        "IncidentData": {
            "LinkageId": 3,
            "IncidentId": 2,
            "IncidentTitle": "IMS - 2",
            "IncidentCode": "test",
            "IncidentType": "Oct 26 2020  7:04PM",
            "ReportedDate": "Hazard",
            "ResponsiblePerson": "",
            "ImageType": ""
        }
    }



    ]

  
  
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
