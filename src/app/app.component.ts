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
              "htmlTemplate":"<dev>Failure to appropriately implement business continuity program/policy</dev>",
              "RiskData": {
                "RiskCode":"OR24",
                "ResponsibleManager": "Elizabeth McMahon",
                "Category": "Architecture",
                "ResidualRiskRating":"Moderate",
                "TargetRiskRating": "Moderate",
                "InherentRiskRating": "High",
                "AppetiteRating": "Within Appetite",
                "InherentRiskRatingImg":"",
                "ResidualRiskRatingImg":"",
                "TargetRiskRatingImg":"",
                "AppetiteRatingImg":"",
                "profileImageUrl":""
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
                "ControlOwnerRating":"Largely Ineffective",
                "ControlAuthorizer": "",
                "ControlAuthorizerRating": "",
                "Active": true,
                "IsLinkedToCauseOrConsequence": true,
                "ControlOwnerRatingImage":""
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
              "LinkedControlIds":[19,22]
      
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
                "ControlOwnerRating":"Largely Ineffective",
                "ControlAuthorizer": "",
                "ControlAuthorizerRating": "",
                "Active": true,
                "IsLinkedToCauseOrConsequence": true,
                "ControlOwnerRatingImage":""
              }
        },
        
        {
          "Id": 28,
          "Type": 2,
          "ParentNodeId": 0,
          "Title": "Control Node",
          "Header": "Control",
          "Rating": "",
          "htmlTemplate": "<dev>Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.</dev>",
          "ControlData": {
  
            "ControlTitle": "Audit logs to be enabled and reviewed in order to track and monitor system activities, detect anomalies, and identify potential security breaches.",
            "ControlOwner": "Joe Smith",
            "ControlOwnerRating":"Largely Ineffective",
            "ControlAuthorizer": "",
            "ControlAuthorizerRating": "",
            "Active": true,
            "IsLinkedToCauseOrConsequence": true,
            "ControlOwnerRatingImage":""
          }
    },
     
  
      
       {
              "Id": 16,
              "Type": 2,
              "ParentNodeId": 19,
              "Title": "Cause Node",
              "Header": "Cause",
              "Rating": "",
              "htmlTemplate": "<dev>InsufficientITsecuritymanagement</dev>",
              "LinkedControlIds":[22,28]
      
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
                "ControlOwnerRating":"Partially Effective",
                "ControlAuthorizer": "",
                "ControlAuthorizerRating": "",
                "Active": true,
                "IsLinkedToCauseOrConsequence": false,
                "ControlOwnerRatingImage":""
                
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
          "LinkedControlIds":[3]

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
      
                "ControlTitle":"Mechanisms exist to develop a security Concept of Operations (CONOPS), or a similarly-defined plan with the vendor",
                "ControlOwner":"Andrew James",
                "ControlOwnerRating":"Substantially Effective",
                "ControlAuthorizer": "",
                "ControlAuthorizerRating": "",
                "Active": true,
                "IsLinkedToCauseOrConsequence": false,
                "ControlOwnerRatingImage":""
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
          "LinkedControlIds":[]

        },
        
          
         
        {
              "Id": 201,
              "Type": 4,
              "ParentNodeId": 0,
              "Title": "Other Node",
              "Header": "Incident",
              "Rating": "",
              "htmlTemplate":"<dev>Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32) 1</dev>",
              "IncidentData": {
                "LinkageId": 1217,
                "IncidentId": 201,
                "IncidentTitle": "Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32)",
                "IncidentCode": "IMS - 1",
                "IncidentType": "IT Incident",
                "ReportedDate": "Jul 14 2022  2:49PM",
                "ResponsiblePerson": "Madeline Jones",
                "ImageType": "",
                "ByteImage":"",
                "ResponsibleManagerProfilePic":""
              }
            },
            {
              "Id": 202,
              "Type": 4,
              "ParentNodeId": 0,
              "Title": "Other Node",
              "Header": "Incident",
              "Rating": "",
              "htmlTemplate":"<dev>Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32) 2</dev>",
              "IncidentData": {
                "LinkageId": 1217,
                "IncidentId": 201,
                "IncidentTitle": "Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32)",
                "IncidentCode": "IMS - 1",
                "IncidentType": "IT Incident",
                "ReportedDate": "Jul 14 2022  2:49PM",
                "ResponsiblePerson": "Madeline Jones",
                "ImageType": "",
                "ByteImage":"",
                "ResponsibleManagerProfilePic":""
              }
            },

            {
              "Id": 203,
              "Type": 4,
              "ParentNodeId": 0,
              "Title": "Other Node",
              "Header": "Incident",
              "Rating": "",
              "htmlTemplate":"<dev>Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32) 3</dev>",
              "IncidentData": {
                "LinkageId": 1217,
                "IncidentId": 201,
                "IncidentTitle": "Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32)",
                "IncidentCode": "IMS - 1",
                "IncidentType": "IT Incident",
                "ReportedDate": "Jul 14 2022  2:49PM",
                "ResponsiblePerson": "Madeline Jones",
                "ImageType": "",
                "ByteImage":"",
                "ResponsibleManagerProfilePic":""
              }
            },
            {
              "Id": 204,
              "Type": 4,
              "ParentNodeId": 0,
              "Title": "Other Node",
              "Header": "Incident",
              "Rating": "",
              "htmlTemplate":"<dev>Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32) 4</dev>",
              "IncidentData": {
                "LinkageId": 1217,
                "IncidentId": 201,
                "IncidentTitle": "Birthday attacks against TLS ciphers with 64bit block size vulnerability (Sweet32)",
                "IncidentCode": "IMS - 1",
                "IncidentType": "IT Incident",
                "ReportedDate": "Jul 14 2022  2:49PM",
                "ResponsiblePerson": "Madeline Jones",
                "ImageType": "",
                "ByteImage":"",
                "ResponsibleManagerProfilePic":""
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
              "KPIData":{
                "RiskLinkId":2078,
                "KpiIntId":12,
                "KpiGuidId":"543baf2f-14ea-478e-966a-fb16c4c574a1",
                "KPITitle":"% reduction in non-clinically indicated surgery",
                "Unit":"#",
                "ReportingPeriod":"Month",
                "Actual":21,
                "Target":20,
                "PerformanceImg":"Monitor",
                "TrendImg":"Not Applicable",
                "Performance":""
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
              "KPIData":{
                "RiskLinkId":2078,
                "KpiIntId":12,
                "KpiGuidId":"543baf2f-14ea-478e-966a-fb16c4c574a1",
                "KPITitle":"% reduction in non-clinically indicated surgery",
                "Unit":"%",
                "ReportingPeriod":"Month",
                "Actual":21,
                "Target":20,
                "PerformanceImg":"Monitor",
                "TrendImg":"Not Applicable",
                "Performance":""
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
        riskActionTemplateExpand: "",
        complianceTemplateExpnad: "",
        authorityDocumentTemplateExpnad: "",
        auditTemplateExpnad: ""
      }

      var renderElement = $("<div style='display:inline-block' />").appendTo('body');

      if (clicked) {
        Templates.RecreateNodesToCentralizedNode(dataItem, templatesObj, isExpand, isPerformanceView, renderElement);

      }
      else {
        Templates.AddTemplatesToNode(dataItem, templatesObj, isExpand, isPerformanceView, isKpIview, isRiskView, renderElement);
      }
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

      var detailTemp =
        '<div>' +
        "<h3 class='centre'>Selected Node Details</h3>" +
        "<div class='k-edit-label'>" +
        '<p> Details of the selected node can show here...... </p>' +
        '</div>' +
        '</div> ';

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
      //             color = '#faab2c';
      //             console.log("coloro",color);
      //         } else if (originalData[i].Title == "Cause Node" || originalData[i].Title == "Consequences Node") {
      //             color = '#40b86e';
      //             console.log("colorcc",color);
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
      
      
         
      


        for (let i = 1; i < originalData.length; i++) {

          if (originalData[i].Title == "Other Node") {
          
            var conObj = {
              Id: originalData[i].Type === i,
              FromShapeId: originalData[i].ParentNodeId,
              ToShapeId: originalData[i].Id,
              Text: null,
              color: "1"
              
            };
            dataConnections.push(conObj);
          }

          if ((originalData[i].Title == "Cause Node" || originalData[i].Title == "Consequences Node")
          && originalData[i].ParentNodeId != 0) {
            for (let j = 0; j < originalData[i].LinkedControlIds.length; j++) {
              var conObj1 = {
                Id: j,
                FromShapeId: originalData[i].LinkedControlIds[j],
                ToShapeId: originalData[i].Id,
                Text: null,
                color: "2"
               
              };
              dataConnections.push(conObj1);
            }
          }

          if ((originalData[i].Title == "Cause Node" || originalData[i].Title == "Consequences Node")
            && originalData[i].ParentNodeId == 0) {

            var conObj2 = {
              Id: i,
              FromShapeId: 0,
              ToShapeId: originalData[i].Id,
              Text: null,
              color: "3"
              
            };
            dataConnections.push(conObj2);
          }

          if (originalData[i].Title == "Control Node") {
            var conObj3 = {
              Id: i,
              FromShapeId: 0,
              ToShapeId: originalData[i].Id,
              Text: null,
              color: "4"
             
            };
            dataConnections.push(conObj3);
          }
        }



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
                        
                        <span>Expand</span>                      
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
      ]})
  
    
      
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
                isExpanded:isExpanded
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
            var connColor;
            for (var idx = 0; idx < e.added.length; idx++) {
              if (e.added[idx] instanceof kendo.dataviz.diagram.Connection) {
                switch (e.added[idx].dataItem.color) {
                  case "1":
                    connColor = "#979797"; // Red
                    break;
                  case "2":
                    connColor = "#00ff00"; // Green
                    break;
                  case "3":
                    connColor = "#009dd0"; // lightBlue
                    break;
                  case "4":
                    connColor = "#0050a0"; // darkBlue
                  break;
                  default:
                    connColor = "#979797"; // Default color
                }
                e.added[idx].redraw({
                  stroke: {
                    color: connColor
                  }
                });
              }
            }
          },
          
          shapeDefaults: {
            stroke: {
              color: '#979797',
              width: 10,
            },
            visual: function(options){
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
          click: onNodeClick,
          editable: true,
          dataBound: function () {
            // Calculate the available screen width and height
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();
        
            // Calculate a reasonable diagram size based on screen dimensions
            var diagramWidth = Math.min(screenWidth ); // Adjust the 100 as needed
            var diagramHeight = Math.min(screenHeight + 100); // Adjust the 100 as needed
        
            // Update the diagram's dimensions
            this.wrapper.width(diagramWidth);
            this.wrapper.height(diagramHeight);
            this.resize();
          }
          

        });

        // Get the button element and attach the click event listener

       

        $(".zoomInIcon").click(function () {
          var currentZoom = diagram.zoom();
          currentZoom += 0.02; 
          diagram.zoom(currentZoom); 
        });
        
        $(".zoomOutIcon").click(function () {
          var currentZoom = diagram.zoom();
          currentZoom -= 0.02; 
          diagram.zoom(currentZoom); 
        });
        

        $(".slider").kendoSlider({
          min: 0.02, // Minimum zoom level
          max: 2,   // Maximum zoom level
          smallStep: 0.01, // Small zoom increment
          largeStep: 0.02, // Large zoom increment
          value: 0.5,  // Initial zoom level
          tooltip: {
                enabled: true,                
              }, 
          slide: function(e) {
            var zoomLevel = e.value;
            var diagram = $("#diagram").getKendoDiagram();
            diagram.zoom(zoomLevel);
        }
        });


        $(".btn-Export").click(function() {
          var diagram = $("#diagram").getKendoDiagram();
          diagram.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function(data) {
              kendo.saveAs({
                  dataURI: data,
                  fileName: "bow-tie-analysis.pdf"
              });
          });
        });

        $(".bt-Expand").click(function() {
         ;
          var diagram = $("#diagram").getKendoDiagram();
          isExpand = !isExpand;

          const Expandbutton = document.getElementById('btExpandView');
          Expandbutton.classList.toggle('active', isExpand);         
          diagram.refresh();

        });


        $(".bt-Risk").click(function() {
         
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


        $(".bt-Kpi").click(function() {
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

        $(".bt-Performance").click(function() {
          isPerformanceView = !isPerformanceView;

          const Performancebutton = document.getElementById('btPerformanceView');
          Performancebutton.classList.toggle('active', isPerformanceView);

          var diagram = kendoDiagram.getKendoDiagram();
        
          diagram.refresh();
        });

        $(".bt-Reload").click(function(e) {
          var diagram = $('#diagram').getKendoDiagram();
          e.sender.setDataSource(dataShapes);
          e.sender.setConnectionsDataSource(dataConnections);
          diagram.refresh();
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



    function onNodeClick(e) {

      if (e.item.dataItem.Header == "Control" || e.item.dataItem.Header == "Compliance" || e.item.dataItem.Header == "Authority Document") {
        var clickedNodeId = e.item.dataItem.id;
        clicked = true;
        var diagram = $('#diagram').getKendoDiagram();
        var dataArray = diagram.dataSource.data();
        var linkedNodesToClickedNode = [];


        var reloadButton = document.getElementById("btReload");
        if (clicked) {
          reloadButton.style.display = "flex"; // Show the button
        } else {
          reloadButton.style.display = "none"; // Hide the button
        }

        //create linkedNodesToClickedNode array to recreate the datasource
        if (clicked) {

          //push clicked node to the array 
          linkedNodesToClickedNode.push(e.item.dataItem);
          for (var i = 0; i < dataArray.length; i++) {
            var node = dataArray[i];
            var nodes = dataArrayoriginal[i];

            // push nodes that are linked to clicked node
            if (Array.isArray(nodes.LinkedControlIds) && nodes.LinkedControlIds.includes(clickedNodeId) || nodes.Header == "Risk") {
              linkedNodesToClickedNode.push(node);
            }
          }
        }

        //update node placing
        const originX = 0;
        const originY = 0;
        const horizontalSpacing = 720;
        let riskRowNumber = 0;
        let riskColumnNumber = 1;      
        let causeConsequenceColumnNumber = 0;       
        let otherNodesColumnNumber = 0;
        let verticalSpacing = 520;
        var centralizedRiskNodes = []
        e.item.dataItem.x = 0;
        e.item.dataItem.y = 0;
        for (let i = 1; i < linkedNodesToClickedNode.length; i++) {
          
         
          if (linkedNodesToClickedNode[i].Header == "Risk") {
            linkedNodesToClickedNode[i].x = originX + riskColumnNumber * horizontalSpacing;
            linkedNodesToClickedNode[i].y = originY - riskRowNumber * verticalSpacing;
            riskColumnNumber++;
            centralizedRiskNodes.push(linkedNodesToClickedNode[i]);
            console.log(centralizedRiskNodes);
            var riskArrayLength = centralizedRiskNodes.length - 1;
          }
          
          //causes and consequences placed left bottom to the clicked node
          else if (linkedNodesToClickedNode[i].Header == "Cause" || linkedNodesToClickedNode[i].Header == "Consequence") {
            let causeConsequenceRowNumber = centralizedRiskNodes[riskArrayLength].y + 1;
         
          //risk place left to clicked node
            linkedNodesToClickedNode[i].x = originX - causeConsequenceColumnNumber * horizontalSpacing;
            linkedNodesToClickedNode[i].y = originY + causeConsequenceRowNumber * verticalSpacing;
            causeConsequenceColumnNumber++;
            if (causeConsequenceColumnNumber > 4) {
              causeConsequenceRowNumber++;
            }
           
            console.log(causeConsequenceRowNumber);

          }
          //all other nodes that linked to control placed right bottom of the clicked node
          else {
            let otherNodesRowNumber = centralizedRiskNodes[riskArrayLength].y + 1;
            linkedNodesToClickedNode[i].x = originX + otherNodesColumnNumber * horizontalSpacing;
            linkedNodesToClickedNode[i].y = originY + otherNodesRowNumber * verticalSpacing;
            otherNodesColumnNumber++;
            if (otherNodesColumnNumber > 4) {
              otherNodesRowNumber++;
            }

          }

          if (riskColumnNumber > 4) {
            riskRowNumber++;
          }
          
         

        }
        console.log(linkedNodesToClickedNode);

        //rectreate the connection source
        var connectionsDataSource = {
          data: []
        };

        for (let i = 1; i < linkedNodesToClickedNode.length; i++) {
          var conObj = {

            from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };

          connectionsDataSource.data.push(conObj);
        }



        // ReSet the data source and connections data source
        e.sender.setDataSource(linkedNodesToClickedNode);
        e.sender.setConnectionsDataSource(connectionsDataSource);


        diagram.refresh();

      }
      return linkedNodesToClickedNode;
    }

  }
  
  // ngOnInit(): void {

  // }


   

}

   
   

  

  

   