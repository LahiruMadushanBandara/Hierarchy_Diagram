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
  dataAvailability: boolean = false;

  @Input() IsExpanded: boolean = false;

  constructor() { }

  ngOnChanges(): void {
    this.dataAvailability = this.bowTieNodeDetails.length > 0 ? true : false;

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
        auditTemplateExpnad: "",
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
          if (originalData[i].Title === "Other Node") {
            dataConnections.push({
              Id: originalData[i].Id,
              FromShapeId: originalData[i].ParentNodeId,
              ToShapeId: originalData[i].Id,
              Text: null,
              fromConnector: "bottom",
              toConnector: "top"
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
              } else {
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
          var notLinkedControlsTypeTwo: any[] = [];
          var notLinkedControlsTypeThree: any[] = [];

          // Collect all "Control Node" type 2 and 3 elements with IsLinkedToCauseOrConsequence set to false
          for (let i = 0; i < originalData.length; i++) {
              if (originalData[i].Title === "Control Node" && originalData[i].Type === 2 && !originalData[i].ControlData.IsLinkedToCauseOrConsequence) {
                  notLinkedControlsTypeTwo.push(originalData[i]);
              }
              
              if (originalData[i].Title === "Control Node" && originalData[i].Type === 3 && !originalData[i].ControlData.IsLinkedToCauseOrConsequence) {
                notLinkedControlsTypeThree.push(originalData[i]);
              }
          }
          
          // Generate connection lines based on notLinkedControls
          for (let j = 0; j < notLinkedControlsTypeTwo.length; j++) {
              dataConnections.push({
                  Id:  notLinkedControlsTypeTwo[j].Id, // Assuming you have the correct index or unique identifier for Id
                  FromShapeId: (j == 0 || j % 5 == 0) ? 0 : notLinkedControlsTypeTwo[j - 1].Id,
                  ToShapeId: notLinkedControlsTypeTwo[j].Id,
                  Text: null,
                  toConnector: "right",
                  fromConnector: "left", // Adjusted to use notLinkedControls[j] instead of originalData[i]
              });
          }
        
        // Generate connection lines based on notLinkedControls
          for (let j = 0; j < notLinkedControlsTypeThree.length; j++) {
            dataConnections.push({
                Id: notLinkedControlsTypeThree[j].Id, // Assuming you have the correct index or unique identifier for Id
                FromShapeId: (j == 0 || j % 5 == 0) ? 0 : notLinkedControlsTypeThree[j - 1].Id,
                ToShapeId: notLinkedControlsTypeThree[j].Id,
                Text: null,
                toConnector: "left",
                fromConnector: "right", // Adjusted to use notLinkedControls[j] instead of originalData[i]
            });
        }
          
        }



        var initialStateOfDataAndConnections = {
          data: dataShapes.slice(),
          connections: dataConnections
        };


        $('#diagram').kendoDiagram({
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
              color: '#323250',
              width: 1.5,
            },
            select: function (e) {
              e.preventDefault(); // Prevent line selection
            },
            content: {
              visible: false, // Hide connection content
            },
          },
          zoom: 0.4,
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


        
        var slider = $(".eqSlider").kendoSlider({
          orientation: "vertical",
          min: 0.02,
          max: 2,
          smallStep: 0.01,
          largeStep: 0.02,
          value: diagram.zoom(),
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



        var sliderHandle = slider.wrapper.find('.k-draghandle');
        sliderHandle.kendoTooltip({
          content: function (e) {
            return slider.value();
          },
          position: 'top',
          animation: false // You can enable animation if needed
        });

        function switchView(isExpand) {
           diagramHelper.ArrangeNodes(originalData, isExpand);
                 
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
          const buttonText = isExpand ? 'Collapse Panel' : 'Expand Panel';
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
          diagram.bringIntoView(diagram.shapes);


        });

        $(".btn-Return").click(function () {
          // Get the current URL
          var currentUrl = window.location.href;
          var RiskRegisterID = localStorage.getItem("RiskRegisterID")
       
          // Extract the base path up to '/cammsrisk'
          var basePath = currentUrl.match(/^(.*\/cammsrisk)/);
          RiskRegisterID = RiskRegisterID == null ? "/register/1" : `/register/${RiskRegisterID}`;
          if (basePath && basePath[1]) {

            // Append '/register/1' to the base path
            var regiterPageUrl = basePath[1] + RiskRegisterID;
            // Navigate to the new URL
            window.location.href = regiterPageUrl;
          }

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


    

    //..................centralized view function...........................
    var dataArrayoriginal = this.originalData;

  }
}
