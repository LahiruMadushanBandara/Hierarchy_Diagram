import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import '@progress/kendo-ui';
import { TemplateStructureClass } from './utils/classes/TemplateStructureClass';

import { DataService } from './services/data.service';
import { findChildNodes } from './utils/functions/findChildrenClass';
import { NodePlaceClass } from './utils/classes/NodePlaceClass';
import { data } from './models/data.model';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('diagram', { static: false }) diagram: any;
  @ViewChild('buttonContainer', { static: true }) buttonContainer: ElementRef;

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    sessionStorage.clear();
    let dataConnection = this.dataService.dataConnections;
    let originalData: data[] = this.dataService.originalData;
    var isExpanded = false;
    var isNodeClicked = false;

    // Import the Drawing API namespaces.
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    //  var Templates = new TemplateStructureClass();

    const toggleExpand = (event: Event) => {
      event.preventDefault();
      const button = document.querySelector('.toggle-button') as HTMLElement; //Select the button element and cast it as an HTML element
      isExpanded = !isExpanded;

      //change the text content of the button
      if (isExpanded) {
        button.innerHTML = 'Normal';
        var diagram = $('#diagram').getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
        diagram.refresh();
      } else {
        button.innerHTML = 'Expand';
        var diagram = $('#diagram').getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
        diagram.refresh();
      }

      // Call the change detection manually
      this.cdr.detectChanges();
    };
    function visualTemplate(options: any) {
      var dataItem = options.dataItem;
      var Templates = new TemplateStructureClass(dataItem);

      var renderElement = $("<div style='display:inline-block' />").appendTo(
        'body'
      );

      //use template class to  render templates
      Templates.setView(renderElement, isExpanded, dataItem);

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

    // Create the button element
    const button = this.renderer.createElement('button');
    const buttonText = this.renderer.createText('Expand');
    this.renderer.appendChild(button, buttonText);
    this.renderer.addClass(button, 'toggle-button');

    // Add a click event listener to the button
    this.renderer.listen(button, 'click', toggleExpand);

    // Append the button to the buttonContainer element
    this.renderer.appendChild(this.buttonContainer.nativeElement, button);

    function onEdit(e) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
      //e.container.find(".k-edit-buttons").remove();
    }

    function arrangeNodes(originalData) {
      let arrangedNodes = [];

      // Find the risk node (type 1 with ParentNodeId 0)
      const centralizedNode = originalData.find(
        (node: data) => node.Type === 1 && node.ParentNodeId === 0
      );

      if (centralizedNode) {
        const typeTwoNodes = originalData.filter(
          (node: data) => node.Type === 2
        );
        const typeThreeNodes = originalData.filter(
          (node: data) => node.Type === 3
        );
        const typeFourNodes = originalData.filter(
          (node: data) => node.Type === 4
        );
        var nodePlace = new NodePlaceClass(
          typeTwoNodes,
          typeThreeNodes,
          centralizedNode,
          typeFourNodes
        );

        //get arranged nodes using node placing class
        arrangedNodes = nodePlace.getArrangedNodes();
      }

      return arrangedNodes;
    }

    if (isNodeClicked) {
    } else {
      const arrangedData = arrangeNodes(originalData);
    }

    $(function () {
      $(document).ready(function () {
        createDiagram();
      });

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

        var kendoDiagram = $('#diagram').kendoDiagram({
          dataSource: {
            data: dataShapes,
            schema: {
              model: {
                id: 'Id',
                fields: {
                  Id: { from: 'Id', type: 'number', editable: false },
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
            data: dataConnection,
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

          zoom: 0.5,
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
      isNodeClicked = true;
      var selectedNodeId = node.item.dataItem.id;
      var selectedNodeWithChildrens = findChildNodes(
        dataConnection,
        selectedNodeId
      );
      console.log('selectedNodeWithChildrens', selectedNodeWithChildrens);
      var clickedData: data[] = [];

      for (let i = 0; i < selectedNodeWithChildrens.childnodes.length; i++) {
        let clickedDataItem = originalData.filter(
          (x) => x.Id == selectedNodeWithChildrens.childnodes[i]
        );
        clickedData.push(clickedDataItem[0]);
      }
      console.log(clickedData);
      arrangeNodes(clickedData);
      sessionStorage.clear();
    }

    var focused = false;
  }
}
