import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import '@progress/kendo-ui';
import { ControlNodeComponent } from './nodes/control/control-node.component';
import { RiskNodeComponent } from './nodes/risk/risk-node.component';

declare var $: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})

export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('diagram', { static: false }) diagram: any;
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
    ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    debugger;
    const controlTemplateComponent = this.componentFactoryResolver
    .resolveComponentFactory(ControlNodeComponent).create(this.injector);

    const riskTemplateComponent = this.componentFactoryResolver
    .resolveComponentFactory(RiskNodeComponent).create(this.injector);

    var riskTemplate = riskTemplateComponent.location.nativeElement.innerHTML;
    var controlTemplate = controlTemplateComponent.location.nativeElement.innerHTML;

    function createDiagram() {
      // Import the Drawing API namespaces.
      var geom = kendo.geometry;
      var draw = kendo.drawing;

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
        });

        var visual = new kendo.dataviz.diagram.Group();
        visual.drawingElement.append(output);

        return visual;
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

      // Hide other templates
      $(document.body).addClass('hide-control-card-content');
      $(document.body).addClass('hide-risk-card-content');
    }
    $(document).ready(createDiagram);
  }
}
