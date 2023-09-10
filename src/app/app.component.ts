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
import { data } from './models/data.model';
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
  @Input() bowTieNodeDetails: data[] = [];

  riskTemplate: string = '';
  controlTemplate: string = '';
  causeTemplate: string = '';
  consequencesTemplate: string = '';
  otherTemplate: string = '';
  originalData:data[] =[];

  @Input() IsExpanded:boolean = false;
  
  constructor(private eleRef:ElementRef) {}

  ngAfterViewInit(): void {}

  ngOnChanges(change: SimpleChanges): void {

    let elrf = this.eleRef.nativeElement
    sessionStorage.clear();

 

    // !change?.['getfilterCriteriaEvent']?.currentValue !==
    // !change?.['getfilterCriteriaEvent']?.previousValue
    // var tem = new TemplateClass();
    // this.originalData = tem.NodeSampleData;

    this.originalData = this.bowTieNodeDetails;
    
    var tempTitleDetail = '';
    let isRiskView = false;
    let isKpIview = false;
    let isPerformanceView = false;
    let isExpand = false;
  
    var originalConnections; // Variable to store the original connections

    // Import the Drawing API namespaces.
    var draw = kendo.drawing;
    
    function visualTemplate(options: any) {
     
      
      var Templates = new TemplateClass();
      var dataItem = options.dataItem;
      tempTitleDetail = dataItem.Title;

      var templatesObj = 
      {
        riskTemplate : "",
        controlTemplate : "",
        controlTemplateExpand :"",
        causeTemplate : "",
        consequencesTemplate : "",
        incidentTemplateExpnad: "",
        kpiTemplateExpnad : "",
        bottomTemplate : "",
        linkRiskTemplate : "",
        riskActionTemplateExpand : "",
        complianceTemplateExpnad : ""
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
    const arrangedData = diagramHelper.ArrangeNodes(this.originalData);
    arrangedData.map((node) => ({ Id: node.Id, x: node.x, y: node.y }));

    
    $(()=> {
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

      function createDiagram(originalData:any[], isExpanded:boolean) {
    
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

        for (let i = 1; i < originalData.length; i++) {
          if (originalData[i].Title == "Other Node") {
            var conObj = {
              Id: originalData[i].Type === 4 ? 0 : i,
              FromShapeId: originalData[i].ParentNodeId,
              ToShapeId: originalData[i].Id,
              Text: null,

            };
            dataConnections.push(conObj);
          }

          if (originalData[i].Title == "Cause Node" || originalData[i].Title == "Consequences Node") {
            for (let j = 0; j < originalData[i].LinkedControlIds.length; j++) {
              var conObj2 = {
                Id: j,
                FromShapeId: originalData[i].LinkedControlIds[j],
                ToShapeId: originalData[i].Id,
                Text: null
              };
              dataConnections.push(conObj2);
            }
          }

          if (originalData[i].Title == "Control Node") {
            var conObj1 = {
              Id: i,
              FromShapeId: 0,
              ToShapeId: originalData[i].Id,
              Text: null
            };
            dataConnections.push(conObj1);
          }
        }
        








        function toggleExpand() {
          isExpand = !isExpand;

          const Expandbutton = document.getElementById('btExpandView');
          Expandbutton.classList.toggle('active', isExpand);

        
          
          var diagram = kendoDiagram.getKendoDiagram();
          diagram.bringIntoView(diagram.shapes);
          diagram.refresh();
        }


        function toggleRiskview() {
          if (isKpIview == false) {
            isRiskView = !isRiskView;
              
            const Riskbutton = document.getElementById('btRiskView');
            Riskbutton.classList.toggle('active', isRiskView);


            var diagram = kendoDiagram.getKendoDiagram();
            var connectionsDataSource = diagram.connectionsDataSource;

            if (isRiskView) {
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
              // Re-establish all the original connections
              connectionsDataSource.data(originalConnections);
            }
            diagram.bringIntoView(diagram.shapes);
            diagram.refresh();
          }
        }

        function toggleKPIview() {
          if (isRiskView == false) {
            isKpIview = !isKpIview;
            
            const Kpidbutton = document.getElementById('btKpikView');
            Kpidbutton.classList.toggle('active', isKpIview);
          
            var diagram = kendoDiagram.getKendoDiagram();
            var connectionsDataSource = diagram.connectionsDataSource;

            if (isKpIview) {
              // Clear connections that are not linked to nodes with header = riskExpand
              var visibleConnections = diagram.connectionsDataSource
                .data()
                .filter(function (connection) {
                  var fromNode = diagram.dataSource.get(connection.from);
                  var toNode = diagram.dataSource.get(connection.to);
                  return (
                    (fromNode && fromNode.Header === 'Kpi') ||
                    (toNode && toNode.Header === 'Kpi')
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
              // Re-establish all the original connections
              connectionsDataSource.data(originalConnections);
            }

            diagram.bringIntoView(diagram.shapes);
            diagram.refresh();
          }
        }

        function togglePerformanceview() {
          isPerformanceView = !isPerformanceView;

          const Performancebutton = document.getElementById('btPerformanceView');
          Performancebutton.classList.toggle('active', isPerformanceView);
              
          var diagram = kendoDiagram.getKendoDiagram();
          diagram.bringIntoView(diagram.shapes);
          diagram.refresh();
        }

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

          editable: {
            shapeTemplate: detailTemp,
            tools: [
              {
                template: `
                <div class="k-toolbar-container">
                  <div style="" class="k-actions btn-row-bottom k-actions-end align-items-end">
                    <h3 style="font-size: 20px; margin-bottom: 10px;  margin-left:10px;" class="bt-analsys-header-txt">Bow Tie Analysis</h3>
                
                  <div style=" margin-left:100px;" class="k-actions btn-row-bottom k-actions-end align-items-end">
                    <div
                                  kendoTooltip
                                  position="bottom"
                                  [title]="'Risk View'"
                              >
                                  <button
                                      type="button"
                                      class="bt-Risk btn img-btn-outline-primary"
                                      id="btRiskView"
                                      onClick="toggleRiskview()"
                                  >
                                      <span>Risk View</span>
                                  </button>
                    </div>
                    <div
                                  kendoTooltip
                                  position="bottom"
                                  [title]="'Kpi View'"
                              >
                                  <button
                                      type="button"
                                      class="bt-Kpi btn img-btn-outline-primary"
                                      id="btKpikView"
                                      onClick="toggleKPIview()"
                                  >
                                      <span>Kpi View</span>
                                  </button>
                   </div>
                    <div
                                  kendoTooltip
                                  position="bottom"
                                  [title]="'Performance View'"
                              >
                                  <button
                                      type="button"
                                      class="bt-Performance btn img-btn-outline-primary"
                                      id="btPerformanceView"
                                      onClick="togglePerformanceview()"
                                  >
                                      <span>Performance View</span>
                                  </button>
                    </div>
                  </div> 
                   <div style=" margin-left: 600px;" class="k-actions btn-row-bottom k-actions-end align-items-end">
                      <div
                                    kendoTooltip
                                    position="bottom"
                                    [title]="'Expand Nodes'"
                                >
                                    <button
                                        type="button"
                                        class="bt-Expand btn img-btn-outline-primary"
                                        id="btExpandView"
                                        onClick="toggleExpand()"
                                    >
                                        <span>Expand</span>
                                    </button>
                                
                      </div>
                      <div
                                    kendoTooltip
                                    position="bottom"
                                    [title]="'Export Diagram'"
                                >
                                    <button
                                        type="button"
                                        class="btn img-btn-outline-primary"
                                        id="btExport"
                                    >
                                        <i
                                            class="cam-icon cam-i-export"
                                            aria-hidden="true"
                                        ></i>
                                        <span>Export</span>
                                    </button>
                      </div>
                   </div>
                  </div>
                </div>
                  <style>
                    .k-toolbar
                    {
                      border-top: none !important;
                      border-left: none !important;
                      border-right: none !important;
                      border-bottom: inset !important;
                      border-bottom-width: 2px !important;
                     
                    }

                    .k-toolbar-container {
                      position: fixed;
                      margin-top: -23px;
                      background-color: white;
                      z-index: 999;
                      /* Add any other styles you need */
                    }
                    

                    .bt-Expand.active 
                    {
                        background-color:   hwb(223 55% 8%);
                        color: rgb(255, 255, 255) !important;
                        
                    }
                    .bt-Risk.active 
                    {
                        background-color:   hwb(223 55% 8%);
                        color: rgb(255, 255, 255) !important;
                    }
                    .bt-Kpi.active 
                    {
                        background-color:   hwb(223 55% 8%);
                        color: rgb(255, 255, 255) !important;

                    }
                    .bt-Performance.active 
                    {
                        background-color:   hwb(223 55% 8%);
                        color: rgb(255, 255, 255) !important;
                    }
               
                </style>
                `,
                enable: true,
                
              }
            ]
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
              width: 2,
            },
            select: function (e) {
              e.preventDefault(); // Prevent line selection
            },
            content: {
              visible: false, // Hide connection content
            },
          },
          zoom: 0.4,
          cancel: onCancel,
        });


        
      // Get the button element and attach the click event listener
              
        var buttonExpand = document.getElementById('btExpandView');        
        buttonExpand.addEventListener('click', toggleExpand);

        var buttonRisk = document.getElementById('btRiskView');        
        buttonRisk.addEventListener('click', toggleRiskview);

        var buttonKpi= document.getElementById('btKpikView');        
        buttonKpi.addEventListener('click', toggleKPIview);

        var buttonPerformance= document.getElementById('btPerformanceView');        
        buttonPerformance.addEventListener('click', togglePerformanceview);


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

    function onNodeClick(node) {
      var diagram = $('#diagram').getKendoDiagram();
      diagram.bringIntoView(diagram.shapes);
      this.nodeClickChek(node.item.dataItem);
      diagram.refresh();
      // ReloadDiagramWithSelectedNode(node);
    }

    $(document).ready(function () {
      $('#diagram').kendoDiagram({
        // ... other diagram configurations ...
        click: onNodeClick,
      });
    });
  }

  ExpandCollapse(){
    alert("expand called");
  }

  ngOnInit(): void {
    
  }

  public nodeClick(data) {
    sessionStorage.clear();
  }
  
}
