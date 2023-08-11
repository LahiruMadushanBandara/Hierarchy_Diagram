import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import '@progress/kendo-ui';
import { TemplateClass } from './utils/classes/TemplateClass';

import { DataService } from './services/data.service';
import { data } from './models/data.model';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('diagram', { static: false }) diagram: any;
  @ViewChild('buttonContainer', { static: true }) buttonContainer: ElementRef;
  @Input() testData: data[] = [];

  riskTemplate: string = '';
  controlTemplate: string = '';
  causeTemplate: string = '';
  consequencesTemplate: string = '';
  otherTemplate: string = '';
  originalData:data[] =[]; 
  


  constructor(
    
   
    private dataService: DataService
  ) { 

  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnChanges(): void { 
    this.originalData = this.testData;
     
    sessionStorage.clear();

    var tempTitleDetail = '';
    let isExpanded = false;
    let enableriskview = false;
    let enableKPIview = false;
    let enablePerformanceview = false;
    var originalConnections; // Variable to store the original connections


    // Import the Drawing API namespaces.
    var draw = kendo.drawing;
    var geom = kendo.geometry;

    function visualTemplate(options: any) {
      debugger
      var Templates = new TemplateClass();
      var dataItem = options.dataItem;
      tempTitleDetail = dataItem.Title;

      var riskTemplate = "";
      var controlTemplate = "";
      var controlTemplateExpand = ""
      var causeTemplate = "";
      var consequencesTemplate = "";
      var incidentTemplateExpnad = "";
      var kpiTemplateExpnad = "";
      var bottomTemplate = ""
      console.log(dataItem.Header)
      switch(dataItem.Header) 
      {
        case "Risk":
          riskTemplate = Templates.GetRiskNodeTemplateGlobal(dataItem);
          sessionStorage.setItem('riskTemplate', riskTemplate);
          break;
        case "Control":
          controlTemplate = Templates.GetControlNodeTemplateGlobal(dataItem);
          controlTemplateExpand = Templates.GetControlNodeTemplateGlobalExpand(dataItem);
          sessionStorage.setItem('controlTemplate', controlTemplate);
          sessionStorage.setItem('controlExpandTemplate', controlTemplateExpand);
          break;
        case "Cause":
          causeTemplate = Templates.GetCauseTemplateGlobal(dataItem);
          sessionStorage.setItem('causeTemplate', causeTemplate);
          break;
        case "Consequence":
          consequencesTemplate = Templates.GetConsequencesTemplateGlobal(dataItem);
          sessionStorage.setItem('consequencesTemplate', consequencesTemplate);
          break;
        case "Incident":
          incidentTemplateExpnad = Templates.GetIncidentExpand(dataItem);
          bottomTemplate = Templates.GetOtherTemplateGlobal(dataItem);
          sessionStorage.setItem('Incident', incidentTemplateExpnad);
          sessionStorage.setItem('otherTemplate', bottomTemplate);
          break;
        case "Kpi":
          kpiTemplateExpnad = Templates.GetKPIExpand(dataItem);
          bottomTemplate = Templates.GetOtherTemplateGlobal(dataItem);
          sessionStorage.setItem('Kpi', kpiTemplateExpnad);
          sessionStorage.setItem('otherTemplate', bottomTemplate);
          break;
        default:
      }

      //get templates from template class
      
      var riskTemplateExpand = Templates.GetRiskNodeTemplateGlobalExpand(dataItem);
      var riskActionTemplateExpand = Templates.GetRiskActionTreatmentExpand(dataItem);
      var incidentTemplateExpnad = Templates.GetIncidentExpand(dataItem);
      var complianceTemplateExpnad = Templates.GetComplianceObligationExpand(dataItem);
      

      // templates are assigned to corresponding variables
      sessionStorage.setItem('riskExpand', riskTemplateExpand);
      sessionStorage.setItem('riskActionExpand', riskActionTemplateExpand);
      sessionStorage.setItem('complianceExpand', complianceTemplateExpnad);

      
      var renderElement = $("<div style='display:inline-block' />").appendTo(
        'body'
      );


      if (enableriskview) {
        enableKPIview = false;
        if (isExpanded) {
          if (dataItem.Header === 'riskExpand') {
            var riskExpandTemp = kendo.template(riskTemplateExpand);
            renderElement.html(riskExpandTemp(dataItem));
          }
        } else {
          if (dataItem.Header === 'riskExpand') {
            var otherTemp = kendo.template(bottomTemplate);
            renderElement.html(otherTemp(dataItem));
          }
        }

        if (dataItem.Title === 'Risk Node') {
          var riskNodeTemp = kendo.template(riskTemplate);
          renderElement.html(riskNodeTemp(dataItem));
        }


      } else if (enableKPIview) {
        enableriskview = false;
        if (isExpanded) {
          if (dataItem.Header === 'Kpi') {
            var KPIExpandTemp = kendo.template(kpiTemplateExpnad);
            renderElement.html(KPIExpandTemp(dataItem));
          }
        } else {
          if (dataItem.Header === 'Kpi') {
            var otherTemp = kendo.template(bottomTemplate);
            renderElement.html(otherTemp(dataItem));
          }
        }

        if (dataItem.Title === 'Risk Node') {
          var riskNodeTemp = kendo.template(riskTemplate);
          renderElement.html(riskNodeTemp(dataItem));
        }


      } else {
        if (isExpanded) {
         
          if (dataItem.Title === 'Risk Node') {
            var riskNodeTemp = kendo.template(riskTemplate);
            renderElement.html(riskNodeTemp(dataItem));
          } else if (dataItem.Title === 'Control Node') {
            var controlNodeExpandTemp = kendo.template(controlTemplateExpand);
            renderElement.html(controlNodeExpandTemp(dataItem));
          } else if (dataItem.Title === 'Consequences Node') {
            var consequencesTemp = kendo.template(consequencesTemplate);
            renderElement.html(consequencesTemp(dataItem));
          } else if (dataItem.Title === 'Cause Node') {
            var causeTemp = kendo.template(causeTemplate);
            renderElement.html(causeTemp(dataItem));
          } else {
            if (dataItem.Header === 'riskExpand') {
              var riskExpandTemp = kendo.template(riskTemplateExpand);
              renderElement.html(riskExpandTemp(dataItem));
            } else if (dataItem.Header === 'riskActionExpand') {
              var riskActionExpandTemp = kendo.template(
                riskActionTemplateExpand
              );
              renderElement.html(riskActionExpandTemp(dataItem));
            } else if (dataItem.Header === 'Incident') {
              var incidentExpandTemp = kendo.template(incidentTemplateExpnad);
              renderElement.html(incidentExpandTemp(dataItem));
            } else if (dataItem.Header === 'Compliance') {
              var complianceExpandTemp = kendo.template(complianceTemplateExpnad);
              renderElement.html(complianceExpandTemp(dataItem));
            } else if (dataItem.Header === 'Kpi') {
              var KPIExpandTemp = kendo.template(kpiTemplateExpnad);
              renderElement.html(KPIExpandTemp(dataItem));
            }
          }
        } else {
         

          if (dataItem.Title === 'Risk Node') {
            var riskNodeTemp = kendo.template(riskTemplate);
            renderElement.html(riskNodeTemp(dataItem));
          } else if (dataItem.Title === 'Control Node') {
            var controlNodeTemp = kendo.template(controlTemplate);
            renderElement.html(controlNodeTemp(dataItem));
          } else if (dataItem.Title === 'Consequences Node') {
            var consequencesTemp = kendo.template(consequencesTemplate);
            renderElement.html(consequencesTemp(dataItem));
          } else if (dataItem.Title === 'Cause Node') {
            var causeTemp = kendo.template(causeTemplate);
            renderElement.html(causeTemp(dataItem));
          } else if (dataItem.Title === 'Expand Node') {
            var extraTemp = kendo.template(controlTemplateExpand);
            renderElement.html(extraTemp(dataItem));
          } else {
            var otherTemp = kendo.template(bottomTemplate);
            renderElement.html(otherTemp(dataItem));
          }
        }
      }

      var output = new kendo.drawing.Group();
      var width = renderElement.width();
      var height = renderElement.height();
      var geom = new kendo.geometry.Rect([0, 0], [width, height]);
      output.append(new kendo.drawing.Rect(geom, { stroke: { width: 0 } }));

      var x = parseInt(dataItem.x);
      var y = parseInt(dataItem.y);

      draw.drawDOM(renderElement, options).then(function (group) {
        output.clear();
        output.append(group);
        renderElement.remove();
      });

      var visual = new kendo.dataviz.diagram.Group();
      visual.drawingElement.append(output);
      return visual;
    }

    function onEdit(e) {
      //console.log('Editing shape with model id: ' + e.shape.id);
    }

    function arrangeNodes(originalData) {
      const arrangedNodes = [];

      // Find the risk node (type 1 with ParentNodeId 0)
      const riskNode = originalData.find(
        (node) => node.Type === 1 && node.ParentNodeId === 0
      );

      if (riskNode) {
        const horizontalSpacing = 450;
        const verticalSpacing = 420;
        const verticalSpacingFour = 200;
        const maxNodesPerRow = 5;
        const maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4

        let typeFourIndex = 0;

        const originX = 0;
        const originY = 0;

        // arrange type 2 nodes (left of type 1)
        const typeTwoNodes = originalData.filter((node) => node.Type === 2);
        let rowNumber = 0;
        let columnNumber = 0;
        let rowNodeCount = 0;

        for (let i = 0; i < typeTwoNodes.length; i++) {
          if (
            typeTwoNodes[i].ParentNodeId == 1 &&
            typeTwoNodes[i].Title == 'Cause Node'
          ) {

            // Calculate the x and y coordinates for the cause node
            const x = originX - 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumber * verticalSpacing;

            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNumber++;
          } else if (typeTwoNodes[i].Title == 'Control Node') {
            const x = originX - (columnNumber + 1) * horizontalSpacing;
            const y = originY + rowNumber * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;
            if (rowNodeCount === maxNodesPerRow) {
              rowNumber++;
              rowNodeCount = 0;
            }
            columnNumber = rowNodeCount;
          } else if (
            typeTwoNodes[i].ParentNodeId !== 1 &&
            typeTwoNodes[i].Title == 'Cause Node'
          ) {
            const x = originX - 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumber * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;

            rowNumber++;
            rowNodeCount = 0;

            columnNumber = rowNodeCount;
          }
        }

        // Arrange type 3 nodes (right of type 1)
        rowNumber = 0;
        const typeThreeNodes = originalData.filter((node) => node.Type === 3);

        for (let i = 0; i < typeThreeNodes.length; i++) {
          if (
            typeThreeNodes[i].ParentNodeId == 1 &&
            typeThreeNodes[i].Title == 'Consequences Node'
          ) {
            const x = originX + 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumber * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNumber++;
          } else if (typeThreeNodes[i].Title == 'Control Node') {
            const x = originX + (columnNumber + 1) * horizontalSpacing;
            const y = originY + rowNumber * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNodeCount++;
            if (rowNodeCount === maxNodesPerRow) {
              rowNumber++;
              rowNodeCount = 0;
            }
            columnNumber = rowNodeCount;
          } else if (
            typeThreeNodes[i].ParentNodeId !== 1 &&
            typeThreeNodes[i].Title == 'Consequences Node'
          ) {
            const x = originX + 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumber * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNodeCount++;

            rowNumber++;
            rowNodeCount = 0;

            columnNumber = rowNodeCount;
          }
        }

        // Arrange type 1 (risk) node
        const typeTwoRows = Math.ceil(
          typeTwoNodes.length / (maxNodesPerRow - 1)
        );
        const typeThreeRows = Math.ceil(
          typeThreeNodes.length / (maxNodesPerRow - 1)
        );

        let maxTypeTwoTypeThreeRows = Math.max(typeTwoRows, typeThreeRows);

        let riskNodeX = originX;
        let riskNodeY =
          originY +
          (maxTypeTwoTypeThreeRows -3) * verticalSpacing +
          verticalSpacing / 2; // Adjust the Y-coordinate to place it in the center of the last two rows
          riskNode.x = riskNodeX;
          riskNode.y = riskNodeY;
          arrangedNodes.push(riskNode);

        // Arrange type 4 nodes (below type 2 and type 3)
        const typeFourNodes = originalData.filter((node) => node.Type === 4);
        typeFourNodes.forEach((node, index) => {
          const rowNumber = Math.floor(typeFourIndex / maxNodesPerRowFour); // Calculate the row number

          const columnNumber = typeFourIndex % maxNodesPerRowFour; // Calculate the column number

          const x = riskNode.x - (columnNumber - 5) * horizontalSpacing; // Adjusting the starting point for type 4 nodes
          const y =
            riskNode.y +
            rowNumber * verticalSpacingFour +
            (maxTypeTwoTypeThreeRows + 4) * verticalSpacingFour;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          typeFourIndex++;
        });
      }

      return arrangedNodes;
    }

    const arrangedData = arrangeNodes(this.originalData);
    arrangedData.map((node) => ({ Id: node.Id, x: node.x, y: node.y }));

    
    $(()=> {
      $(document).ready(() => {
        createDiagram(this.originalData);
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

      function createDiagram(originalData:any[]) {
        var dataShapes = JSON.parse(sessionStorage.getItem('shapes'));
        if (!dataShapes || dataShapes.length == 0) {
          sessionStorage.setItem('shapes', JSON.stringify(originalData));
          dataShapes = originalData;
        } else {
          dataShapes = JSON.parse(sessionStorage.getItem('shapes'));
        }

        
        var dataConnections = [
        ];
      
        for (let i = 0; i < originalData.length; i++) {

          var conObj = {
            "Id": i,
            "FromShapeId": originalData[i].ParentNodeId,
            "ToShapeId": originalData[i].Id,
            "Text": null
          }
          dataConnections.push(conObj);
        }
     

        // Function to handle the toggle switch behavior
        function toggleExpand() {
          isExpanded = !isExpanded;

          // Update the switch state
          const expandSwitch = document.getElementById('expandSwitch');
          expandSwitch.classList.toggle('active', isExpanded);

          // Update the label text
          const expandSwitchlabel = document.getElementById('expandSwitchlabel');
          expandSwitchlabel.innerText = isExpanded ? 'Expand' : 'Collapse';

          // Use kendoDiagram variable to get the diagram instance
          var diagram = kendoDiagram.getKendoDiagram();
          diagram.bringIntoView(diagram.shapes);
          diagram.refresh();
        }

        function toggleRiskview() {

          if (enableKPIview == false) {
            enableriskview = !enableriskview;
            const riskviewSwitch = document.getElementById('riskviewSwitch');
            riskviewSwitch.classList.toggle('active', enableriskview);
            var diagram = kendoDiagram.getKendoDiagram();
            var connectionsDataSource = diagram.connectionsDataSource;

            if (enableriskview) {
              // Clear connections that are not linked to nodes with header = riskExpand
              var visibleConnections = diagram.connectionsDataSource
                .data()
                .filter(function (connection) {
                  var fromNode = diagram.dataSource.get(connection.from);
                  var toNode = diagram.dataSource.get(connection.to);
                  return (
                    (fromNode && fromNode.Header === 'riskExpand') ||
                    (toNode && toNode.Header === 'riskExpand')
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
          if (enableriskview == false) {
            enableKPIview = !enableKPIview;
            const kpiviewSwitch = document.getElementById('kpiviewSwitch');
            kpiviewSwitch.classList.toggle('active', enableKPIview);

            var diagram = kendoDiagram.getKendoDiagram();
            var connectionsDataSource = diagram.connectionsDataSource;


            if (enableKPIview) {
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


       
        function togglePerformanceview() {

          enablePerformanceview = !enablePerformanceview;

          const performanceviewSwitch = document.getElementById('performanceviewSwitch');
          performanceviewSwitch.classList.toggle('active', enablePerformanceview);

          var diagram = kendoDiagram.getKendoDiagram();
          diagram.bringIntoView(diagram.shapes);
          diagram.refresh();
          console.log("enablePerformanceview" , enablePerformanceview);
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
                
                <span  class="expandswitch-label" id="expandSwitchlabel">Collapse</span>
                <div class="expandswitch-container" id="expandSwitch" onclick="toggleExpand()">
                <div class="expandswitch-slider"></div>
                </div>

                <span class="riskswitch-label" id="riskswitchLabel">Risk View</span>
                <div class="riskswitch-container" id="riskviewSwitch" onclick="toggleRiskview()">
                  <div class="riskswitch-slider"></div>
                </div>

                <span class="kpiswitch-label" id="kpiswitchLabel">KPI View</span>
                <div class="kpiswitch-container" id="kpiviewSwitch" onclick="toggleKPIview()">
                  <div class="kpiswitch-slider"></div>
                </div>

                <span class="performanceswitch-label" id="performanceswitchLabel">Performance View</span>
                <div class="performanceswitch-container" id="performanceviewSwitch" (click)="togglePerformanceview()">
                <div class="performanceswitch-slider"></div>
                </div>
               
                `,
                enableriskview: true,
              },
            ],
          },

          shapeDefaults: {
            stroke: {
              color: '#979797',
              width: 10,
            },
            visual: visualTemplate,
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

        // Get the switch element and attach the click event listener
        var expandSwitch = document.getElementById('expandSwitch');
        var riskviewSwitch = document.getElementById('riskviewSwitch');
        var kpiviewSwitch = document.getElementById('kpiviewSwitch');
        var performanceviewSwitch = document.getElementById('performanceviewSwitch');

        if (expandSwitch) {
          expandSwitch.addEventListener('click', toggleExpand);
        }
        if (riskviewSwitch) {
          riskviewSwitch.addEventListener('click', toggleRiskview);
        }
        if (kpiviewSwitch) {
          kpiviewSwitch.addEventListener('click', toggleKPIview);
        }
        if (performanceviewSwitch) {
          performanceviewSwitch.addEventListener('click', togglePerformanceview);
        }


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

    function ReloadDiagramWithSelectedNode(node: any) {
      var diagram = $('#diagram').getKendoDiagram();
      var selectedNode = diagram.select();

      if (selectedNode) {
        var nodesToRemove = [];

        diagram.shapes.forEach(function (shape) {
          if (shape !== selectedNode && !selectedNode.isContained(shape)) {
            nodesToRemove.push(shape);
          }
        });

        nodesToRemove.forEach(function (node) {
          diagram.removeShape(node);
        });
      }

      // Focus on the selected node
      if (node) {
        diagram.bringIntoView(node);
      }
    }
    $(document).ready(function () {
      $('#diagram').kendoDiagram({
        // ... other diagram configurations ...
        click: onNodeClick,
      });
    });

  }
  

  ngOnInit(): void {
    
    
   
  }

  public nodeClick(data) {
    sessionStorage.clear();
  }

}
