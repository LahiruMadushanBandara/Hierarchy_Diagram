
export class DiagramManager {
  constructor() { }

  public dataConnections = [];



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

  public updateDiagramDimensions(diagram, dataArrayoriginal) {
    // Calculate the available screen width and height
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    // Calculate a reasonable diagram size based on screen dimensions
    var diagramWidth = Math.min(screenWidth - 50);
    var diagramHeight = Math.min(screenHeight + 100);

    // Update the diagram's dimensions
    diagram.wrapper.width(diagramWidth);
    diagram.wrapper.height(diagramHeight);
    // diagram.resize();
    var zoomLevel = Math.min(screenWidth / diagramWidth, screenHeight / diagramHeight) * 0.75;


    const zoomPointX = dataArrayoriginal[1].x + 100;
    const zoomPointY = dataArrayoriginal[1].y;


    diagram.zoom(zoomLevel + 0.02, { point: new kendo.dataviz.diagram.Point(zoomPointX, zoomPointY) });



  }

  public onNodeClick(e, clicked: boolean, diagram, dataArrayoriginal) {

    if (e.item.dataItem.Header == "Control") {
      $('#btExpandView').prop("disabled", true);
      $('#btExport').prop("disabled", true);

      var clickedNodeId = e.item.dataItem.id;
      clicked = true;

      var dataArray = diagram.dataSource.data();
      var linkedNodesToClickedNode = [];


      var reloadButton = document.getElementById("btReload");
      if (clicked) {
        reloadButton.style.display = "flex"; // Show the button
      } else {
        reloadButton.style.display = "none"; // Hide the button
      }

      //create linkedNodesToClickedNode array to recreate the datasource
      if (clicked) {

        //push clicked node to the array 
        linkedNodesToClickedNode.push(e.item.dataItem);
        for (var i = 0; i < dataArray.length; i++) {
          var node = dataArray[i];
          var nodes = dataArrayoriginal[i];

          // push nodes that are linked to clicked node
          if (Array.isArray(nodes.LinkedControlIds) && nodes.LinkedControlIds.includes(clickedNodeId) || nodes.Header == "Risk") {
            linkedNodesToClickedNode.push(node);
          }
        }
      }

      // ReSet the data source and connections data source

      const CauseNodes = linkedNodesToClickedNode.filter((node) => node.Title == 'Cause Node');
      let isCausePrimary = false
      //rectreate the connection source
      var connectionsDataSource = {
        data: []
      };

      for (let i = 1; i < linkedNodesToClickedNode.length; i++) {
        for (let i = 0; i < CauseNodes.length; i++) {      
          if (CauseNodes[i].id == linkedNodesToClickedNode[0].LinkedControlIds[0]) {
            isCausePrimary = true
            break
          }
        }
        if (isCausePrimary == true && linkedNodesToClickedNode[i].Title == 'Cause Node') {
          var conObj = {

            from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };
          connectionsDataSource.data.push(conObj);
        } else if (isCausePrimary == true && linkedNodesToClickedNode[i].Title == 'Consequences Node') {
          var conObj = {

            from: linkedNodesToClickedNode[1].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };
          connectionsDataSource.data.push(conObj);
        }
        else if (isCausePrimary == false && linkedNodesToClickedNode[i].Title == 'Cause Node') {
          var conObj = {

            from: linkedNodesToClickedNode[1].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };
          connectionsDataSource.data.push(conObj);
        } else if (isCausePrimary == false && linkedNodesToClickedNode[i].Title == 'Consequences Node') {
          var conObj = {

            from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString()    // Convert to string
          };
          connectionsDataSource.data.push(conObj);
        }
        else {
          var conObj1 = {

            from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[1].id.toString(),
            toConnector: "top"    // Convert to string
          };
          connectionsDataSource.data.push(conObj1);
        }


      }

      e.sender.setDataSource(linkedNodesToClickedNode);
      e.sender.setConnectionsDataSource(connectionsDataSource);

      diagram.bringIntoView(diagram.shapes);


      clicked = false;
    }

    return linkedNodesToClickedNode;
  }

  public GetToolbarTemplate() {
    return `

    <div>
      <h3  class="bt-analsys-header-txt">Bow Tie Analysis</h3>

      <div class="k-actions btn-row-bottom k-actions-end align-items-start button-flex">            

          <div kendoTooltip position="bottom" [title]="'Back'">
          <button type="button" class="bt-BackFromCentralizedView btn bow-tie-btn-outline-primary" id="btReload"  style="display: none;">
            <span>Back</span>
          </button>
          </div>

          <div kendoTooltip position="bottom" [title]="'Expand Nodes'">
            <button type="button" class="bt-Expand btn bow-tie-btn-outline-primary" id="btExpandView">
                <span class="expand-icon"></span>
                <span class="collapse-icon hide-icon"></span>
                <span class="text">Expand Panel</span>                      
            </button>
          </div>

          <div kendoTooltip position="bottom" [title]="'Export Diagram'">
            <button type="button" class="btn-Export btn bow-tie-btn-outline-primary" id="btExport" >
                <i class="cam-icon cam-i-export" aria-hidden="true"></i>
                <span>Export</span>
            </button>
          </div>

          <div kendoTooltip position="bottom" [title]="'Return Diagram'">
            <button  type="button" class="btn-Return btn bow-tie-btn-outline-primary"id="btReturn" >
                      <i class="cam-icon cam-i-a0001-nav-back" aria-hidden="true"></i>
                      <span>Return</span>   
            </button>          
          </div>                            
              
      </div>                  
  </div>        
      `;
  }

