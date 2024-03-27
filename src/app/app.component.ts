import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import '@progress/kendo-ui';
import { TemplateClass } from './utils/classes/TemplateClass';
import { DiagramNodeData } from './models/data.model';
import { BowTieDiagramHelper } from './utils/classes/BowTieDiagramHelper';
import { DiagramManager } from './utils/classes/DiagramManager';



declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges {
  @Output() expandChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('diagram', { static: false }) diagram: any;
  @ViewChild('buttonContainer', { static: true }) buttonContainer: ElementRef;
  @Input() bowTieNodeDetails: DiagramNodeData[] = [];

  riskTemplate: string = '';
  controlTemplate: string = '';
  causeTemplate: string = '';
  consequencesTemplate: string = '';
  otherTemplate: string = '';
  originalData: DiagramNodeData[] = [];

  @Input() IsExpanded: boolean = false;

  constructor(private eleRef: ElementRef) { }

  ngAfterViewInit(): void { }

  ngOnChanges(change: SimpleChanges): void { }


  ngOnInit(): void {

    let elrf = this.eleRef.nativeElement
    sessionStorage.clear();



    // !change?.['getfilterCriteriaEvent']?.currentValue !==
    // !change?.['getfilterCriteriaEvent']?.previousValue
    // var tem = new TemplateClass();
    // this.originalData = tem.NodeSampleData;

    this.originalData = [
      {
        "Id": 1500,
        "Type": 0,
        "Title": "Common-point",    
        "ParentNodeId": 0,       
        "Header": "Common-point",
        "Rating": "",
        "htmlTemplate": "",     
      },
      {
        "Id": 0,
        "Type": 1,
        "ParentNodeId": 0,
        "Title": "Risk Node",
        "Header": "Risk",
        "Rating": "",
        "htmlTemplate": "Failure to appropriately implement business continuity program/policy.",
        "RiskData": {
          "RiskCode": "OR24",
          "ResponsibleManager": "Elizabeth McMahon",
          "Category": "Architecture",
          "ResidualRiskRating": "Moderate",
          "TargetRiskRating": "Moderate",
          "InherentRiskRating": "High",
          "AppetiteRating": "Within Appetite",
          "InherentRiskRatingImg": "",
          "ResidualRiskRatingImg": "",
          "TargetRiskRatingImg": "",
          "AppetiteRatingImg": "",
          "profileImageUrl": "",
          "IsEnableRiskAppetite": false
        }
      },

     

      {
        "Id": 1,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 1 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 2,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>2 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },

      {
        "Id": 3,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 3 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 4,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 4 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 111,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 111 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 1111,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 1111 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 222,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 111 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 2222,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 1111 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 333,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 111 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
     
      {
        "Id": 5,
        "Type": 2,
        "ParentNodeId": 19,
        "Title": "Cause Node",
        "Header": "Cause",
        "Rating": "",
        "htmlTemplate": "<dev> 1 ReducedenterpriseITsupport</dev>",
        "LinkedControlIds": [1, 2, 3, 4,111,1111,222,2222,333,3333]

      },
    
      {
        "Id": 6,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 6 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 7,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 7 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 8,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 8 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 9,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 9 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },



      {
        "Id": 10,
        "Type": 2,
        "ParentNodeId": 19,
        "Title": "Cause Node",
        "Header": "Cause",
        "Rating": "",
        "htmlTemplate": "<dev> 3 22InsufficientITsecuritymanagement</dev>",
        "LinkedControlIds": [6 , 7, 8, 9 ,19]

      },

      {
        "Id": 11,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 9 22Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },

      {
        "Id": 12,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 10 222Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 13,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 11 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 14,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 12 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 15,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 13 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 16,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 14 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 17,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 15 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 18,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 16 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },
      {
        "Id": 19,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 17 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },




      {
        "Id": 20,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 18 Prioritize critical business functions</dev>",
        "ControlData": {

          "ControlTitle": "Prioritize critical business functions",
          "ControlOwner": "Madeline Jones",
          "ControlOwnerRating": "Partially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""

        }
      },


      {
        "Id": 21,
        "Type": 3,
        "ParentNodeId": 3,
        "Title": "Consequences Node",
        "Header": "Consequence",
        "Rating": "",
        "htmlTemplate": " 1 Reduced enter#prise IT support#",
        "LinkedControlIds": [20]

      },

      {
        "Id": 22,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 19 Mechanisms exist to develop a security Concept of Operations (CONOPS), or a similarly-defined plan with the vendor</dev>",
        "ControlData": {

          "ControlTitle": "Mechanisms exist to develop a security Concept of Operations (CONOPS), or a similarly-defined plan with the vendor",
          "ControlOwner": "Andrew James",
          "ControlOwnerRating": "Substantially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },

      {
        "Id": 221,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 19 Mechanisms exist to develop a security Concept of Operations (CONOPS), or a similarly-defined plan with the vendor</dev>",
        "ControlData": {

          "ControlTitle": "Mechanisms exist to develop a security Concept of Operations (CONOPS), or a similarly-defined plan with the vendor",
          "ControlOwner": "Andrew James",
          "ControlOwnerRating": "Substantially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },




      {
        "Id": 23,
        "Type": 3,
        "ParentNodeId": 3,
        "Title": "Consequences Node",
        "Header": "Consequence",
        "Rating": "",
        "htmlTemplate": "<dev> 2 ReducedenterpriseITsupport</dev>",
        "LinkedControlIds": [22,221]

      },
      {
        "Id": 24,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 20 Prioritize critical business functions</dev>",
        "ControlData": {

          "ControlTitle": "Prioritize critical business functions",
          "ControlOwner": "Madeline Jones",
          "ControlOwnerRating": "Partially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""

        }
      },
      {
        "Id": 25,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 21 Prioritize critical business functions</dev>",
        "ControlData": {

          "ControlTitle": "Prioritize critical business functions",
          "ControlOwner": "Madeline Jones",
          "ControlOwnerRating": "Partially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""

        }
      },
      {
        "Id": 26,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 22 Prioritize critical business functions</dev>",
        "ControlData": {

          "ControlTitle": "Prioritize critical business functions",
          "ControlOwner": "Madeline Jones",
          "ControlOwnerRating": "Partially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""

        }
      },
      {
        "Id": 27,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 23  Prioritize critical business functions</dev>",
        "ControlData": {

          "ControlTitle": "Prioritize critical business functions",
          "ControlOwner": "Madeline Jones",
          "ControlOwnerRating": "Partially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""

        }
      },

      {
        "Id": 28,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 24 Prioritize critical business functions</dev>",
        "ControlData": {

          "ControlTitle": "Prioritize critical business functions",
          "ControlOwner": "Madeline Jones",
          "ControlOwnerRating": "Partially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""

        }
      },

      {
        "Id": 289,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 24 Prioritize critical business functions</dev>",
        "ControlData": {

          "ControlTitle": "Prioritize critical business functions",
          "ControlOwner": "Madeline Jones",
          "ControlOwnerRating": "Partially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""

        }
      },
    

      {
        "Id": 30,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Incident",
        "Rating": "",
        "htmlTemplate": "<dev>Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32) 2</dev>",
        "IncidentData": {
          "LinkageId": 1217,
          "IncidentId": 201,
          "IncidentTitle": "Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32)",
          "IncidentCode": "IMS - 1",
          "IncidentType": "IT Incident",
          "ReportedDate": "Jul 14 2022  2:49PM",
          "ResponsiblePerson": "Madeline Jones",
          "ImageType": "",
          "ByteImage": "",
          "ResponsibleManagerProfilePic": ""
        }
      },

      {
        "Id": 31,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Incident",
        "Rating": "",
        "htmlTemplate": "<dev>Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32) 3</dev>",
        "IncidentData": {
          "LinkageId": 1217,
          "IncidentId": 201,
          "IncidentTitle": "Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32)",
          "IncidentCode": "IMS - 1",
          "IncidentType": "IT Incident",
          "ReportedDate": "Jul 14 2022  2:49PM",
          "ResponsiblePerson": "Madeline Jones",
          "ImageType": "",
          "ByteImage": "",
          "ResponsibleManagerProfilePic": ""
        }
      },



      {
        "Id": 32,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "KPI",
        "Rating": "",
        "htmlTemplate": "<dev>Number of ISP outages.</dev>",
        "KPIData": {
          "RiskLinkId": 2078,
          "KpiIntId": 12,
          "KpiGuidId": "543baf2f-14ea-478e-966a-fb16c4c574a1",
          "KPITitle": "% reduction in non-clinically indicated surgery",
          "Unit": "#",
          "ReportingPeriod": "Month",
          "Actual": 21,
          "Target": 20,
          "PerformanceImg": "Monitor",
          "TrendImg": "Not Applicable",
          "Performance": "Monitor"
        }
      },
      {
        "Id": 33,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "KPI",
        "Rating": "",
        "htmlTemplate": "<dev>Number of ISP outages.</dev>",
        "KPIData": {
          "RiskLinkId": 2078,
          "KpiIntId": 12,
          "KpiGuidId": "543baf2f-14ea-478e-966a-fb16c4c574a1",
          "KPITitle": "% reduction in non-clinically indicated surgery",
          "Unit": "%",
          "ReportingPeriod": "Month",
          "Actual": 21,
          "Target": 20,
          "PerformanceImg": "Monitor",
          "TrendImg": "Not Applicable",
          "Performance": "On Track"
        }
      },

      {
        "Id": 34,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Treatment",
        "Rating": "",
        "htmlTemplate": "<dev>Number of ISP outages.</dev>",
        "TreatmentData": {
          "DueDate": "17octomber2023",
          "Owner": "Madeline Jones",
          "CompleteValue": 55,
        }
      },

      {
        "Id": 40,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Treatment",
        "Rating": "",
        "htmlTemplate": "<dev>Number of ISP outages.</dev>",
        "TreatmentData": {
          "DueDate": "17octomber2023",
          "Owner": "Madeline Jones",
          "CompleteValue": 55,
        }
      },

      {
        "Id": 35,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Audit",
        "Rating": "",
        "htmlTemplate": "Birthday attacks against TLS ciphers with 64bit block size vulnerability",
        "AuditData": {
          "AuditDate": "17octomber2023",
          "AuditTitle": "Madeline Jones",
          "AuditId": 55,
        }
      },
      {
        "Id": 41,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Audit",
        "Rating": "",
        "htmlTemplate": "Birthday attacks against TLS ciphers with 64bit block size vulnerability",
        "AuditData": {
          "AuditDate": "17octomber2023",
          "AuditTitle": "Madeline Jones",
          "AuditId": 55,
        }
      },

      {
        "Id": 36,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Hierarchy",
        "Rating": "",
        "htmlTemplate": "Madeline Jones > Birthday",
        "HierarchyData": {
          "isPermitted": true,
          "nodeId": "34",
          "collapseHierarchyView": "Madeline Jones > Birthday",
          "expandHierarchyView": "Madeline Jones > Birthday > attacks against > TLS ciphers > with 64bit > block size > vulnerability",
        }
      },
      {
        "Id": 42,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Hierarchy",
        "Rating": "",
        "htmlTemplate": "Madeline Jones > Birthday",
        "HierarchyData": {
          "isPermitted": true,
          "nodeId": "34",
          "collapseHierarchyView": "Madeline Jones > Birthday",
          "expandHierarchyView": "Madeline Jones > Birthday > attacks against > TLS ciphers > with 64bit > block size > vulnerability",
        }
      },

      {
        "Id": 37,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "AuditRecommendation",
        "Rating": "",
        "htmlTemplate": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
        "AuditRecommendationData": {

        }
      },
      {
        "Id": 43,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "AuditRecommendation",
        "Rating": "",
        "htmlTemplate": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
        "AuditRecommendationData": {

        }
      },

      {
        "Id": 38,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "AuditFinding",
        "Rating": "",
        "htmlTemplate": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
        "AuditRecommendationData": {

        }
      },
      {
        "Id": 44,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "AuditFinding",
        "Rating": "",
        "htmlTemplate": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
        "AuditRecommendationData": {

        }
      },


      {
        "Id": 39,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Policy",
        "Rating": "",
        "htmlTemplate": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
        "PolicyData": {
          "IncidentTypeName": "compliance",
          "ResponsiblePerson": "Andrew James",
          "PolicyResponsibleOfficerProfilePic": ""
        }
      },
     
      {
        "Id": 45,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Policy",
        "Rating": "",
        "htmlTemplate": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
        "PolicyData": {
          "IncidentTypeName": "compliance",
          "ResponsiblePerson": "Andrew James",
          "PolicyResponsibleOfficerProfilePic": ""
        }
      },

      {
        "Id": 3333,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev> 3333 Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
        "ControlData": {

          "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
          "ControlOwner": "Joe Smith",
          "ControlOwnerRating": "Largely Ineffective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": true,
          "ControlOwnerRatingImage": ""
        }
      },

    ]


    console.log("data array", this.originalData);
    var tempTitleDetail = '';
    let isRiskView = false;
    let isKpIview = false;
    let isPerformanceView = false;
    let isExpand = false;
    let clicked = false;
    var clickedNodeHeader = "";

    var originalConnections; // Variable to store the original connections
    var Templates = new TemplateClass();
    var diagramManager = new DiagramManager();

    // Import the Drawing API namespaces.
    var draw = kendo.drawing;

    function visualTemplate(options: any) {
      var visual = new kendo.dataviz.diagram.Group();
      var dataItem = options.dataItem;

     

      visual.drawingElement.options.tooltip = {
        content: dataItem.htmlTemplate,       
        position: "bottom",
        width: 400, // Adjust the width as needed
        height: "auto",
        showOn: "mouseenter"        
      };
      
     
      var templatesObj =
      {
        riskTemplate: "",
        controlTemplate: "",
        controlTemplateExpand: "",
        causeTemplate: "",
        consequencesTemplate: "",
        incidentTemplateExpnad: "",
        kpiTemplateExpnad: "",
        bottomTemplate: "",
        linkRiskTemplate: "",
        complianceTemplateExpnad: "",
        authorityDocumentTemplateExpnad: "",
        auditTemplateExpnad: "",
        treatmentTemplate: "",
        hierarchyTemplate: "",
        auditRecommendationTemplate: "",
        auditFindingTemplate: "",
        PolicyTemplate: "",
      }

      var renderElement = $("<div style='display:inline-block' />").appendTo('body');


      Templates.AddTemplatesToNode(dataItem, templatesObj, isExpand, isPerformanceView, isKpIview, isRiskView, renderElement);

      var output = new kendo.drawing.Group();
      var width = renderElement.width();
      var height = renderElement.height();
      var geom = new kendo.geometry.Rect([0, 0], [width, height]);
      output.append(new kendo.drawing.Rect(geom, { stroke: { width: 0 } }));

      draw.drawDOM(renderElement, options).then(function (group) {
        output.clear();
        output.append(group);
        renderElement.remove();
      });


     
      visual.drawingElement.append(output);

      return visual;
    }

    var diagramHelper = new BowTieDiagramHelper();
    diagramHelper.ArrangeNodesTesting(this.originalData);
    const arrangedData = diagramHelper.ArrangeNodes( isExpand);
    arrangedData.map((node) => ({ Id: node.Id, x: node.x, y: node.y }));
   
    


    $(() => {
      $(document).ready(() => {
        createDiagram(this.originalData, this.IsExpanded);
      });



      function onCancel(e) {
        e.preventDefault();
        e.container.closest('.k-popup-edit-form').data('kendoWindow').close();
      }

      function createDiagram(originalData: any[], isExpanded: boolean) {
       
        var dataShapes = JSON.parse(sessionStorage.getItem('shapes'));
        var isExpanded = isExpanded;


        if (!dataShapes || dataShapes.length == 0) {
          sessionStorage.setItem('shapes', JSON.stringify(originalData));
          dataShapes = originalData;
        } else {
          dataShapes = JSON.parse(sessionStorage.getItem('shapes'));
        }

        // var commonPoint = new kendo.dataviz.diagram.Point(50,-50);
        // var newShape = {
        //   id: "point1_3",
        //   Type: 0, // Assuming 0 is the type for this shape, adjust if needed
        //   Color: "black",
        //   x: // Set the x-coordinate for the new shape,
        //   y: // Set the y-coordinate for the new shape,
        //   Title: "Title for the new shape",
        //   width: 1,
        //   height: 1,
        //   fill: "transparent",
        //   connectors: [{ name: "center" }]
        // };
        
        // // Add the new shape to dataShapes
        // dataShapes.push(newShape);

        var dataConnections = [];

        let IncidentNodes = originalData.filter((node) => node.Header == 'Incident');
        let KPINodes = originalData.filter((node) => node.Header == 'KPI');
        let TreatmentNodes = originalData.filter((node) => node.Header == 'Treatment');
        let AuditNodes = originalData.filter((node) => node.Header == 'Audit');
        let HierarchyNodes = originalData.filter((node) => node.Header == 'Hierarchy');
        let AuditRecommendationNodes = originalData.filter((node) => node.Header == 'AuditRecommendation');
        let AuditFindingNodes = originalData.filter((node) => node.Header == 'AuditFinding');
        let PolicyNodes = originalData.filter((node) => node.Header == 'Policy');

        
        var notLinkedControlsTypeTwo: any[] = [];
        var notLinkedControlsTypeThree: any[] = [];


        for (let i = 1; i < originalData.length; i++) {

          if (originalData[i].Title === "Risk Node") {
            dataConnections.push({
              Id: 0,
              FromShapeId: originalData[0].Id,
              ToShapeId: originalData[i].Id,
              Text: null,
              fromConnector: "center",
              toConnector: "bottom"

            });

          }    
          if ((originalData[i].Title === "Cause Node" || originalData[i].Title === "Consequences Node") && originalData[i].ParentNodeId != 0) {
            for (let j = 0; j < originalData[i].LinkedControlIds.length + 1; j++) {
              if (originalData[i].LinkedControlIds.length === 1) {
                dataConnections.push({
                  Id: j,
                  FromShapeId: (j === 0) ? 0 : originalData[i].LinkedControlIds[0],
                  ToShapeId: (j === 0) ? originalData[i].LinkedControlIds[0] : originalData[i].Id,
                  Text: null,
                  fromConnector: (j === 0 && originalData[i].Title === "Cause Node") ? "left" :
                    (j === 0 && originalData[i].Title === "Consequences Node") ? "right" : "auto",
                });
              }
              else if (originalData[i].LinkedControlIds.length > 4) {
                if ((j + 1) % 4 == 0) {
                  dataConnections.push({
                    Id: j,
                    FromShapeId: originalData[i].LinkedControlIds[j],
                    ToShapeId: originalData[i].Id,
                    Text: null,
                    fromConnector: (originalData[i].Title === "Cause Node") ? "left" : "right",
                  });
                }

                dataConnections.push({
                  Id: j,
                  FromShapeId: (j % 4 == 0) ? 0 : originalData[i].LinkedControlIds[j - 1],
                  ToShapeId: (j === originalData[i].LinkedControlIds.length) ? originalData[i].Id : originalData[i].LinkedControlIds[j],
                  Text: null,
                  fromConnector: (originalData[i].Title === "Cause Node") ? "left" : "right",
                });


              }
              else {
                dataConnections.push({
                  Id: j,
                  FromShapeId: (j === 0) ? 0 : originalData[i].LinkedControlIds[j - 1],
                  ToShapeId: (j === originalData[i].LinkedControlIds.length) ? originalData[i].Id : originalData[i].LinkedControlIds[j],
                  Text: null,
                  fromConnector: (originalData[i].Title === "Cause Node") ? "left" : "right",
                });

              }
            }
            
          }
          if ((originalData[i].Title === "Cause Node" || originalData[i].Title === "Consequences Node") && originalData[i].ParentNodeId === 0) {
            dataConnections.push({
              Id: originalData[i].Id,
              FromShapeId: 0,
              ToShapeId: originalData[i].Id,
              Text: null,
              fromConnector: (originalData[i].Title === "Cause Node") ? "left" : "right",
            });
          }
          // Collect all "Control Node" type 2 and 3 elements with IsLinkedToCauseOrConsequence = false
          if (originalData[i].Title === "Control Node" && originalData[i].Type === 2 && !originalData[i].ControlData.IsLinkedToCauseOrConsequence) {
            notLinkedControlsTypeTwo.push(originalData[i]);
          }

          if (originalData[i].Title === "Control Node" && originalData[i].Type === 3 && !originalData[i].ControlData.IsLinkedToCauseOrConsequence) {
            notLinkedControlsTypeThree.push(originalData[i]);
          }
        }
        
      
        // Generate connection lines based on notLinkedControls - type two
        for (let j = 0; j < notLinkedControlsTypeTwo.length; j++) {
          dataConnections.push({
            Id: notLinkedControlsTypeTwo[j].Id, // Assuming you have the correct index or unique identifier for Id
            FromShapeId: (j == 0 || j % 4 == 0) ? 0 : notLinkedControlsTypeTwo[j - 1].Id,
            ToShapeId: notLinkedControlsTypeTwo[j].Id,
            Text: null,
            toConnector: "right",
            fromConnector: "left", // Adjusted to use notLinkedControls[j] instead of originalData[i]
          });
        }
        // Generate connection lines based on notLinkedControls - type three
        for (let j = 0; j < notLinkedControlsTypeThree.length; j++) {
          dataConnections.push({
            Id: notLinkedControlsTypeThree[j].Id, // Assuming you have the correct index or unique identifier for Id
            FromShapeId: (j == 0 || j % 4 == 0) ? 0 : notLinkedControlsTypeThree[j - 1].Id,
            ToShapeId: notLinkedControlsTypeThree[j].Id,
            Text: null,
            toConnector: "left",
            fromConnector: "right", // Adjusted to use notLinkedControls[j] instead of originalData[i]
          });
        }
        //generate connection lines for bottom nodes 
        for (let j = 0; j < IncidentNodes.length; j++) {
          dataConnections.push({
            Id: IncidentNodes[j].Id,
            FromShapeId: (j == 0) ? originalData[0].Id : IncidentNodes[j - 1].Id,
            ToShapeId: IncidentNodes[j].Id,
            Text: null,
            fromConnector: "bottom",
            toConnector: "top"
          });
        }
        for (let j = 0; j < KPINodes.length; j++) {
          dataConnections.push({
            Id: KPINodes[j].Id,
            FromShapeId: (j == 0) ? originalData[0].Id : KPINodes[j - 1].Id,
            ToShapeId: KPINodes[j].Id,
            Text: null,
            fromConnector: "bottom",
            toConnector: "top"
          });
        }
        for (let j = 0; j < TreatmentNodes.length; j++) {
          dataConnections.push({
            Id: TreatmentNodes[j].Id,
            FromShapeId: (j == 0) ? originalData[0].Id : TreatmentNodes[j - 1].Id,
            ToShapeId: TreatmentNodes[j].Id,
            Text: null,
            fromConnector: "bottom",
            toConnector: "top"
          });
        }
        for (let j = 0; j < AuditNodes.length; j++) {
          dataConnections.push({
            Id: AuditNodes[j].Id,
            FromShapeId: (j == 0) ? originalData[0].Id : AuditNodes[j - 1].Id,
            ToShapeId: AuditNodes[j].Id,
            Text: null,
            fromConnector: "bottom",
            toConnector: "top"
          });
        }
        for (let j = 0; j < HierarchyNodes.length; j++) {
          dataConnections.push({
            Id: HierarchyNodes[j].Id,
            FromShapeId: (j == 0) ? originalData[0].Id : HierarchyNodes[j - 1].Id,
            ToShapeId: HierarchyNodes[j].Id,
            Text: null,
            fromConnector: "bottom",
            toConnector: "top"
          });
        }
        for (let j = 0; j < AuditRecommendationNodes.length; j++) {
          dataConnections.push({
            Id: AuditRecommendationNodes[j].Id,
            FromShapeId: (j == 0) ? originalData[0].Id : AuditRecommendationNodes[j - 1].Id,
            ToShapeId: AuditRecommendationNodes[j].Id,
            Text: null,
            fromConnector: "bottom",
            toConnector: "top"
          });
        }
        for (let j = 0; j < AuditFindingNodes.length; j++) {
          dataConnections.push({
            Id: AuditFindingNodes[j].Id,
            FromShapeId: (j == 0) ? originalData[0].Id : AuditFindingNodes[j - 1].Id,
            ToShapeId: AuditFindingNodes[j].Id,
            Text: null,
            fromConnector: "bottom",
            toConnector: "top"
          });
        }
        for (let j = 0; j < PolicyNodes.length; j++) {
          dataConnections.push({
            Id: PolicyNodes[j].Id,
            FromShapeId: (j == 0) ? originalData[0].Id : PolicyNodes[j - 1].Id,
            ToShapeId: PolicyNodes[j].Id,
            Text: null,
            fromConnector: "bottom",
            toConnector: "top"
          });
        }


        console.log("connection data set", dataConnections)



        var initialState = {
          data: dataShapes.slice(),
          connections: dataConnections
        };

   
        
        var kendoDiagram = $('#diagram').kendoDiagram({
          dataSource: {
            data: dataShapes,
            schema: {
              model: {
                id: 'id',
                fields: {
                  id: { from: 'Id', type: 'number', editable: false },
                  Type: { type: 'number' },
                  Color: { type: 'string' },
                },
                isExpanded: isExpanded
              },
            },
            
            change: function (ev) {
              var newData = [];
              var dataSourceData = ev.sender.view().toJSON();

              for (var i = 0; i < dataSourceData.length; i++) {
                var item = dataSourceData[i];
                newData.push({
                  Id: item.id,
                  Type: item.Type,
                  Color: item.Color,
                  x: item.x,
                  y: item.y,
                  Title: item.Title,
                });
              }
              sessionStorage.setItem('shapes', JSON.stringify(newData));
            },
          },
          connectionsDataSource: {
            data: dataConnections,
            schema: {
              model: {
                id: 'id',
                fields: {
                  id: { from: 'Id', type: 'number', editable: false },
                  from: { from: 'FromShapeId', type: 'any' },
                  to: { from: 'ToShapeId', type: 'any' },
                  fromX: { from: 'FromPointX', type: 'any' },
                  fromY: { from: 'FromPointY', type: 'any' },
                  toX: { from: 'ToPointX', type: 'any' },
                  toY: { from: 'ToPointY', type: 'any' },
                },
              },
            },
          },
          change: function (e) {
            // Call the function to update connection colors
            // diagramManager.updateConnectionColors(e.added);

            for (var idx = 0; idx < e.added.length; idx++) {
              if (e.added[idx] instanceof kendo.dataviz.diagram.Connection) {

                e.added[idx].redraw({
                  stroke: {
                    color: "#323250",
                    "shape-rendering": "crispEdges"
                  }
                })
              }
            }
          },

          shapeDefaults: {
            stroke: {
              color: '#00000',
              width: 10,
            },
            connectors: [
              {
                name: "auto",
                width: 0,
                height: 0   
              },
              {
                name: "center",
                width: 0,
                height: 0   
              },
            
              {
                name: "top",
                width: 0,
                height: 0   
              },
              {
                name: "bottom",
                width: 0,
                height: 0, 
              },
              {
                name: "left",
                width: 0,
                height: 0   
              },
              {
                name: "right",
                width: 0,
                height: 0, 
              }],
            visual: function (options) {
              return visualTemplate(options)
            },
          },
          connectionDefaults: {
            stroke: {
              color: '#979797',
              width: 3,
            },
            select: function (e) {
              e.preventDefault(); // Prevent line selection
            },
            content: {
              visible: false, // Hide connection content
            },
          },
          zoom: 0.6,
          zoomRate: 0.02,
          cancel: onCancel,

          layout: false,
          
          click: (e) => diagramManager.onNodeClick(e, clicked, diagram, dataArrayoriginal),
          editable: {
            drag: true,
            tools: [
              {
                template: diagramManager.GetToolbarTemplate()
              }
            ]
          },
          pannable: {
            key: "none", // Use the Ctrl key for panning
            pan: function (e) {
              // Call the function to handle panning
              diagramManager.handlePan(e, this);
            }
          },
       
          //   dataBound: function () {
          //     // Call the function to update diagram dimensions
          //     diagramManager.updateDiagramDimensions(this);
          // }
        });



        
        
        

        var diagram = $("#diagram").getKendoDiagram();
      
       


        var slider = $(".eqSlider").kendoSlider({
          orientation: "vertical",
          min: 0.02,
          max: 2,
          smallStep: 0.01,
          largeStep: 0.02,
          value: 0.5,
          tooltip: {
            enabled: true,
          },
          slide: function (e) {
            diagram.zoom(e.value);
          },
          change: function (e) {
            diagram.zoom(e.value);
          }
        }).data("kendoSlider");

        var sliderHandle = slider.wrapper.find('.k-draghandle');
        sliderHandle.kendoTooltip({
          content: function (e) {
            return slider.value();
          },
          position: 'top',
          animation: false // You can enable animation if needed
        });

        const Riskx = originalData[1].x + 190;
        const Risky = originalData[1].y + 190;

        diagram.wrapper.on("wheel", function (e) {
          e.preventDefault();
          var currentZoom = diagram.zoom();
          var delta = e.originalEvent.deltaY;
          var zoomChange = delta > 0 ? -0.02 : 0.02;
          currentZoom = $("#diagram").data("kendoDiagram").zoom(currentZoom + zoomChange,
            { point: new kendo.dataviz.diagram.Point(Riskx, Risky) });
          // Change the zoom level by the default zoomChange value
          diagram.zoom(currentZoom);

          // Update the zoom slider with the new zoom level
          slider.value(diagram.zoom());
        });

        // Bind the double-click event to the diagram element
        $('#diagram').on('dblclick', function (e) {
          e.preventDefault(); // Prevent the default zoom behavior on double-click
          slider.value(diagram.zoom());          
         
        });

        $(".zoomInIcon").click(function () {

          var currentZoom = diagram.zoom();
          currentZoom = $("#diagram").data("kendoDiagram").zoom(currentZoom + 0.02,
            { point: new kendo.dataviz.diagram.Point(Riskx, Risky) });
          diagram.zoom(currentZoom);
          slider.value(currentZoom);

        });

        $(".zoomOutIcon").click(function () {
          var currentZoom = diagram.zoom();
          currentZoom = $("#diagram").data("kendoDiagram").zoom(currentZoom - 0.02,
            { point: new kendo.dataviz.diagram.Point(Riskx, Risky) });
          diagram.zoom(currentZoom);
          slider.value(currentZoom);
        });


        $(".btn-Export").click(function () {
          var diagram = $("#diagram").getKendoDiagram();
          diagram.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "bow-tie-analysis.pdf"
            });
          });
        });

        function switchView(isExpand) {
           diagramHelper.ArrangeNodes(isExpand);
         
          // // Clear existing diagram
          // diagram.destroy();
      
          // Reset both data source and connections data source
          diagram.setDataSource(initialState.data);

          // Re-add the initial connections using a deep copy
          diagram.setConnectionsDataSource({
            data: JSON.parse(JSON.stringify(initialState.connections)),
            schema: {
              model: {
                id: 'id',
                fields: {
                  id: { from: 'Id', type: 'number', editable: false },
                  from: { from: 'FromShapeId', type: 'number' },
                  to: { from: 'ToShapeId', type: 'number' },
                  fromX: { from: 'FromPointX', type: 'number' },
                  fromY: { from: 'FromPointY', type: 'number' },
                  toX: { from: 'ToPointX', type: 'number' },
                  toY: { from: 'ToPointY', type: 'number' },
                },
              },
            },
          });

            // // Redraw the diagram
            // diagram.redraw();
      }

        $(".bt-Expand").click(function () {
          var diagram = $("#diagram").getKendoDiagram();
          isExpand = !isExpand;

          const expandButton = document.getElementById('btExpandView');
          expandButton.classList.toggle('active', isExpand);

          // Toggle between expand and collapse icons
          const expandIcon = expandButton.querySelector('.expand-icon') as HTMLElement;
          const collapseIcon = expandButton.querySelector('.collapse-icon') as HTMLElement;

          // Toggle between expand and collapse text
          const buttonText = isExpand ? 'Collapse' : 'Expand';
          const textElement = expandButton.querySelector('.text') as HTMLElement;
          if (textElement) {
            textElement.innerText = buttonText;
          }

          // Toggle between hiding and showing icons
          expandIcon.classList.toggle('hide-icon', isExpand);
          collapseIcon.classList.toggle('hide-icon', !isExpand);

          switchView(isExpand);

          diagram.refresh();
        });


        $(".bt-Risk").click(function () {

          if (isKpIview == false) {
            isRiskView = !isRiskView;

            const Riskbutton = document.getElementById('btRiskView');
            Riskbutton.classList.toggle('active', isRiskView);


            var diagram = kendoDiagram.getKendoDiagram();
            var connectionsDataSource = diagram.connectionsDataSource;

            if (isRiskView) {

              const Kpidbutton = document.getElementById('btKpikView');
              Kpidbutton.style.opacity = '0.5';
              // Clear connections that are not linked to nodes with header = riskExpand
              var visibleConnections = diagram.connectionsDataSource
                .data()
                .filter(function (connection) {
                  var fromNode = diagram.dataSource.get(connection.from);
                  var toNode = diagram.dataSource.get(connection.to);
                  return (
                    (fromNode && fromNode.Header === 'LinkedRisk') ||
                    (toNode && toNode.Header === 'LinkedRisk')
                  );
                });

              // Store the original connections before clearing them
              originalConnections = diagram.connectionsDataSource.data().slice();

              // Clear all connections
              connectionsDataSource.data([]);

              // Re-add visible connections
              connectionsDataSource.data(visibleConnections);
            } else {
              const Kpidbutton = document.getElementById('btKpikView');
              Kpidbutton.style.opacity = '1';
              // Re-establish all the original connections
              connectionsDataSource.data(originalConnections);
            }
            diagram.bringIntoView(diagram.shapes);
            diagram.refresh();
          }
        });


        $(".bt-Kpi").click(function () {
          if (isRiskView == false) {
            isKpIview = !isKpIview;

            const Kpidbutton = document.getElementById('btKpikView');
            Kpidbutton.classList.toggle('active', isKpIview);

            var diagram = kendoDiagram.getKendoDiagram();
            var connectionsDataSource = diagram.connectionsDataSource;

            if (isKpIview) {
              const Riskbutton = document.getElementById('btRiskView');
              Riskbutton.style.opacity = '0.5';
              // Clear connections that are not linked to nodes with header = riskExpand
              var visibleConnections = diagram.connectionsDataSource
                .data()
                .filter(function (connection) {
                  var fromNode = diagram.dataSource.get(connection.from);
                  var toNode = diagram.dataSource.get(connection.to);
                  return (
                    (fromNode && fromNode.Header === 'KPI') ||
                    (toNode && toNode.Header === 'KPI')
                  );
                });

              // Store the original connections before clearing them
              originalConnections = diagram.connectionsDataSource
                .data()
                .slice();

              // Clear all connections
              connectionsDataSource.data([]);

              // Re-add visible connections
              connectionsDataSource.data(visibleConnections);
            } else {
              const Riskbutton = document.getElementById('btRiskView');
              Riskbutton.style.opacity = '1';
              // Re-establish all the original connections
              connectionsDataSource.data(originalConnections);
            }

            diagram.bringIntoView(diagram.shapes);
            diagram.refresh();
          }

        });

        $(".bt-Performance").click(function () {
          isPerformanceView = !isPerformanceView;

          const Performancebutton = document.getElementById('btPerformanceView');
          Performancebutton.classList.toggle('active', isPerformanceView);

          var diagram = kendoDiagram.getKendoDiagram();

          diagram.refresh();
        });

        $(".bt-Reload").click(function () {
          // Reset both data source and connections data source
          diagram.setDataSource(initialState.data);

          // Re-add the initial connections using a deep copy
          diagram.setConnectionsDataSource({
            data: JSON.parse(JSON.stringify(initialState.connections)),
            schema: {
              model: {
                id: 'id',
                fields: {
                  id: { from: 'Id', type: 'number', editable: false },
                  from: { from: 'FromShapeId', type: 'number' },
                  to: { from: 'ToShapeId', type: 'number' },
                  fromX: { from: 'FromPointX', type: 'number' },
                  fromY: { from: 'FromPointY', type: 'number' },
                  toX: { from: 'ToPointX', type: 'number' },
                  toY: { from: 'ToPointY', type: 'number' },
                },
              },
            },
          });

          // Hide the back button
          var reloadButton = document.getElementById("btReload");
          reloadButton.style.display = "none";
        });




        var diagram = $('#diagram').getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
        for (var i = 0; i < diagram.shapes.length; i++) {
          diagram.shapes[i].options.stroke.width = 0;
        }
        diagram.refresh();

        // Move the logic that "hides" the templates inside a setTimeout
        setTimeout(() => {
          $(document.body).addClass('hide-control-card-content');
          $(document.body).addClass('hide-cause-card-content');
          $(document.body).addClass('hide-risk-card-content');
          $(document.body).addClass('hide-concequences-card-content');
        }, 2000);
      }
    });





    var dataArrayoriginal = this.originalData;




  }

  // ngOnInit(): void {

  // }




}








