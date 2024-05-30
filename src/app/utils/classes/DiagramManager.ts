export class DiagramManager {
  constructor() { }

  public linkedNodesToClickedNode = [];
  public  connectionsDataSource = {
    data: []
  };
  public updateConnectionColors(connections) {
    var connColor;

    enum ConnectionColor {
      Red = "red",
      Green = "yellow",
      LightBlue = "blue",
      DarkBlue = "green",
      Default = "gray"
    }
    for (var idx = 0; idx < connections.length; idx++) {
      if (connections[idx] instanceof kendo.dataviz.diagram.Connection) {
        switch (connections[idx].dataItem.color) {
          case "1":
            connColor = ConnectionColor.Red;
            break;
          case "2":
            connColor = ConnectionColor.Green;
            break;
          case "3":
            connColor = ConnectionColor.LightBlue;
            break;
          case "4":
            connColor = ConnectionColor.DarkBlue;
            break;
          default:
            connColor = ConnectionColor.Default;
        }
        connections[idx].redraw({
          stroke: {
            color: connColor
          }
        });
      }
    }
  }

  public handlePan(e, diagram) {
    // Record the starting mouse position for panning
    if (!diagram.panStart) {
      diagram.panStart = { x: e.origin.x, y: e.origin.y };
    }

    // Calculate the difference in mouse position and pan the diagram
    var panX = e.origin.x - diagram.panStart.x;
    var panY = e.origin.y - diagram.panStart.y;
    diagram.pan(panX, panY);

    // Update the starting mouse position for the next pan event
    diagram.panStart = { x: e.origin.x, y: e.origin.y };
  }

  public updateDiagramDimensions(diagram) {
    // Calculate the available screen width and height
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
   
    // Calculate a reasonable diagram size based on screen dimensions
    var diagramWidth = Math.min(screenWidth - 50);
    var diagramHeight = Math.min(screenHeight + 100); 

    // Update the diagram's dimensions
    diagram.wrapper.width(diagramWidth);
    diagram.wrapper.height(diagramHeight);
    diagram.resize();
  }
  

  public onNodeClick(e, clicked: boolean, diagram, dataArrayoriginal) {
    this.linkedNodesToClickedNode = [];  //create linkedNodesToClickedNode array to recreate the datasource  
    this.connectionsDataSource = { data: [] };
    var clickedNodeId = e.item.dataItem.id;
    var dataArray = diagram.dataSource.data();
    var reloadButton = document.getElementById("btReload");
    reloadButton.style.display = "flex";// Show the button

    if (e.item.dataItem.Header == "Control") { 
      clicked = true;
      //push clicked node to the array 
      if(clicked){
      this.linkedNodesToClickedNode.push(e.item.dataItem);

      for (var i = 0; i < dataArray.length; i++) {
        var node = dataArray[i];
        var nodes = dataArrayoriginal[i];

        // push nodes that are linked to clicked node
        if (Array.isArray(nodes.LinkedControlIds) && nodes.LinkedControlIds.includes(clickedNodeId) || nodes.Header == "Risk") {
          this.linkedNodesToClickedNode.push(node);
        }
      }

      //rectreate the connection source
      const CauseNodes = this.linkedNodesToClickedNode.filter((node) => node.Title == 'Cause Node');
      let isCausePrimary = false

      for (let i = 1; i < this.linkedNodesToClickedNode.length; i++) {
        for (let i = 0; i < CauseNodes.length; i++) {

          if (CauseNodes[i].id == this.linkedNodesToClickedNode[0].LinkedControlIds[0]) {

            isCausePrimary = true
            break
          }
        }
        if (isCausePrimary == true && this.linkedNodesToClickedNode[i].Title == 'Cause Node') {
          var conObj = {

            from: this.linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: this.linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };
          this.connectionsDataSource.data.push(conObj);
        } else if (isCausePrimary == true && this.linkedNodesToClickedNode[i].Title == 'Consequences Node') {
          var conObj = {

            from: this.linkedNodesToClickedNode[1].id.toString(), // Convert to string
            to: this.linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };
          this.connectionsDataSource.data.push(conObj);
        }
        else if (isCausePrimary == false && this.linkedNodesToClickedNode[i].Title == 'Cause Node') {
          var conObj = {

            from: this.linkedNodesToClickedNode[1].id.toString(), // Convert to string
            to: this.linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };
          this.connectionsDataSource.data.push(conObj);
        } else if (isCausePrimary == false && this.linkedNodesToClickedNode[i].Title == 'Consequences Node') {
          var conObj = {

            from: this.linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: this.linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };
          this.connectionsDataSource.data.push(conObj);
        }
        else {
          var conObj = {

            from: this.linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: this.linkedNodesToClickedNode[1].id.toString()    // Convert to string
          };
          this.connectionsDataSource.data.push(conObj);
        }


      }      // for (let i = 1; i < linkedNodesToClickedNode.length; i++) {
      //   var conObj = {

      //     from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
      //     to: linkedNodesToClickedNode[i].id.toString()    // Convert to string
      //   };
      //   connectionsDataSource.data.push(conObj);
      // }





      // ReSet the data source and connections data source
    }
    
    }

     if (e.item.dataItem.Header == "Cause" || e.item.dataItem.Header == "Consequence") {
      var node = dataArray[i];
      this.linkedNodesToClickedNode.push(e.item.dataItem);
      this.linkedNodesToClickedNode.push(dataArray[1]);
     


      for (var i = 0; i < e.item.dataItem.LinkedControlIds.length; i++) {
         
        const controlNode = dataArray.find(node => e.item.dataItem.LinkedControlIds[i]  ===  node.id);
        this.linkedNodesToClickedNode.push(controlNode);
      }

      for (let i = 1; i < this.linkedNodesToClickedNode.length; i++)
       {
        var conObj = {

          from: this.linkedNodesToClickedNode[0].id.toString(), // Convert to string
          to: this.linkedNodesToClickedNode[i].id.toString()    // Convert to string
        };
        this.connectionsDataSource.data.push(conObj);
       }
      
    }
    
    e.sender.setDataSource(this.linkedNodesToClickedNode);
    e.sender.setConnectionsDataSource(this.connectionsDataSource);

    diagram.bringIntoView(diagram.shapes);
    diagram.refresh();
    clicked = false;
    return this.linkedNodesToClickedNode;
  }




  

  public GetToolbarTemplate() {
    return `

    <div>
    <h3  class="bt-analsys-header-txt">Bow Tie Analysis</h3>

    <div class="k-actions btn-row-bottom k-actions-end align-items-start button-flex">  


        <div kendoTooltip position="bottom" [title]="'Back'">
        <button type="button" class="bt-Reload btn bow-tie-btn-outline-primary" id="btReload"  style="display: none;">
          <span>Back</span>
        </button>
        </div>

        <div kendoTooltip position="bottom" [title]="'Risk View'">
            <button type="button" class="bt-Risk btn bow-tie-btn-outline-primary" id="btRiskView" >
              <span>Risk View</span>
            </button>
        </div>

        <div kendoTooltip position="bottom" [title]="'Kpi View'">
            <button type="button" class="bt-Kpi btn bow-tie-btn-outline-primary" id="btKpikView" >
                <span>Kpi View</span>
            </button>
        </div>

        <div kendoTooltip position="bottom" [title]="'Performance View'">
          <button type="button" class="bt-Performance btn bow-tie-btn-outline-primary" id="btPerformanceView" >
              <span>Performance View</span>
          </button>
        </div>

        <div kendoTooltip position="bottom" [title]="'Expand Nodes'">
            <button type="button" class="bt-Expand btn bow-tie-btn-outline-primary" id="btExpandView">
                <span class="expand-icon"></span>
                <span class="collapse-icon hide-icon"></span>
                <span class="text">Expand</span>                      
            </button>
        </div>
        

        <div kendoTooltip position="bottom" [title]="'Export Diagram'">
          <button type="button" class="btn-Export btn bow-tie-btn-outline-primary" id="btExport" >
              <i class="cam-icon cam-i-export" aria-hidden="true"></i>
              <span>Export</span>
          </button>
        </div>
      </div>                  
    </div>      
      `;
  }

  // public ButtonEvents(diagram: any, dataShapes: any,dataConnections:any , isExpand:boolean) {

    
      
  // }

}