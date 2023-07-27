import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import '@progress/kendo-ui';
import { TemplateClass } from './utils/classes/TemplateClass';

import { DataService } from './services/data.service';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('diagram', { static: false }) diagram: any;
  @ViewChild('buttonContainer', { static: true }) buttonContainer: ElementRef;

  riskTemplate: string = '';
  controlTemplate: string = '';
  causeTemplate: string = '';
  consequencesTemplate: string = '';
  otherTemplate: string = '';

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) { }
  ngAfterViewInit(): void { }

  ngOnInit(): void {
    sessionStorage.clear();

    var tempTitleDetail = '';
    let isExpanded = false;
    let enableriskview = false;
    let enableKPIview = false;
    var originalConnections; // Variable to store the original connections

    // Import the Drawing API namespaces.
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    //  var Templates = new TemplateClass();

    // var GetControlNodeTemplate: any =
    //   Templates.GetControlNodeTemplateGlobal();
    // var GetConsequencesTemplate: any = this.GetConsequencesTemplateGlobal;
    // var GetCauseTemplate: any = this.GetCauseTemplateGlobal;
    // var GetRiskNodeTemplate: any = this.GetRiskNodeTemplateGlobal;
    // var nodeClickChek: any = this.nodeClick;

    function visualTemplate(options: any) {
      var Templates = new TemplateClass();
      var dataItem = options.dataItem;
      tempTitleDetail = dataItem.Title;

      //get templates from template class
      var riskTemplate = Templates.GetRiskNodeTemplateGlobal(dataItem);
      var controlTemplate = Templates.GetControlNodeTemplateGlobal(dataItem);
      var causeTemplate = Templates.GetCauseTemplateGlobal(dataItem);
      var consequencesTemplate =
        Templates.GetConsequencesTemplateGlobal(dataItem);
      var bottomTemplate = Templates.GetOtherTemplateGlobal(dataItem);
      var controlTemplateExpand =
        Templates.GetControlNodeTemplateGlobalExpand(dataItem);
      var riskTemplateExpand =
        Templates.GetRiskNodeTemplateGlobalExpand(dataItem);
      var riskActionTemplateExpand =
        Templates.GetRiskActionTreatmentExpand(dataItem);
      var ieTemp = Templates.GetIncidentExpand(dataItem);
      var coeTemp = Templates.GetComplianceObligationExpand(dataItem);
      var keTemp = Templates.GetKPIExpand(dataItem);
      var aeTemp = Templates.GetAuditExpand(dataItem);
      var heTemp = Templates.GetHierarchyExpand(dataItem);
      var aueTemp = Templates.GetAuthorityDocumentExpand(dataItem);
      var peTemp = Templates.GetPolicyExpand(dataItem);
      var areTemp = Templates.GetAuditRecommendationsExpand(dataItem);
      var afeTemp = Templates.GetAuditFinfingExpand(dataItem);

      // templates are assigned to corresponding variables
      sessionStorage.setItem('riskTemplate', riskTemplate);
      sessionStorage.setItem('controlTemplate', controlTemplate);
      sessionStorage.setItem('causeTemplate', causeTemplate);
      sessionStorage.setItem('consequencesTemplate', consequencesTemplate);
      sessionStorage.setItem('otherTemplate', bottomTemplate);
      sessionStorage.setItem('expandTemplate', controlTemplateExpand);
      sessionStorage.setItem('riskExpand', riskTemplateExpand);
      sessionStorage.setItem('riskActionExpand', riskActionTemplateExpand);
      sessionStorage.setItem('incidentExpand', ieTemp);
      sessionStorage.setItem('complianceExpand', coeTemp);
      sessionStorage.setItem('KPIExpand', keTemp);

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
          if (dataItem.Header === 'KPIExpand') {
            var KPIExpandTemp = kendo.template(keTemp);
            renderElement.html(KPIExpandTemp(dataItem));
          }
        } else {
          if (dataItem.Header === 'KPIExpand') {
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
          console.log('Expand');
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
            } else if (dataItem.Header === 'incidentExpand') {
              var incidentExpandTemp = kendo.template(ieTemp);
              renderElement.html(incidentExpandTemp(dataItem));
            } else if (dataItem.Header === 'complianceExpand') {
              var complianceExpandTemp = kendo.template(coeTemp);
              renderElement.html(complianceExpandTemp(dataItem));
            } else if (dataItem.Header === 'KPIExpand') {
              var KPIExpandTemp = kendo.template(keTemp);
              renderElement.html(KPIExpandTemp(dataItem));
            }
          }
        } else {
          console.log('collaps');

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
      /* The result can be observed in the DevTools(F12) console of the browser. */
      //e.container.find(".k-edit-buttons").remove();
      console.log('Editing shape with model id: ' + e.shape.id);
    }

    function arrangeNodes(originalData) {
      const arrangedNodes = [];

      // Find the risk node (type 1 with ParentNodeId 0)
      const riskNode = originalData.find(
        (node) => node.Type === 1 && node.ParentNodeId === 0
      );

      if (riskNode) {
        const horizontalSpacing = 450;
        const horizontalSpacingFour = 470;
        const verticalSpacing = 420;
        const verticalSpacingFour = 200;
        const maxNodesPerRow = 5;
        const maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4

        let typeTwoIndex = 0;
        let typeThreeIndex = 0;
        let typeFourIndex = 0;
        let rowIndex = 0;

        const originX = 0;
        const originY = 0;

        // arrange type 2 nodes (left of type 1)
        const typeTwoNodes = originalData.filter((node) => node.Type === 2);
        console.log('typeTwoNodes', typeTwoNodes);

        let typeTwoMaxNode = 4;
        let findControlNodeInFirstPlace = false;
        let findCauseNodeInFirstPlace = false;
        let rowComplete = false;
        let rowNumber = 0;
        let columnNumber = 0;
        let rowNodeCount = 0;

        for (let i = 0; i < typeTwoNodes.length; i++) {
          console.log('typeTwoNodes->', typeTwoNodes[i].ParentNodeId);
          if (
            typeTwoNodes[i].ParentNodeId == 1 &&
            typeTwoNodes[i].Title == 'Cause Node'
          ) {
            console.log('cause node with parent node id = 1 ');

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
        console.log('typeThreeNodes', typeThreeNodes);

        for (let i = 0; i < typeThreeNodes.length; i++) {
          console.log('typeThreeNodes->', typeThreeNodes[i].ParentNodeId);
          if (
            typeThreeNodes[i].ParentNodeId == 1 &&
            typeThreeNodes[i].Title == 'Consequences Node'
          ) {
            console.log('cause node with parent node id = 1 ');
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
          (maxTypeTwoTypeThreeRows - 2) * verticalSpacing +
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

    var originalData = this.dataService.originalData;
    console.log('originaldata:', originalData);

    const arrangedData = arrangeNodes(originalData);
    console.log('arrangedData->', arrangedData);
    console.log(
      arrangedData.map((node) => ({ Id: node.Id, x: node.x, y: node.y }))
    );

    $(function () {
      $(document).ready(function () {
        createDiagram();
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

      function createDiagram() {
        var dataShapes = JSON.parse(sessionStorage.getItem('shapes'));

        if (!dataShapes || dataShapes.length == 0) {
          sessionStorage.setItem('shapes', JSON.stringify(originalData));
          dataShapes = originalData;
        } else {
          dataShapes = JSON.parse(sessionStorage.getItem('shapes'));
        }

        var dataConnections = [
          { Id: 0, FromShapeId: 1, ToShapeId: 2, Text: null },
          { Id: 1, FromShapeId: 2, ToShapeId: 3, Text: null },
          { Id: 2, FromShapeId: 3, ToShapeId: 4, Text: null },
          { Id: 3, FromShapeId: 4, ToShapeId: 5, Text: null },
          { Id: 4, FromShapeId: 1, ToShapeId: 6, Text: null },
          { Id: 5, FromShapeId: 6, ToShapeId: 7, Text: null },
          { Id: 6, FromShapeId: 7, ToShapeId: 8, Text: null },
          { Id: 7, FromShapeId: 8, ToShapeId: 9, Text: null },
          { Id: 8, FromShapeId: 1, ToShapeId: 10, Text: null },
          { Id: 9, FromShapeId: 10, ToShapeId: 11, Text: null },

          { Id: 10, FromShapeId: 1, ToShapeId: 12, Text: null },
          { Id: 11, FromShapeId: 12, ToShapeId: 13, Text: null },
          { Id: 12, FromShapeId: 13, ToShapeId: 14, Text: null },
          { Id: 13, FromShapeId: 14, ToShapeId: 15, Text: null },
          { Id: 14, FromShapeId: 1, ToShapeId: 16, Text: null },
          { Id: 15, FromShapeId: 16, ToShapeId: 17, Text: null },
          { Id: 16, FromShapeId: 17, ToShapeId: 18, Text: null },
          { Id: 17, FromShapeId: 18, ToShapeId: 19, Text: null },
          { Id: 18, FromShapeId: 1, ToShapeId: 20, Text: null },
          { Id: 19, FromShapeId: 20, ToShapeId: 21, Text: null },

          { Id: 20, FromShapeId: 1, ToShapeId: 22, Text: null },
          { Id: 21, FromShapeId: 1, ToShapeId: 23, Text: null },
          { Id: 22, FromShapeId: 1, ToShapeId: 24, Text: null },
          { Id: 23, FromShapeId: 1, ToShapeId: 25, Text: null },
          { Id: 24, FromShapeId: 1, ToShapeId: 26, Text: null },
          { Id: 25, FromShapeId: 1, ToShapeId: 27, Text: null },
          { Id: 26, FromShapeId: 1, ToShapeId: 28, Text: null },
          { Id: 27, FromShapeId: 1, ToShapeId: 29, Text: null },
          { Id: 28, FromShapeId: 1, ToShapeId: 30, Text: null },
          { Id: 29, FromShapeId: 1, ToShapeId: 31, Text: null },
          { Id: 30, FromShapeId: 1, ToShapeId: 32, Text: null },
          { Id: 31, FromShapeId: 1, ToShapeId: 33, Text: null },
          { Id: 32, FromShapeId: 1, ToShapeId: 34, Text: null },
        ];

        // Function to handle the toggle switch behavior
        function toggleExpand() {
          isExpanded = !isExpanded;

          // Update the switch state
          const toggleSwitch = document.getElementById('expandSwitch');
          toggleSwitch.classList.toggle('active', isExpanded);

          // Update the label text
          const switchLabel = document.getElementById('switchLabel');
          switchLabel.innerText = isExpanded ? 'Expand' : 'Collapse';

          // Use kendoDiagram variable to get the diagram instance
          var diagram = kendoDiagram.getKendoDiagram();
          diagram.bringIntoView(diagram.shapes);
          diagram.refresh();
        }

       

        function toggleRiskview() {
          enableriskview = !enableriskview;
          const toggleSwitch2 = document.getElementById('expandSwitch2');
          toggleSwitch2.classList.toggle('active', enableriskview);

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

        function toggleKPIview() {
          enableKPIview = !enableKPIview;
          const toggleSwitch3 = document.getElementById('expandSwitch3');
          toggleSwitch3.classList.toggle('active', enableKPIview);

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
                  (fromNode && fromNode.Header === 'KPIExpand') ||
                  (toNode && toNode.Header === 'KPIExpand')
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
              console.log('saved');
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
                
                <span  class="switch-label" id="switchLabel"><b>Collapes</b></span>
                <div class="switch-container" id="expandSwitch" onclick="toggleExpand()">
                <div class="switch-slider"></div>
                </div>

                <span class="switch-label2" id="switchLabel2"><b>risk view</b></span>
                <div class="switch-container2" id="expandSwitch2" onclick="toggleRiskview()">
                  <div class="switch-slider2"></div>
                </div>

                <span class="switch-label3" id="switchLabel3"><b>KPI view</b></span>
                <div class="switch-container3" id="expandSwitch3" onclick="toggleKPIview()">
                  <div class="switch-slider3"></div>
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
        var toggleSwitch = document.getElementById('expandSwitch');
        var toggleSwitch2 = document.getElementById('expandSwitch2');
        var toggleSwitch3 = document.getElementById('expandSwitch3');
        if (toggleSwitch) {
          toggleSwitch.addEventListener('click', toggleExpand);
        }
        if (toggleSwitch2) {
          toggleSwitch2.addEventListener('click', toggleRiskview);
        }
        if (toggleSwitch3) {
          toggleSwitch3.addEventListener('click', toggleKPIview);
        }

        var diagram = $('#diagram').getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
        for (var i = 0; i < diagram.shapes.length; i++) {
          diagram.shapes[i].options.stroke.width = 0;
        }
        diagram.refresh();

        // function zoomDiagram() {
        //   var diagramWrapper = $('#diagram').data('kendoDiagram');
        //   diagramWrapper.bringIntoView(diagramWrapper.shapes);
        //   diagramWrapper.zoom(0.4); // Set the desired zoom level
        // }

        // // Automatically zoom the diagram when it loads
        // $(document).ready(function() {
        //   zoomDiagram();
        // });

        // // Center the diagram when zooming
        // $('#diagram').on('DOMMouseScroll mousewheel', function (e) {
        //   var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        //   if (delta > 0) {
        //     kendoDiagram.zoomIn();
        //   } else {
        //     kendoDiagram.zoomOut();
        //   }
        //   kendoDiagram.bringIntoView();
        // });

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
      console.log('heloo');
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

    var focused = false;
  }

  public nodeClick(data) {
    sessionStorage.clear();
    console.log(data);
  }

  public findChildrens() {
    var data = [
      { Id: 0, FromShapeId: 1, ToShapeId: 2, Text: null },
      { Id: 1, FromShapeId: 2, ToShapeId: 3, Text: null },
      { Id: 2, FromShapeId: 3, ToShapeId: 4, Text: null },
      { Id: 3, FromShapeId: 4, ToShapeId: 5, Text: null },
      { Id: 4, FromShapeId: 1, ToShapeId: 6, Text: null },
      { Id: 5, FromShapeId: 6, ToShapeId: 7, Text: null },
      { Id: 6, FromShapeId: 7, ToShapeId: 8, Text: null },
      { Id: 7, FromShapeId: 8, ToShapeId: 9, Text: null },
      { Id: 8, FromShapeId: 1, ToShapeId: 10, Text: null },
      { Id: 9, FromShapeId: 10, ToShapeId: 11, Text: null },

      { Id: 10, FromShapeId: 1, ToShapeId: 12, Text: null },
      { Id: 11, FromShapeId: 12, ToShapeId: 13, Text: null },
      { Id: 12, FromShapeId: 13, ToShapeId: 14, Text: null },
      { Id: 13, FromShapeId: 14, ToShapeId: 15, Text: null },
      { Id: 14, FromShapeId: 1, ToShapeId: 16, Text: null },
      { Id: 15, FromShapeId: 16, ToShapeId: 17, Text: null },
      { Id: 16, FromShapeId: 17, ToShapeId: 18, Text: null },
      { Id: 17, FromShapeId: 18, ToShapeId: 19, Text: null },
      { Id: 18, FromShapeId: 1, ToShapeId: 20, Text: null },
      { Id: 19, FromShapeId: 20, ToShapeId: 21, Text: null },

      { Id: 30, FromShapeId: 1, ToShapeId: 31, Text: null },
      { Id: 20, FromShapeId: 1, ToShapeId: 22, Text: null },
      { Id: 21, FromShapeId: 1, ToShapeId: 23, Text: null },
      { Id: 22, FromShapeId: 1, ToShapeId: 24, Text: null },
      { Id: 23, FromShapeId: 1, ToShapeId: 25, Text: null },
      { Id: 24, FromShapeId: 1, ToShapeId: 26, Text: null },
      { Id: 25, FromShapeId: 1, ToShapeId: 27, Text: null },
      { Id: 26, FromShapeId: 1, ToShapeId: 28, Text: null },
      { Id: 27, FromShapeId: 1, ToShapeId: 29, Text: null },
      { Id: 28, FromShapeId: 1, ToShapeId: 30, Text: null },
      { Id: 29, FromShapeId: 1, ToShapeId: 31, Text: null },
    ];
    function findChildNodes(node) {
      const childNodes = [];

      function findChildren(node) {
        for (const connection of data) {
          if (connection.FromShapeId === node.ToShapeId) {
            childNodes.push(connection.ToShapeId);
            findChildren(connection);
          }
        }
      }

      findChildren(node);
      return childNodes;
    }

    // Example usage:
    const givenNode = { Id: 1, FromShapeId: 2, ToShapeId: 27, Text: null };
    const childNodes = findChildNodes(givenNode);
    console.log(childNodes);
  }

  // private expandedView(){

  //
}
