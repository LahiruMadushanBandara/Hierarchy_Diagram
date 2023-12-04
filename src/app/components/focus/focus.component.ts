import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import '@progress/kendo-ui';
import { TemplateService } from 'src/app/services/template.service';
declare var $: any;

@Component({
  selector: 'app-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.css'],
})
export class FocusComponent implements OnInit, AfterViewInit {
  @ViewChild('diagram1', { static: false }) diagram: any;
  riskTemplate: string = '';
  controlTemplate: string = '';
  causeTemplate: string = '';
  consequencesTemplate: string = '';

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    var tempTitleDetail = '';

    // Import the Drawing API namespaces.

    var draw = kendo.drawing;
    var geom = kendo.geometry;

    function GetControlNodeTemplate(contentDetails: any) {
      return (
        "<div class='control-card-content rounded'style=' border: ; border-radius: 10px;'>" +
        "<div class='control-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
        '<h4>' +
        (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
        '</h4>' +
        '</div>' +
        "<div class='control-card-body' style='padding: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
        '<p>' +
        (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
        '</p>' +
        contentDetails.htmlTemplate +
        '</div>' +
        '</div>'
      );
    }
    function GetConsequencesTemplate(contentDetails: any) {
      return (
        "<div class='consequences-card-content rounded'style=' border: ; border-radius: 10px 10px 10px 10px;'>" +
        "<div class='consequences-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
        '<h4>' +
        (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
        '</h4>' +
        '</div>' +
        "<div class='consequences-card-body' style='padding: 10px; border-radius: 10px 10px 10px 10px;'>" +
        '<p>' +
        (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
        '</p>' +
        contentDetails.htmlTemplate +
        '</div>' +
        '</div>'
      );
    }

    function GetCauseTemplate(contentDetails: any) {
      return (
        "<div class='cause-card-content rounded'style=' border: ; border-radius: 10px 10px 10px 10px;'>" +
        "<div class='cause-card-header' style=' padding: 10px;   border-radius: 10px 10px 0px 0px; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);'>" +
        '<h4>' +
        (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
        '</h4>' +
        '</div>' +
        "<div class='cause-card-body' style='padding: 10px; border-radius: 10px 10px 10px 10px;'>" +
        '<p>' +
        (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
        '</p>' +
        contentDetails.htmlTemplate +
        '</div>' +
        '</div>'
      );
    }
    function GetRiskNodeTemplate(contentDetails: any) {
      return (
        "<div class='risk-card-content rounded' style='border:none; border-radius: 10px; '>" +
        "<div class='risk-card-header-top' style='border-radius: 10px 10px 0 0;'>" +
        "<p class='risk-card-header-top-text'>" +
        (contentDetails.Title === undefined ? 'Title' : contentDetails.Title) +
        '</p>' +
        '</div>' +
        "<div class='risk-card-header'>" +
        "<p class='risk-card-header-text'>SR15-Protective and Cyber Security Ratings</p>" +
        '</div>' +
        "<div class='risk-card-body'>" +
        "<div class='row' style='display: flex;'>" +
        "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
        '<p><b>Inherent Rating</b></p>' +
        "<p style='display: flex; align-items: center; line-height: 1;'>" +
        "<img src='../assets/icon/Extream.png' style='width: 50px; height: 50px;'>" +
        "<span style='position: relative; top: -2px; margin-left: 5px;'>Extreme</span>" +
        '</p>' +
        '</div>' +
        "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
        '<p><b>Revised Rating</b></p>' +
        "<p style='display: flex; align-items: center; line-height: 1;'>" +
        "<img src='../assets/icon/Low.png' style='width: 50px; height: 50px;'>" +
        "<span style='position: relative; top: -2px; margin-left: 5px;'>Low</span>" +
        '</p>' +
        '</div>' +
        '</div>' +
        "<div class='row' style='display: flex;'>" +
        "<div class='column' style='background-color: white; width: 50%; padding-left: 15px;'>" +
        '<p><b>Future Rating</b></p>' +
        "<p style='display: flex; align-items: center; line-height: 1;'>" +
        "<img src='../assets/icon/High.png' style='width: 50px; height: 50px;'>" +
        "<span style='position: relative; top: -2px; margin-left: 5px;'>High</span>" +
        '</p>' +
        '</div>' +
        "<div style='background-color: white; width: 50%; padding-left: 15px;'>" +
        '<p><b>Risk Appetite</b></p>' +
        "<p style='display: flex; align-items: center; line-height: 1;'>" +
        "<img src='../assets/icon/WithinAppetite.png' style='width: 50px; height: 50px;'>" +
        "<span style='position: relative; top: -2px; margin-left: 5px;'>Within Appetite</span>" +
        '</p>' +
        '</div>' +
        '</div>' +
        "<div class='row' style='display: flex;'>" +
        "<div style='background-color: light gray; width: 50%; padding-left: 15px;'>" +
        '<p><b>Risk Category</b></p><p>customer/<br>Reliability</p>' +
        '</div>' +
        "<div style='background-color: light gray; width:50%; padding-left: 15px;'>" +
        '<p><b>Responsible Manager</b></p>' +
        "<p style='display: flex; align-items: center; line-height: 1;'>" +
        "<img src='https://api.sofascore.app/api/v1/team/197536/image' style='width: 30px; height: 30px;'>" +
        "<span style='position: relative; top: -2px; margin-left: 5px;'>Talia Gisbon</span>" +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        "<div class='risk-card-footer' style='border: border-radius: 0 0 10px 10px;'>" +
        "<div class='row' style='display: flex;'>" +
        "<div style='background-color: light gray; width: 50%; padding-left: 15px;'>" +
        '<p><b>Risk Category</b></p><p>customer/<br>Reliability</p>' +
        '</div>' +
        "<div style='background-color: light gray; width:50%; padding-left: 15px;'>" +
        '<p><b>Responsible Manager</b></p>' +
        "<p style='display: flex; align-items: center; line-height: 1;'>" +
        "<img src='https://api.sofascore.app/api/v1/team/197536/image' style='width: 30px; height: 30px;'>" +
        "<span style='position: relative; top: -2px; margin-left: 5px;'>Talia Gisbon</span>" +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>'
      );
    }

    function visualTemplate(options: any) {
      var dataItem = options.dataItem;
      tempTitleDetail = dataItem.Title;

      var rTemp = GetRiskNodeTemplate(dataItem);
      var cTemp = GetControlNodeTemplate(dataItem);
      var ccTemp = GetCauseTemplate(dataItem);
      var csTemp = GetConsequencesTemplate(dataItem);

      localStorage.setItem('riskTemplate1', rTemp);
      localStorage.setItem('controlTemplate1', cTemp);
      localStorage.setItem('causeTemplate1', ccTemp);
      localStorage.setItem('consequencesTemplate1', csTemp);

      // this.templateService.

      if (rTemp === '' || rTemp === null || rTemp === undefined) {
        rTemp = localStorage.getItem('riskTemplate1');
      }
      if (cTemp === '' || cTemp === null || cTemp === undefined) {
        cTemp = localStorage.getItem('controlTemplate1');
      }
      if (ccTemp === '' || ccTemp === null || ccTemp === undefined) {
        ccTemp = localStorage.getItem('causeTemplate1');
      }
      if (csTemp === '' || csTemp === null || csTemp === undefined) {
        csTemp = localStorage.getItem('consequencesTemplate1');
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

        let rowIndex = 0;

        let type2Index = 0;
        let type3Index = 0;
        let type4Index = 0;

        // Arrange type 1 (risk) node
        riskNode.x = 0;
        riskNode.y = 0;
        arrangedNodes.push(riskNode);

        // Arrange type 2 nodes (left of type 1)
        const type2Nodes = originalData.filter((node) => node.Type === 2);
        type2Nodes.forEach((node, index) => {
          const rowNumber = Math.floor(type2Index / maxNodesPerRow); // Calculate the row number
          const columnNumber = type2Index % maxNodesPerRow; // Calculate the column number

          const x = riskNode.x - (columnNumber + 1) * horizontalSpacing;
          const y = riskNode.y + rowNumber * verticalSpacing;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          type2Index++;
        });

        rowIndex =
          Math.max(
            rowIndex,
            Math.ceil(type2Nodes.length / maxNodesPerRow) + 1
          ) + 1;

        // Arrange type 3 nodes (right of type 1)
        const type3Nodes = originalData.filter((node) => node.Type === 3);
        type3Nodes.forEach((node, index) => {
          const rowNumber = Math.floor(type3Index / maxNodesPerRow); // Calculate the row number
          const columnNumber = type3Index % maxNodesPerRow; // Calculate the column number

          const x = riskNode.x + (columnNumber + 1) * horizontalSpacing;
          const y = riskNode.y + rowNumber * verticalSpacing;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          type3Index++;
        });

        rowIndex = Math.max(
          rowIndex,
          Math.ceil(type3Nodes.length / maxNodesPerRow) + 1
        );

        // Arrange type 4 nodes (below type 2 and type 3)
        const type4Nodes = originalData.filter((node) => node.Type === 4);
        type4Nodes.forEach((node, index) => {
          const rowNumber = Math.floor(type4Index / maxNodesPerRow4); // Calculate the row number
          const columnNumber = type4Index % maxNodesPerRow4; // Calculate the column number

          const x = riskNode.x - (columnNumber - 5) * horizontalSpacing; // Adjusting the starting point for type 4 nodes
          const y =
            riskNode.y +
            rowIndex * verticalSpacing4 +
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
        var dataShapes = JSON.parse(localStorage.getItem('shapes'));

        if (!dataShapes || dataShapes.length == 0) {
          localStorage.setItem('shapes', JSON.stringify(originalData));
          dataShapes = originalData;
        } else {
          dataShapes = JSON.parse(localStorage.getItem('shapes'));
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

        var kendoDiagram = $('#diagram1').kendoDiagram({
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
              localStorage.setItem('shapes', JSON.stringify(newData));
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

        var diagram = $('#diagram1').getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
        for (var i = 0; i < diagram.shapes.length; i++) {
          diagram.shapes[i].options.stroke.width = 0;
        }
        diagram.refresh();

        // Hide other templates
        $(document.body).addClass('hide-control-card-content');
        $(document.body).addClass('hide-cause-card-content');
        $(document.body).addClass('hide-risk-card-content');
        $(document.body).addClass('hide-concequences-card-content');
      }
    });

    function onNodeClick(node) {
      var diagram = $('#diagram1').getKendoDiagram();
      diagram.bringIntoView(diagram.shapes);

      diagram.refresh();
      ReLoadDiagramWithSelectedNode(node);
      console.log(this.dataSource);
      // Do something when the node is clicked.
    }

    function ReLoadDiagramWithSelectedNode(node: any) {
      var diagram = $('#diagram1').getKendoDiagram();
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
      $('#diagram1').kendoDiagram({
        // ... other diagram configurations ...
        click: onNodeClick,
      });
    });

    var focused = false;

    $('.zoom-in').click(function () {
      var diagram = $('#diagram1').getKendoDiagram();

      var point = diagram.boundingBox().center();
      diagram.zoom(diagram.zoom() + 0.1, {
        point: new kendo.dataviz.diagram.Point(point.x, point.y),
      });
      if (focused) {
        diagram.bringIntoView(diagram.shapes[10]);
      } else {
        diagram.bringIntoView(new kendo.dataviz.diagram.Rect(point.x, point.y));
      }
    });

    $('.zoom-out').click(function () {
      var diagram = $('#diagram1').getKendoDiagram();
      var point = diagram.boundingBox().center();
      diagram.zoom(diagram.zoom() - 0.1, {
        point: new kendo.dataviz.diagram.Point(point.x, point.y),
      });
      if (focused) {
        diagram.bringIntoView(diagram.shapes[10]);
      } else {
        diagram.bringIntoView(new kendo.dataviz.diagram.Rect(point.x, point.y));
      }
    });
  }

  ngAfterViewInit(): void { }
}
