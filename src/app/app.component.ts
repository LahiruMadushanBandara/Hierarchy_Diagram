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
        "Id": 0,
        "Type": 1,
        "ParentNodeId": 0,
        "Title": "Risk Node",
        "Header": "Risk",
        "Rating": "",
        "htmlTemplate": "<dev>Failure to appropriately implement business continuity program/policy</dev>",
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
          "profileImageUrl": ""
        }
      },



      {
        "Id": 19,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 129,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 130,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 131,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 23,
        "Type": 2,
        "ParentNodeId": 19,
        "Title": "Cause Node",
        "Header": "Cause",
        "Rating": "",
        "htmlTemplate": "<dev>ReducedenterpriseITsupport</dev>",
        "LinkedControlIds": [19, 22, 129, 130, 131]

      },
      {
        "Id": 22,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 26,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 24,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 25,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 16,
        "Type": 2,
        "ParentNodeId": 19,
        "Title": "Cause Node",
        "Header": "Cause",
        "Rating": "",
        "htmlTemplate": "<dev>22InsufficientITsecuritymanagement</dev>",
        "LinkedControlIds": [22, 24, 25, 26]

      },

      {
        "Id": 28,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>22Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 29,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>222Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 30,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 330,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 331,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 332,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 333,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 334,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 335,
        "Type": 2,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
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
        "Id": 3,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Prioritize critical business functions</dev>",
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
        "Id": 33,
        "Type": 3,
        "ParentNodeId": 3,
        "Title": "Consequences Node",
        "Header": "Consequence",
        "Rating": "",
        "htmlTemplate": "Reduced enter#prise IT support#",
        "LinkedControlIds": [3]

      },

      {
        "Id": 500,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Mechanisms exist to develop a security Concept of Operations (CONOPS), or a similarly-defined plan with the vendor</dev>",
        "ControlData": {

          "ControlTitle": "Mechanisms exist to develop a security Concept of Operations (CONOPS), or a similarly-defined plan with the vendor",
          "ControlOwner": "Andrew James",
          "ControlOwnerRating": "Substantially Effective",
          "ControlAuthorizer": "",
          "ControlAuthorizerRating": "",
          "Active": true,
          "IsLinkedToCauseOrConsequence": false,
          "ControlOwnerRatingImage": ""
        }
      },



      {
        "Id": 81,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Consequences Node",
        "Header": "Consequence",
        "Rating": "",
        "htmlTemplate": "<dev>ReducedenterpriseITsupport</dev>",
        "LinkedControlIds": []

      },
      {
        "Id": 6,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Prioritize critical business functions</dev>",
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
        "Id": 7,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Prioritize critical business functions</dev>",
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
        "Id": 8,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Prioritize critical business functions</dev>",
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
        "Id": 5,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Prioritize critical business functions</dev>",
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
        "Id": 9,
        "Type": 3,
        "ParentNodeId": 0,
        "Title": "Control Node",
        "Header": "Control",
        "Rating": "",
        "htmlTemplate": "<dev>Prioritize critical business functions</dev>",
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
        "Id": 201,
        "Type": 4,
        "ParentNodeId": 0,
        "Title": "Other Node",
        "Header": "Incident",
        "Rating": "",
        "htmlTemplate": "<dev>Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32) 1</dev>",
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
        "Id": 202,
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
        "Id": 203,
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
        "Id": 182,
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
        "Id": 183,
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
        "Id": 185,
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


    ]

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
      var dataItem = options.dataItem;
      tempTitleDetail = dataItem.Title;

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
        treatmentTemplate: ""
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


      var visual = new kendo.dataviz.diagram.Group();
      visual.drawingElement.append(output);

      return visual;
    }

    var diagramHelper = new BowTieDiagramHelper();
    const arrangedData = diagramHelper.ArrangeNodes(this.originalData, isExpand);
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


        //creating connection lines
        var dataConnections = [];


        //   function connectionLineColor() {
        //     const colors = [];
        //     let color;
        //     for (let i = 1; i < originalData.length; i++) {


        //         if (originalData[i].Title == "Other Node") {
        //             // color = '#faab2c';
        //             // console.log("coloro",color);
        //         } else if (originalData[i].Title == "Cause Node" || originalData[i].Title == "Consequences Node") {
        //             // color = '#40b86e';
        //             // console.log("colorcc",color);
        //         } else if (originalData[i].Title == "Control Node") {
        //             color = '#e54257';
        //             console.log("colorc",color);
        //         } else {
        //             // Default color if no conditions are met
        //             color = '#000000';
        //             console.log("colord",color);
        //         }


        //     }
        //     console.log("colorall",color);
        //     return (color);
        // } 


        //        Define a function to get the connector type based on the node type

        // function getConnectorType(nodeType) {
        //   switch (nodeType) {
        //     case "Cause Node":
        //       return "top";
        //     case "Consequences Node":
        //       return "top";
        //     case "Control Node":
        //       return "auto";
        //     case "Risk Node":
        //       return "bottomRight";
        //     case "Other Node":
        //       return "bottom";
        //     default:
        //       return "auto"; // Default to top connector for Other Node
        //   }
        // }

        // Iterate through originalData and create connection objects
        for (let i = 1; i < originalData.length; i++) {

          if (originalData[i].Title == "Other Node") {
            // Get connector type for the current node
            // const fromConnector = getConnectorType(originalData[i].Title);
            // Create connection object
            var conObj = {
              Id: i,
              FromShapeId: originalData[i].ParentNodeId,
              ToShapeId: originalData[i].Id,
              Text: null,
              color: "1",

              // toConnector:"auto",

            };

            // Add the connection object to dataConnections array
            dataConnections.push(conObj);
          }

          if ((originalData[i].Title == "Cause Node" || originalData[i].Title == "Consequences Node")
            && originalData[i].ParentNodeId != 0) {
            for (let j = 0; j < originalData[i].LinkedControlIds.length; j++) {
              // Get connector type for the current node
              // const fromConnector = getConnectorType(originalData[i].Title);

              // Create connection object
              var conObj1 = {
                Id: j,
                FromShapeId: originalData[i].LinkedControlIds[j],
                ToShapeId: originalData[i].Id,
                Text: null,
                color: "2",
                fromConnector: "auto",


              };

              // Add the connection object to dataConnections array
              dataConnections.push(conObj1);
            }
          }

          if ((originalData[i].Title == "Cause Node" || originalData[i].Title == "Consequences Node")
            && originalData[i].ParentNodeId == 0) {
            // Get connector type for the current node
            // const fromConnector = getConnectorType(originalData[i].Title);

            // Create connection object
            var conObj2 = {
              Id: i,
              FromShapeId: 0,
              ToShapeId: originalData[i].Id,
              Text: null,
              color: "3",
              fromConnector: "auto",
              toConnector: "top"

            };

            // Add the connection object to dataConnections array
            dataConnections.push(conObj2);
          }

          if (originalData[i].Title == "Control Node") {
            // Get connector type for the current node
            // const fromConnector = getConnectorType(originalData[i].Title);
            // let controlNodeNotIncluded = true;
            // // Create connection object


            if (originalData[i].ControlData.IsLinkedToCauseOrConsequence) {
              console.log(originalData[i].Id)
              // Create connection object
              var conObj3 = {
                Id: i,
                FromShapeId: 0,
                ToShapeId: originalData[i].Id,
                Text: null,
                color: "4",
                fromConnector: "auto",
                toConnector: "auto"
              };

              dataConnections.push(conObj3);

            }
            else {
              var conObj3 = {
                Id: i,
                FromShapeId: 0,
                ToShapeId: originalData[i].Id,
                Text: null,
                color: "4",
                fromConnector: "auto",
                toConnector: "bottom"
              };
              dataConnections.push(conObj3);
            }






          }

        }

        var initialState = {
          data: dataShapes.slice(),
          connections: dataConnections
        };

      


        $("#toolbar").kendoToolBar({
          items: [
            {
              template: `

              <div>
                <h3  class="bt-analsys-header-txt">Bow Tie Analysis</h3>

                <div class="k-actions btn-row-bottom k-actions-end align-items-start button-flex">  

                    <div kendoTooltip position="bottom" [title]="'zoom'" class="zoom">
                      <span class="zoomIcon zoomOutIcon" id="zoomOut"></span>
                      <div  class='slider'></div>
                      <span class="zoomIcon zoomInIcon" id="zoomIn"></span>
                    </div>

                    <div kendoTooltip position="bottom" [title]="'Back'">
                    <button type="button" class="bt-Reload btn bow-tie-btn-outline-primary" id="btReload"  style="display: none;">
                      <span>Back</span>
                    </button>
                    </div>

                    <div kendoTooltip position="bottom" [title]="'Risk View'">
                        <button type="button" class="bt-Risk btn bow-tie-btn-outline-primary" id="btRiskView" >
                          <span>Risk View</span>
                        </button>
                    </div>

                    <div kendoTooltip position="bottom" [title]="'Kpi View'">
                        <button type="button" class="bt-Kpi btn bow-tie-btn-outline-primary" id="btKpikView" >
                            <span>Kpi View</span>
                        </button>
                    </div>

                    <div kendoTooltip position="bottom" [title]="'Performance View'">
                      <button type="button" class="bt-Performance btn bow-tie-btn-outline-primary" id="btPerformanceView" >
                          <span>Performance View</span>
                      </button>
                    </div>

                    <div kendoTooltip position="bottom" [title]="'Expand Nodes'">
                        <button type="button" class="bt-Expand btn bow-tie-btn-outline-primary" id="btExpandView">
                            <span class="expand-icon"></span>
                            <span class="collapse-icon hide-icon"></span>
                            <span class="text">Expand</span>                      
                        </button>
                    </div>
                    

                    <div kendoTooltip position="bottom" [title]="'Export Diagram'">
                      <button type="button" class="btn-Export btn bow-tie-btn-outline-primary" id="btExport" >
                          <i class="cam-icon cam-i-export" aria-hidden="true"></i>
                          <span>Export</span>
                      </button>
                    </div>
                </div>                  
            </div>        
                `
            },
          ]
        })



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
                  from: { from: 'FromShapeId', type: 'number' },
                  to: { from: 'ToShapeId', type: 'number' },
                  fromX: { from: 'FromPointX', type: 'number' },
                  fromY: { from: 'FromPointY', type: 'number' },
                  toX: { from: 'ToPointX', type: 'number' },
                  toY: { from: 'ToPointY', type: 'number' },
                },
              },
            },
          },
          change: function (e) {    
            // Call the function to update connection colors
            diagramManager.updateConnectionColors(e.added);
        },

          shapeDefaults: {
            stroke: {
              color: '#979797',
              width: 10,
            },
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
          zoom: 0.3,
          zoomRate: 0.02,
          cancel: onCancel,

          layout: false,
          click: (e) => diagramManager.onNodeClick(e , clicked , diagram , dataArrayoriginal),
          editable: true,
          pannable: {
            key: "none", // Use the Ctrl key for panning
            pan: function (e) {
                // Call the function to handle panning
                diagramManager.handlePan(e, this);
            }
        },
        dataBound: function () {
          // Call the function to update diagram dimensions
          diagramManager.updateDiagramDimensions(this);
      }
        });
       

        var diagram = $("#diagram").getKendoDiagram();
        
        var slider = $(".slider").kendoSlider({
          min: 0.02,
          max: 2,
          smallStep: 0.01,
          largeStep: 0.02,
          value: 0.3,
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

        diagram.wrapper.on("wheel", function (e) {
          e.preventDefault();

          var delta = e.originalEvent.deltaY;
          var zoomChange = delta > 0 ? -0.02 : 0.02;

          // Change the zoom level by the default zoomChange value
          diagram.zoom(diagram.zoom() + zoomChange);

          // Update the zoom slider with the new zoom level
          slider.value(diagram.zoom());
        });


        $(".zoomInIcon").click(function () {
          var currentZoom = diagram.zoom();
          currentZoom += 0.02;
          diagram.zoom(currentZoom);
          slider.value(currentZoom);
        });

        $(".zoomOutIcon").click(function () {
          var currentZoom = diagram.zoom();
          currentZoom -= 0.02;
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








