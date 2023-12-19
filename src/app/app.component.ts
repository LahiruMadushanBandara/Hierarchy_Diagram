import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  Output,
  EventEmitter,
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
export class AppComponent implements OnChanges {
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

  constructor() { }

  ngOnChanges(): void {

    sessionStorage.clear();
    this.originalData = this.bowTieNodeDetails;

    var tempTitleDetail = '';
    let isRiskView = false;
    let isKpIview = false;
    let isPerformanceView = false;
    let isExpand = false;
    let clicked = false;
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
        riskActionTemplateExpand: "",
        complianceTemplateExpnad: "",
        authorityDocumentTemplateExpnad: "",
        auditTemplateExpnad: ""
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

        for (let i = 1; i < originalData.length; i++) {

          if (originalData[i].Title == "Other Node") {

            var conObj = {
              Id: originalData[i].Type === i,
              FromShapeId: originalData[i].ParentNodeId,
              ToShapeId: originalData[i].Id,
              Text: null,
              color: "1",
              fromConnector: "bottom",
              toConnector: "top"

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


        var initialStateOfDataAndConnections= {
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
          click: (e) => diagramManager.onNodeClick(e, clicked, diagram, dataArrayoriginal),
          editable: {
            drag: false,
            tools: [
              {
                template: diagramManager.GetToolbarTemplate()
              }
            ]
          },
          selectable: false,
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
       


      var diagram = $('#diagram').getKendoDiagram();


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
        //positive delta value means the scroller scrolls down, negative means the scroller scrolls up
        var delta = e.originalEvent.deltaY;        
        if (delta > 0) {
          $(".zoomOutIcon").trigger("click")    
        } else {
          $(".zoomInIcon").trigger("click")
        }       
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

      $(".bt-Risk").click(function () {

        if (isKpIview == false) {
          isRiskView = !isRiskView;

          const Riskbutton = document.getElementById('btRiskView');
          Riskbutton.classList.toggle('active', isRiskView);


          var diagram = kendoDiagram.getKendoDiagram();
          var connectionsDataSource = diagram.connectionsDataSource;

          if (isRiskView) {

            $('#btKpikView').prop("disabled", true);
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
            $('#btKpikView').prop("disabled", false);
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
            $('#btRiskView').prop("disabled", true);
            // Clear connections that are not linked to nodes with header = KPI
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
            $('#btRiskView').prop("disabled", false);
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
    

      $(".btn-Export").click(function () {
          var diagram = $("#diagram").getKendoDiagram();
          diagram.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "bow-tie-analysis.pdf"
            });
          });
      });

      $(".bt-BackFromCentralizedView").click(function () {
        // Reset both data source and connections data source
        diagram.setDataSource(dataShapes);
    
        // Re-add the initial connections using a deep copy
        diagram.setConnectionsDataSource({
            data: JSON.parse(JSON.stringify(initialStateOfDataAndConnections.connections)),
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
    
        //  Enable the buttons
          $('#btRiskView').prop("disabled", false);
          $('#btKpikView').prop("disabled", false);

        var reloadButton = document.getElementById("btReload");
        reloadButton.style.display = "none";
        
  
      });
       
      $(".btn-Return").click(function () {
        // Navigate to the specified URL
        window.location.href = "/cammsrisk/register/1";
      });




       
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

    //..................centralized view function...........................

  
  }
}