  public CreateDataConnection(originalData) {
    //create data connection

    var notLinkedControlsTypeTwo: any[] = [];
    var notLinkedControlsTypeThree: any[] = [];
    let IncidentNodes = originalData.filter((node) => node.Header == 'Incident');
    let KPINodes = originalData.filter((node) => node.Header == 'KPI');
    let TreatmentNodes = originalData.filter((node) => node.Header == 'Action');
    let AuditNodes = originalData.filter((node) => node.Header == 'Audit');
    let HierarchyNodes = originalData.filter((node) => node.Header == 'Hierarchy Linkages');
    let AuditRecommendationNodes = originalData.filter((node) => node.Header == 'Audit Recommendations');
    let AuditFindingNodes = originalData.filter((node) => node.Header == 'Audit Finding');
    let PolicyNodes = originalData.filter((node) => node.Header == 'Policy');
    let linkRiskNodes = originalData.filter((node) => node.Header == 'Linked Risk');
    let ObligationNodes = originalData.filter((node) => node.Header == 'Obligation');
    let AuthorityDocumentNodes = originalData.filter((node) => node.Header == 'Authority Document');

    // Function to check if there are nodes with Type === 4
    let hasType4Nodes = false;
    for (let k = 0; k < originalData.length; k++) {
      if (originalData[k].Type === 4) {
        hasType4Nodes = true;
        break;
      }
    }
    //creating connection lines       
    for (let i = 1; i < originalData.length; i++) {

      if (originalData[i].Title === "Risk Node" && hasType4Nodes) {
        this.dataConnections.push({
          Id: 0,
          FromShapeId: originalData[0].Id,
          ToShapeId: originalData[i].Id,
          Text: null,
          color: '#323250',
          fromConnector: "center",
          toConnector: "bottom"
        });
      }
      var ControlNodesLinkedToCause = []
      var primaryLinkedcontrols = []
      var controlId: number


      if ((originalData[i].Title === "Cause Node" || originalData[i].Title === "Consequences Node") && originalData[i].ParentNodeId != 0) {

        for (let j = 0; j < originalData[i].LinkedControlIds.length + 1; j++) {

          controlId = originalData[i].LinkedControlIds[j];
          // Find the control node in originalData with the controlId
          var controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode) {
            ControlNodesLinkedToCause.push(controlNode);
            if (controlNode.LinkedControlIds[0] == originalData[i].Id) {
              primaryLinkedcontrols.push(controlId)
            }
          }
        }

        for (let j = 0; j < primaryLinkedcontrols.length + 1; j++) {
          if (primaryLinkedcontrols.length === 1) {
            this.dataConnections.push({
              Id: j,
              FromShapeId: (j === 0) ? 0 : primaryLinkedcontrols[0],
              ToShapeId: (j === 0) ? primaryLinkedcontrols[0] : originalData[i].Id,
              Text: null,
              fromConnector: (j === 0 && originalData[i].Title === "Cause Node") ? "left" :
                (j === 0 && originalData[i].Title === "Consequences Node") ? "right" : "auto",
              toConnector: "auto"

            });
          }

          else if (primaryLinkedcontrols.length > 4) {
            if ((j + 1) % 4 == 0 && j != primaryLinkedcontrols.length) {
              this.dataConnections.push({
                Id: j,
                FromShapeId: primaryLinkedcontrols[j],
                ToShapeId: originalData[i].Id,
                Text: null,
                fromConnector: (originalData[i].Title === "Cause Node") ? "left" : "right",
                toConnector: "auto"
              });
            }
            if (!(j % 4 === 0 && j === primaryLinkedcontrols.length)) {
              this.dataConnections.push({
                Id: j,
                FromShapeId: (j % 4 == 0) ? 0 : primaryLinkedcontrols[j - 1],
                ToShapeId: (j === primaryLinkedcontrols.length) ? originalData[i].Id : primaryLinkedcontrols[j],
                Text: null,
                fromConnector: (originalData[i].Title === "Cause Node") ? "left" : "right",

              });

            }
          }
          else {
            this.dataConnections.push({
              Id: j,
              FromShapeId: (j === 0) ? 0 : primaryLinkedcontrols[j - 1],
              ToShapeId: (j === primaryLinkedcontrols.length) ? originalData[i].Id : primaryLinkedcontrols[j],
              Text: null,
              fromConnector: (originalData[i].Title === "Cause Node") ? "left" : "right",
              toConnector: "auto"
            });

          }

        }


        ControlNodesLinkedToCause = [];
        primaryLinkedcontrols = []

      }

      if ((originalData[i].Title === "Cause Node" || originalData[i].Title === "Consequences Node") && originalData[i].ParentNodeId === 0) {
        this.dataConnections.push({
          Id: originalData[i].Id,
          FromShapeId: 0,
          ToShapeId: originalData[i].Id,
          Text: null,
          fromConnector: (originalData[i].Title === "Cause Node") ? "left" : "right",
          toConnector: "auto"
        });
      }

    }
    // Collect all "Control Node" type 2 and 3 elements with IsLinkedToCauseOrConsequence set to false
    for (let i = 0; i < originalData.length; i++) {
      if (originalData[i].Title === "Control Node" && originalData[i].Type === 2 && !originalData[i].ControlData.IsLinkedToCauseOrConsequence) {
        notLinkedControlsTypeTwo.push(originalData[i]);
      }

      if (originalData[i].Title === "Control Node" && originalData[i].Type === 3 && !originalData[i].ControlData.IsLinkedToCauseOrConsequence) {
        notLinkedControlsTypeThree.push(originalData[i]);
      }
    }
    // Generate connection lines based on notLinkedControls - type two
    for (let j = 0; j < notLinkedControlsTypeTwo.length; j++) {
      this.dataConnections.push({
        Id: notLinkedControlsTypeTwo[j].Id, // Assuming you have the correct index or unique identifier for Id
        FromShapeId: (j == 0 || j % 4 == 0) ? 0 : notLinkedControlsTypeTwo[j - 1].Id,
        ToShapeId: notLinkedControlsTypeTwo[j].Id,
        Text: null,
        toConnector: "right",
        fromConnector: "left", // Adjusted to use notLinkedControls[j] instead of originalData[i]
      });
    }
    // Generate connection lines based on notLinkedControls -type three
    for (let j = 0; j < notLinkedControlsTypeThree.length; j++) {
      this.dataConnections.push({
        Id: notLinkedControlsTypeThree[j].Id, // Assuming you have the correct index or unique identifier for Id
        FromShapeId: (j == 0 || j % 4 == 0) ? 0 : notLinkedControlsTypeThree[j - 1].Id,
        ToShapeId: notLinkedControlsTypeThree[j].Id,
        Text: null,
        toConnector: "left",
        fromConnector: "right", // Adjusted to use notLinkedControls[j] instead of originalData[i]
      });
    }
    //generate connection lines for bottom nodes 
    for (let j = 0; j < IncidentNodes.length; j++) {
      this.dataConnections.push({
        Id: IncidentNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : IncidentNodes[j - 1].Id,
        ToShapeId: IncidentNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < KPINodes.length; j++) {
      this.dataConnections.push({
        Id: KPINodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : KPINodes[j - 1].Id,
        ToShapeId: KPINodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < TreatmentNodes.length; j++) {
      this.dataConnections.push({
        Id: TreatmentNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : TreatmentNodes[j - 1].Id,
        ToShapeId: TreatmentNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < AuditNodes.length; j++) {
      this.dataConnections.push({
        Id: AuditNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : AuditNodes[j - 1].Id,
        ToShapeId: AuditNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < HierarchyNodes.length; j++) {
      this.dataConnections.push({
        Id: HierarchyNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : HierarchyNodes[j - 1].Id,
        ToShapeId: HierarchyNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < AuditRecommendationNodes.length; j++) {
      this.dataConnections.push({
        Id: AuditRecommendationNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : AuditRecommendationNodes[j - 1].Id,
        ToShapeId: AuditRecommendationNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < AuditFindingNodes.length; j++) {
      this.dataConnections.push({
        Id: AuditFindingNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : AuditFindingNodes[j - 1].Id,
        ToShapeId: AuditFindingNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < PolicyNodes.length; j++) {
      this.dataConnections.push({
        Id: PolicyNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : PolicyNodes[j - 1].Id,
        ToShapeId: PolicyNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < linkRiskNodes.length; j++) {
      this.dataConnections.push({
        Id: linkRiskNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : linkRiskNodes[j - 1].Id,
        ToShapeId: linkRiskNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < ObligationNodes.length; j++) {
      this.dataConnections.push({
        Id: ObligationNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : ObligationNodes[j - 1].Id,
        ToShapeId: ObligationNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
    for (let j = 0; j < AuthorityDocumentNodes.length; j++) {
      this.dataConnections.push({
        Id: AuthorityDocumentNodes[j].Id,
        FromShapeId: (j == 0) ? originalData[0].Id : AuthorityDocumentNodes[j - 1].Id,
        ToShapeId: AuthorityDocumentNodes[j].Id,
        Text: null,
        fromConnector: (j == 0) ? "center" : "bottom",
        toConnector: "top"
      });
    }
  }
}