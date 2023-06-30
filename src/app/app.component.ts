import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import '@progress/kendo-ui';
import { TemplateClass } from './utils/classes/TemplateClass';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('diagram', { static: false }) diagram: any;
  riskTemplate: string = '';
  controlTemplate: string = '';
  causeTemplate: string = '';
  consequencesTemplate: string = '';

  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    sessionStorage.clear();
    var tempTitleDetail = '';

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

      var rTemp = Templates.GetRiskNodeTemplateGlobal(dataItem);
      var cTemp = Templates.GetControlNodeTemplateGlobal(dataItem);
      var ccTemp = Templates.GetCauseTemplateGlobal(dataItem);
      var csTemp = Templates.GetConsequencesTemplateGlobal(dataItem);

      sessionStorage.setItem('riskTemplate', rTemp);
      sessionStorage.setItem('controlTemplate', cTemp);
      sessionStorage.setItem('causeTemplate', ccTemp);
      sessionStorage.setItem('consequencesTemplate', csTemp);

      if (rTemp === '' || rTemp === null || rTemp === undefined) {
        rTemp = sessionStorage.getItem('riskTemplate');
      }
      if (cTemp === '' || cTemp === null || cTemp === undefined) {
        cTemp = sessionStorage.getItem('controlTemplate');
      }
      if (ccTemp === '' || ccTemp === null || ccTemp === undefined) {
        ccTemp = sessionStorage.getItem('causeTemplate');
      }
      if (csTemp === '' || csTemp === null || csTemp === undefined) {
        csTemp = sessionStorage.getItem('consequencesTemplate');
      }

      var renderElement = $("<div style='display:inline-block' />").appendTo(
        'body'
      );

      if (dataItem.Title === 'Risk Node') {
        var riskNodeTemp = kendo.template(rTemp);
        renderElement.html(riskNodeTemp(dataItem));
      } else if (dataItem.Title === 'Control Node') {
        var controlNodeTemp = kendo.template(cTemp);
        renderElement.html(controlNodeTemp(dataItem));
      } else if (dataItem.Title === 'Consequences Node') {
        var consequencesTemp = kendo.template(csTemp);
        renderElement.html(consequencesTemp(dataItem));
      } else {
        var causeTemp = kendo.template(ccTemp);
        renderElement.html(causeTemp(dataItem));
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
        const horizontalSpacing = 500;
        const verticalSpacing = 300;
        const verticalSpacing4 = 200;
        const maxNodesPerRow = 4;
        const maxNodesPerRow4 = 12; // Updated to 12 nodes per row for type 4

        let type2Index = 0;
        let type3Index = 0;
        let type4Index = 0;

        const originX = 0;
        const originY = 0;

        // Arrange type 2 nodes (left of type 1)
        const type2Nodes = originalData.filter((node) => node.Type === 2);
        type2Nodes.forEach((node, index) => {
          const rowNumber = Math.floor(type2Index / maxNodesPerRow); // Calculate the row number
          const columnNumber = type2Index % maxNodesPerRow; // Calculate the column number

          const x = originX - (columnNumber + 1) * horizontalSpacing;
          const y = originY + rowNumber * verticalSpacing;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          type2Index++;
        });

        // Arrange type 1 (risk) node
        const type2Rows = Math.ceil(type2Nodes.length / maxNodesPerRow);
        // Move the risk node down a little bit
        const riskNodeX = originX - 30;
        const riskNodeY = originY + 190; // Adjust the Y-coordinate to move the risk node down
        riskNode.x = riskNodeX;
        riskNode.y = riskNodeY;
        arrangedNodes.push(riskNode);

        // Arrange type 3 nodes (right of type 1)
        const type3Nodes = originalData.filter((node) => node.Type === 3);
        type3Nodes.forEach((node, index) => {
          const rowNumber = Math.floor(type3Index / maxNodesPerRow); // Calculate the row number
          const columnNumber = type3Index % maxNodesPerRow; // Calculate the column number

          const x = originX + (columnNumber + 1) * horizontalSpacing;
          const y = originY + rowNumber * verticalSpacing;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          type3Index++;
        });

        // Arrange type 4 nodes (below type 2 and type 3)
        const type4Nodes = originalData.filter((node) => node.Type === 4);
        const maxType2Type3Rows = Math.max(
          type2Rows,
          Math.ceil(type3Nodes.length / maxNodesPerRow)
        );
        type4Nodes.forEach((node, index) => {
          const rowNumber = Math.floor(type4Index / maxNodesPerRow4); // Calculate the row number
          const columnNumber = type4Index % maxNodesPerRow4; // Calculate the column number

          const x = originX - (columnNumber - 5) * horizontalSpacing; // Adjusting the starting point for type 4 nodes
          const y =
            originY +
            (maxType2Type3Rows + 1) * verticalSpacing +
            (rowNumber + 1) * verticalSpacing4;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          type4Index++;
        });
      }

      return arrangedNodes;
    }

    var originalData = [
      {
        Id: 1,
        Type: 1,
        ParentNodeId: 0,
        Title: 'Risk Node',
        Color: '',
        htmlTemplate: '<div>Node 1</div>',
      },
      {
        Id: 2,
        Type: 2,
        ParentNodeId: 1,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 2</div>',
      },
      {
        Id: 3,
        Type: 2,
        ParentNodeId: 2,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 3</div>',
      },
      {
        Id: 4,
        Type: 2,
        ParentNodeId: 3,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 4</div>',
      },
      {
        Id: 5,
        Type: 2,
        ParentNodeId: 4,
        Title: 'Cause Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 5</div>',
      },
      {
        Id: 6,
        Type: 2,
        ParentNodeId: 1,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 6</div>',
      },
      {
        Id: 7,
        Type: 2,
        ParentNodeId: 6,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 7</div>',
      },
      {
        Id: 8,
        Type: 2,
        ParentNodeId: 7,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 8</div>',
      },
      {
        Id: 9,
        Type: 2,
        ParentNodeId: 8,
        Title: 'Cause Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 9</div>',
      },
      {
        Id: 10,
        Type: 2,
        ParentNodeId: 1,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 10</div>',
      },
      {
        Id: 11,
        Type: 2,
        ParentNodeId: 10,
        Title: 'Cause Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 11</div>',
      },
      {
        Id: 12,
        Type: 3,
        ParentNodeId: 1,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 12</div>',
      },
      {
        Id: 13,
        Type: 3,
        ParentNodeId: 12,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 13</div>',
      },
      {
        Id: 14,
        Type: 3,
        ParentNodeId: 13,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 14</div>',
      },
      {
        Id: 15,
        Type: 3,
        ParentNodeId: 14,
        Title: 'Cause Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 15</div>',
      },
      {
        Id: 16,
        Type: 3,
        ParentNodeId: 1,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 16</div>',
      },
      {
        Id: 17,
        Type: 3,
        ParentNodeId: 16,
        Title: 'Control Node',
        Color: '',
        htmlTemplate: '<div>Node 17</div>',
      },
      {
        Id: 18,
        Type: 3,
        ParentNodeId: 17,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 18</div>',
      },
      {
        Id: 19,
        Type: 3,
        ParentNodeId: 18,
        Title: 'Cause Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 19</div>',
      },
      {
        Id: 20,
        Type: 3,
        ParentNodeId: 1,
        Title: 'Control Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 20</div>',
      },
      {
        Id: 21,
        Type: 3,
        ParentNodeId: 20,
        Title: 'Cause Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 21</div>',
      },
      {
        Id: 22,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 22</div>',
      },
      {
        Id: 23,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 23</div>',
      },
      {
        Id: 24,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 24</div>',
      },
      {
        Id: 25,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 25</div>',
      },
      {
        Id: 26,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 26</div>',
      },
      {
        Id: 27,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 27</div>',
      },
      {
        Id: 28,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 28</div>',
      },
      {
        Id: 29,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 29</div>',
      },
      {
        Id: 30,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 30</div>',
      },
      {
        Id: 31,
        Type: 4,
        ParentNodeId: 1,
        Title: 'Consequences Node',
        Color: '#3399cc',
        htmlTemplate: '<div>Node 31</div>',
      },
    ];

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
          // { "Id": 29, "FromShapeId": 32, "ToShapeId": 31, "Text": null },
        ];

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
          layout: false,
          edit: onEdit,
          click: onNodeClick,
          editable: {
            shapeTemplate: detailTemp,
            tools: [
              {
                type: 'button',
                text: 'Set Selected Content',
                click: function (e) {
                  var selected = $('#diagram').getKendoDiagram().select();
                  var content = $('#content').val();
                  for (var idx = 0; idx < selected.length; idx++) {
                    selected[idx].content(content);
                  }
                },
              },
              {
                template:
                  "<input id='content' class='k-textbox' value='Foo' />",
                enable: true,
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
      // console.log(node.item.dataItem);
      this.nodeClickChek(node.item.dataItem);
      // diagram.refresh();
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
      // { "Id": 29, "FromShapeId": 32, "ToShapeId": 31, "Text": null },
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
}
