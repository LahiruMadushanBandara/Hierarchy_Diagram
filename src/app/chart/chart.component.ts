import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import '@progress/kendo-ui';

declare var $: any;

@Component({
  selector: 'app-chart',
  template: `<div class="risk-card-content">
    <div class="risk-card-header-top">
      <p class="risk-card-header-top-text">Risk</p>
    </div>
    <div class="risk-card-header">
      <p class="risk-card-header-text">Protective and Cyber Security Ratings</p>
    </div>
    <div class="risk-card-body">
      <div class="row" style="display:flex;">
        <div style="background-color:green; width:50%;"><p>rating1</p></div>
        <div style="background-color:yellow; width:50%;"><p>rating2</p></div>
      </div>
      <div class="row" style="display:flex;">
        <div style="background-color:green; width:50%;"><p>rating3</p></div>
        <div style="background-color:yellow width:50%;"><p>rating4</p></div>
      </div>
    </div>
    <div class="risk-card-footer"></div>
  </div>`,
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('diagram', { static: false }) diagram: any;

  constructor() {}

  public diagramChart: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    function createDiagram() {
      // Import the Drawing API namespaces.
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      var riskemplate = `<div>hi</div>`;

      var riskTemplate = `<div class='risk-card-content'>
        <div class='risk-card-header-top'>
        <p class='risk-card-header-top-text'>Risk</p>
        </div>
        <div class='risk-card-header'>
        <p class='risk-card-header-text'>Protective and Cyber Security Ratings</p>
        </div>
        <div class='risk-card-body'>
        <div class='row' style='display:flex;'>
        <div style='background-color:green; width:50%;'><p>rating1</p></div>
        <div style='background-color:yellow; width:50%;'><p>rating2</p></div>
        </div>
        <div class='row' style='display:flex;'>
        <div style='background-color:green; width:50%;'><p>rating3</p></div>
        <div style='background-color:yellow width:50%;'><p>rating4</p></div>
        </div>
        </div>
        <div class='risk-card-footer'>
        </div>
      </div>`;

      var controlTemplate =
        "<div class='control-card-content'>" +
        "<div class='control-card-header'>" +
        '<h4>Modal Header</h4>' +
        '</div>' +
        "<div class='control-card-body'>" +
        '<p>Some text in the Modal Body</p>' +
        '<p>Some other text...</p>' +
        '</div>' +
        '</div>';

      // Compile the shape template.
      var riskNodeTemplate = kendo.template(riskTemplate);
      var controlNodeTemplate = kendo.template(controlTemplate);

      function visualTemplate(options: any) {
        // Render the template and bind it to the current data item.
        var dataItem = options.dataItem;
        var renderElement = $(
          "<div style='display:inline-block'; border:solid />"
        ).appendTo('body');
        if (dataItem.title === 'Risk') {
          renderElement.html(riskNodeTemplate(dataItem));
        } else {
          renderElement.html(controlNodeTemplate(dataItem));
        }

        // Create a new group that will hold the rendered content.
        var output = new kendo.drawing.Group();
        var width = renderElement.width();
        var height = renderElement.height();
        // Create a rectangle by using the renderElement dimensions to expand the group while waiting for its actual content.
        var geom = new kendo.geometry.Rect([0, 0], [width, height]);

        output.append(new kendo.drawing.Rect(geom, { stroke: { width: 0 } }));

        draw.drawDOM(renderElement, options).then(function (group) {
          /* Remove the helper rectangle. */
          output.clear();

          output.append(group);

          /* Clean up. */
          renderElement.remove();
        });

        var visual = new kendo.dataviz.diagram.Group();
        visual.drawingElement.append(output);

        return visual;
      }

      function subtype(type: any) {
        return 'left';
      }

      var data = [
        {
          title: 'Risk',
          items: [
            { title: 'Control1' },
            { title: 'Control2' },
            { title: 'Control3' },
            { title: 'Control4' },
          ],
        },
      ];

      $('#diagram').kendoDiagram({
        dataSource: {
          data: data,
          schema: {
            model: {
              children: 'items',
            },
          },
        },
        layout: {
          type: 'tree',
          subtype: 'mindmapHorizontal',
        },
        shapeDefaults: {
          visual: visualTemplate,
        },
      });
    }

    function diagramNodes() {
      var root = { name: '0', items: [] };
      addNodes(root, [3, 2, 2]);
      return [root];
    }

    function addNodes(root: any, levels: any) {
      if (levels.length > 0) {
        for (var i = 0; i < levels[0]; i++) {
          var node = { name: '0', items: [] };
          root.items.push(node);

          addNodes(node, levels.slice(1));
        }
      }
    }
    $(document).ready(createDiagram);
  }
}
