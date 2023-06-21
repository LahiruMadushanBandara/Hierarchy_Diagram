import { Component, ComponentFactoryResolver, Injector, ViewChild } from '@angular/core';
import { ControlNodeComponent } from './chart/nodes/control/control-node.component';
import { RiskNodeComponent } from './chart/nodes/risk/risk-node.component';
import '@progress/kendo-ui';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kendoOrgChartTest';

  @ViewChild('diagram', { static: false }) diagram: any;
  riskTemplate:string = "";
  controlTemplate:string = "";

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    
  ) { }

  ngOnInit(): void {

    const controlTemplateComponent = this.componentFactoryResolver
      .resolveComponentFactory(ControlNodeComponent).create(this.injector);

    const riskTemplateComponent = this.componentFactoryResolver
      .resolveComponentFactory(RiskNodeComponent).create(this.injector);

    var riskTemplate = riskTemplateComponent.location.nativeElement.innerHTML;
    //this.controlTemplate = controlTemplateComponent.location.nativeElement.innerHTML;

    var tempTitleDetail = "";

    // Import the Drawing API namespaces.
    
    var draw = kendo.drawing;


    function GetControlNodeTemplate(contentDetails : any){
      return "<div class='control-card-content'>"
      +"<div class='control-card-header'>"
        +"<h4>" + ((contentDetails === undefined) ? "Title" : contentDetails) + "</h4>"
        +"</div>"
        +"<div class='control-card-body'>"
          +"<p>"+((contentDetails === undefined) ? "Title" : contentDetails)+"</p>"
          +"<p>Some other text...</p>"
        +"</div>"
      +"</div>"
    }


    function GetRiskNodeTemplate(contentDetails : any){
      return "<div class='risk-card-content style'='border-radius: 25px;'>"
      +"<div class='risk-card-header-top' style='border-radius: 25px 25px 0px 0px'>"
        +"<p class='risk-card-header-top-text'>"+ ((contentDetails === undefined) ? "Title" : contentDetails) +"</p>"
      +"</div>"
      +"<div class='risk-card-header'>"
        +"<p class='risk-card-header-text'>Protective and Cyber Security Ratings</p>"
      +"</div>"
      +"<div class='risk-card-body'>"
        +"<div class='row' style='display: flex'>"
          +"<div style='background-color: blue; width: 50%'>"
            +"<p>rating1</p>"
          +"</div>"
          +"<div style='background-color: red; width: 50%'>"
            +"<p>rating2</p>"
          +"</div>"
        +"</div>"
        +"<div class='row' style='display: flex'>"
          +"<div class='ab'>"
            +"<p>rating3</p>"
          +"</div>"
          +"<div style='background-color: yellow; width: 50%'>"
            +"<p>rating4</p>"
          +"</div>"
        +"</div>"
      +"</div>"
      +"<div class='risk-card-footer' style='border-radius: 0px 0px 25px 25px'></div>"
    +"</div>"
    }




    function visualTemplate3(options: any) {

      var dataItem = options.dataItem;
      
      tempTitleDetail = dataItem.Title

      var rTemp = GetRiskNodeTemplate(tempTitleDetail);
      var cTemp = GetControlNodeTemplate(tempTitleDetail);

      sessionStorage.setItem("riskTemplate", rTemp
      );
      sessionStorage.setItem("controlTemplate", cTemp);


      if(rTemp === "" || rTemp === null || rTemp === undefined){
        rTemp = sessionStorage.getItem("riskTemplate");
      }
      if(cTemp === "" || cTemp === null || cTemp === undefined){
        cTemp = sessionStorage.getItem("controlTemplate");
      }
      
      var renderElement = $(
        "<div style='display:inline-block'; border:solid />"
      ).appendTo('body');

      if (dataItem.Type === 1) {
        riskTemplateComponent.instance.nodeDetail = dataItem;
        var riskNodeTemp = kendo.template(rTemp);
        renderElement.html(riskNodeTemp(dataItem));


      } else {
        controlTemplateComponent.instance.nodeDetail = dataItem;
        var controlNodeTemp = kendo.template(cTemp);
        renderElement.html(controlNodeTemp(dataItem));

      }

      // Create a new group that will hold the rendered content.
      var output = new kendo.drawing.Group();
      var width = renderElement.width();
      var height = renderElement.height();

      // Create a rectangle by using the renderElement dimensions to expand the group while waiting for its actual content.
      var geom = new kendo.geometry.Rect([0, 0], [width, height]);
      output.append(new kendo.drawing.Rect(geom, { stroke: { width: 0 } }));

      // Set the position of the node using the x and y coordinates from the data source.
      var x = parseInt(dataItem.x);
      var y = parseInt(dataItem.y);

      draw.drawDOM(renderElement, options).then(function (group) {
        /* Remove the helper rectangle. */
        output.clear();
        output.append(group);
      });
      var visual = new kendo.dataviz.diagram.Group();
      visual.drawingElement.append(output);
      return visual;
    }

    function onEdit(e){
      /* The result can be observed in the DevTools(F12) console of the browser. */
      //e.container.find(".k-edit-buttons").remove();
          console.log("Editing shape with model id: " + e.shape.id);
    }

    

    var originalData = [
      { "Id": 1, "Type": 1, "ParentNodeId": 0, "Title": "Risk Node", "Color": "", "x": 1470, "y": 260, htmlTemplate: "<div>Node 1</div>" },
      { "Id": 2, "Type": 2, "ParentNodeId": 1, "Title": "Control Node1", "Color": "#3399cc", "x": 1980, "y": 280, htmlTemplate: "<div>Node 2</div>" },
      { "Id": 3, "Type": 2, "ParentNodeId": 1, "Title": "Control Node2", "Color": "#3399cc", "x": 1790, "y": 1060, htmlTemplate: "<div>Node 3</div>" },
      { "Id": 4, "Type": 3, "ParentNodeId": 1, "Title": "Consequence Node1", "Color": "#3399cc", "x": 1500, "y": 1050, htmlTemplate: "<div>Node 4</div>" },
      { "Id": 5, "Type": 4, "ParentNodeId": 1, "Title": "Consequence Node2", "Color": "", "x": 1040, "y": 480, htmlTemplate: "<div>Node 1</div>" },
      { "Id": 6, "Type": 4, "ParentNodeId": 1, "Title": "Risk Node", "Color": "#3399cc", "x": 1980, "y": 480, htmlTemplate: "<div>Node 2</div>" },
      { "Id": 7, "Type": 4, "ParentNodeId": 1, "Title": "Risk Node", "Color": "#3399cc", "x": 1210, "y": 1060, htmlTemplate: "<div>Node 3</div>" },
      { "Id": 8, "Type": 4, "ParentNodeId": 1, "Title": "Risk Node", "Color": "#3399cc", "x": 1040, "y": 260, htmlTemplate: "<div>Node 4</div>" },
      { "Id": 9, "Type": 4, "ParentNodeId": 2, "Title": "Risk Node", "Color": "#3399cc", "x": 1900, "y": 1060, htmlTemplate: "<div>Node 3</div>" },
      { "Id": 10, "Type": 4, "ParentNodeId": 2, "Title": "Risk Node", "Color": "#3399cc", "x": 2000, "y": 1160, htmlTemplate: "<div>Node 4</div>" }
    ]

    $(function () {
      $(document).ready(function () {
        createDiagram();
      });

      var detailTemp = 
          "<div>"
            +"<h3 class='centre'>Selected Node Details</h3>"
            +"<div class='k-edit-label'>"
            +"<p> Details of the selected node can show here...... </p>"
            +"</div>"
          +"</div> "  
          
     function onCancel(e){
            e.preventDefault();
            e.container.closest(".k-popup-edit-form").data("kendoWindow").close();
      }

      function createDiagram() {
        
        var dataShapes = JSON.parse(sessionStorage.getItem("shapes"));

        if (!dataShapes || dataShapes.length == 0) {
          sessionStorage.setItem("shapes", JSON.stringify(originalData));
          dataShapes = originalData;
        } else {
          dataShapes = JSON.parse(sessionStorage.getItem("shapes"));
        }

        var dataConnections = [
          { "Id": 1, "FromShapeId": 1, "ToShapeId": 2, "Text": null },
          { "Id": 2, "FromShapeId": 1, "ToShapeId": 3, "Text": null },
          { "Id": 3, "FromShapeId": 1, "ToShapeId": 4, "Text": null },
          { "Id": 4, "FromShapeId": 1, "ToShapeId": 5, "Text": null },
          { "Id": 5, "FromShapeId": 1, "ToShapeId": 6, "Text": null },
          { "Id": 6, "FromShapeId": 1, "ToShapeId": 7, "Text": null },
          { "Id": 7, "FromShapeId": 1, "ToShapeId": 8, "Text": null },
          { "Id": 8, "FromShapeId": 2, "ToShapeId": 9, "Text": null },
          { "Id": 9, "FromShapeId": 2, "ToShapeId": 10, "Text": null }
        ];

        var kendoDiagram = $("#diagram").kendoDiagram({
          dataSource: ({
            data: dataShapes,
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { from: "Id", type: "number", editable: false },
                  Type: { type: "number" },
                  Color: { type: "string" }
                }
              }
            },
            change: function (ev) {
              var newData = [];
              var dataSourceData = ev.sender.view().toJSON();

              for (var i = 0; i < dataSourceData.length; i++) {

                var item = dataSourceData[i];
                newData.push({
                  "Id": item.id,
                  "Type": item.Type,
                  "Color": item.Color,
                  "x": item.x,
                  "y": item.y,
                  "Title":item.Title,
                });
              }
              sessionStorage.setItem("shapes", JSON.stringify(newData));
              console.log("saved");
            }
          }),
          connectionsDataSource: ({
            data: dataConnections,
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { from: "Id", type: "number", editable: false },
                  from: { from: "FromShapeId", type: "number" },
                  to: { from: "ToShapeId", type: "number" },
                  fromX: { from: "FromPointX", type: "number" },
                  fromY: { from: "FromPointY", type: "number" },
                  toX: { from: "ToPointX", type: "number" },
                  toY: { from: "ToPointY", type: "number" }
                }
              }
            }
          }),
          layout: false,
          edit:onEdit,
          click:onNodeClick,
          editable: {
            shapeTemplate: detailTemp,
            tools: [{
              type: "button",
              text: "Set Selected Content",
              click: function(e) {
                var selected = $("#diagram").getKendoDiagram().select();
                var content = $("#content").val();
                for (var idx = 0; idx < selected.length; idx++) {
                  selected[idx].content(content);
                }
              }
            }, {
              template: "<input id='content' class='k-textbox' value='Foo' />",
              enable:true
            }]
          },
          shapeDefaults: {
            stroke: {
              color: "#979797",
              width: 10
            },
            visual: visualTemplate3
          },
          connectionDefaults: {
            stroke: {
              color: "#979797",
              width: 2
            }
          },
          zoom: 0.4,
          cancel:onCancel
        });
        var diagram = $("#diagram").getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);

        for (var i = 0; i < diagram.shapes.length; i++) {
          diagram.shapes[i].options.stroke.width = 0;
        }
        diagram.refresh();

        // Hide other templates
        $(document.body).addClass('hide-control-card-content');
        $(document.body).addClass('hide-risk-card-content');
      }
    });

    function onNodeClick(node) {
      
      var diagram = $("#diagram").getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);

        diagram.refresh();
      //ReLoadDiagramWithSelectedNode(node);
      console.log(this.dataSource)
      // Do something when the node is clicked.
    }


    function ReLoadDiagramWithSelectedNode(node: any) {
      var diagram = $("#diagram").getKendoDiagram();
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

    var focused = false;

    $(".zoom-in").click(function () {
      var diagram = $('#diagram').getKendoDiagram();

      var point = diagram.boundingBox().center();
      diagram.zoom(diagram.zoom() + 0.1, { point: new kendo.dataviz.diagram.Point(point.x, point.y) })
      if (focused) {
        diagram.bringIntoView(diagram.shapes[10]);
      }
      else {
        diagram.bringIntoView(new kendo.dataviz.diagram.Rect(point.x, point.y));
      }
    });


    $(".zoom-out").click(function () {
      var diagram = $("#diagram").getKendoDiagram();
      var point = diagram.boundingBox().center();
      diagram.zoom(diagram.zoom() - 0.1, { point: new kendo.dataviz.diagram.Point(point.x, point.y) })
      if (focused) {
        diagram.bringIntoView(diagram.shapes[10]);
      }
      else {
        diagram.bringIntoView(new kendo.dataviz.diagram.Rect(point.x, point.y));
      }
    });
  }

  ngAfterViewInit(): void {
    
  }
}
