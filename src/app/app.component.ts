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
import '../kendo-ui-license.js'


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
    let isExpand = false;
    let clicked = false;
    var Templates = new TemplateClass();
    var diagramManager = new DiagramManager();



    // Import the Drawing API namespaces.
    var draw = kendo.drawing;
    function visualTemplate(options: any) {
      var visual = new kendo.dataviz.diagram.Group();
      var dataItem = options.dataItem;
      tempTitleDetail = dataItem.Title;

      //tooltip
      if ((dataItem.htmlTemplate.length > 105)) {

        visual.drawingElement.options.tooltip = {
          content: dataItem.htmlTemplate,
          position: "bottom",
          width: 500, // Adjust the width as needed
          height: 10,
          showOn: "mouseenter"
        };

      }

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

      Templates.AddTemplatesToNode(dataItem, templatesObj, isExpand, renderElement);

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
    diagramHelper.ArrangeData(this.originalData);
    const arrangedData = diagramHelper.ArrangeNodes(isExpand);
    arrangedData.map((node) => ({ Id: node.Id, x: node.x, y: node.y }));
    diagramManager.CreateDataConnection(this.originalData);


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

       

        //create data and connection object
        var initialStateOfDataAndConnections = {
          data: dataShapes.slice(),
          connections: diagramManager.dataConnections
        };

        //create diagram 
        $('#diagram').kendoDiagram({
          //create data Source
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
          //create connection source
          connectionsDataSource: {
            data: diagramManager.dataConnections,
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
              color: '#323250',
              width: 1.5,
            },
            style: {
              vectorEffect: 'non-scaling-stroke',
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
          selectable: false,
          //centralized view click event
          click: (e) => diagramManager.onNodeClick(e, clicked, diagram, dataArrayoriginal),
          //toolbar 
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
          dataBound: function () {
            // Call the function to update diagram dimensions
            diagramManager.updateDiagramDimensions(this, dataArrayoriginal);
          }
        });



        var diagram = $('#diagram').getKendoDiagram();


        //zoom by zoom slider  
        var slider = $(".eqSlider").kendoSlider({
          orientation: "vertical",
          min: 0.02,
          max: 2,
          smallStep: 0.01,
          largeStep: 0.02,
          value: diagram.zoom(),
          tooltip: {
            enabled: false,
          },
          slide: function (e) {
            diagram.zoom(e.value);
          },
          change: function (e) {
            diagram.zoom(e.value);
          }

        }).data("kendoSlider");

        //zoom by mouse wheel 
        diagram.wrapper.on("wheel", function (e) {
          e.preventDefault();
          var delta = e.originalEvent.deltaY;

          // Get the mouse position relative to the diagram
          var offset = diagram.wrapper.offset();
          var zoomPointX = e.pageX - offset.left;
          var zoomPointY = e.pageY - offset.top;

          // Convert the mouse position to the diagram's coordinate system
          var diagramPoint = diagram.documentToModel({ x: zoomPointX, y: zoomPointY });

          var currentZoom = diagram.zoom();
          if (delta > 0) {
            currentZoom = Math.max(slider.options.min, currentZoom - 0.02);
          } else {
            currentZoom = Math.min(slider.options.max, currentZoom + 0.02);
          }

          diagram.zoom(currentZoom, { point: diagramPoint });
          slider.value(currentZoom);
        });


     

        // Bind the double-click event to the diagram element


        //zoom by double click  

        $('#diagram').on('dblclick', function (e) {
          e.preventDefault(); // Prevent the default zoom behavior on double-click
          slider.value(diagram.zoom());

        });


        //set the cordinates for originate zoom from the main risk card.added risk cordinates

        const zoomPointX = originalData[1].x + 190;
        const zoomPointY = originalData[1].y + 190;



        //zoom by zoom icons
        $(".zoomInIcon").click(function () {

          var currentZoom = diagram.zoom();
          currentZoom = $("#diagram").data("kendoDiagram").zoom(currentZoom + 0.02,
            { point: new kendo.dataviz.diagram.Point(zoomPointX, zoomPointY) });
          diagram.zoom(currentZoom);
          slider.value(currentZoom);

        });

        $(".zoomOutIcon").click(function () {
          var currentZoom = diagram.zoom();
          currentZoom = $("#diagram").data("kendoDiagram").zoom(currentZoom - 0.02,
            { point: new kendo.dataviz.diagram.Point(zoomPointX, zoomPointY) });
          diagram.zoom(currentZoom);
          slider.value(currentZoom);
        });

        //zoom slider drag handle
        var sliderHandle = slider.wrapper.find('.k-draghandle');
        sliderHandle.kendoTooltip({
          content: function (e) {
            return slider.value();
          },
          position: 'top',
          animation: false // You can enable animation if needed
        });

        //switch views when expand and collapes
        function switchView(isExpand) {

          diagramHelper.ArrangeNodes(isExpand);

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

        //expand button funtion 
        $(".bt-Expand").click(function () {
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

          // diagram.refresh();


        });

        //import button function
        $(".btn-Export").click(function () {
          var diagram = $("#diagram").getKendoDiagram();
          diagram.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "bow-tie-analysis.pdf"
            });
          });
        });

        //back button function when back from centralized view
        $(".bt-BackFromCentralizedView").click(function () {

          $('#btExpandView').prop("disabled", false);
          $('#btExport').prop("disabled", false);
          var reloadButton = document.getElementById("backButton");
          reloadButton.style.display = "none";

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

       
          diagram.bringIntoView(diagram.shapes);
          diagramManager.updateDiagramDimensions(diagram, dataArrayoriginal);
        });

        //return button function and return to the register page
        $(".btn-Return").click(function () {
          var currentUrl = window.location.href;// Get the current URL    
          var basePath = currentUrl.match(/^(.*\/cammsrisk)/);// Extract the base path up to '/cammsrisk'         
          var urlParams = new URLSearchParams(window.location.search); // Extract query parameters from the URL
          var registerId = urlParams.get('registerId');
          var RiskRegisterID =
            registerId == null ? "/register/1" : `/register/${registerId}`;

          if (basePath && basePath[1]) {
            var regiterPageUrl = basePath[1] + RiskRegisterID;
            window.location.href = regiterPageUrl; // Navigate to the new URL
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
