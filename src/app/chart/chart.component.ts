import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import '@progress/kendo-ui';

declare var $: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('my') input;
  @ViewChild('my2') input2;

  @ViewChild('diagram', { static: false }) diagram: any;

  constructor() {}

  public diagramChart: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    var ab = this.input.nativeElement.outerHTML;
    var cd = this.input2.nativeElement.outerHTML;
    function createDiagram() {
      // Import the Drawing API namespaces.
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      var rs = `${ab}`;

      var controlTemplate = `${cd}`;

      // Compile the shape template.
      var riskNodeTemplate = kendo.template(rs);

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
          // renderElement.remove();
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
