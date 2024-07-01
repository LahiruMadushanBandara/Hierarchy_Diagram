import { NodeHeaderTypes } from '../Enums/node-headers';
export class DiagramManager {
  constructor() {}

  public dataConnections = [];

  public handlePan(e, diagram: any) {
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

  public updateDiagramDimensions(diagram: any, dataArrayoriginal: any) {
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
    var zoomLevel =
      Math.min(screenWidth / diagramWidth, screenHeight / diagramHeight) * 0.75;

    const zoomPointX = dataArrayoriginal[1].x + 100;
    const zoomPointY = dataArrayoriginal[1].y;

    diagram.zoom(zoomLevel + 0.02, {
      point: new kendo.dataviz.diagram.Point(zoomPointX, zoomPointY),
    });
  }

  public onNodeClick(e, clicked: boolean,diagram: any,dataArrayoriginal: any ) {
    if (e.item.dataItem.Header == NodeHeaderTypes.Control) {
      $('#btExpandView').prop('disabled', true);
      $('#btExport').prop('disabled', true);
      clicked = true;
      var clickedNodeId = e.item.dataItem.id;     
      var dataArray = diagram.dataSource.data();
      var linkedNodesToClickedNode = [];
      var reloadButton = document.getElementById('backButton');
      reloadButton.style.display = 'flex'; // Show the button

      //create linkedNodesToClickedNode array to recreate the datasource
      
        //push clicked node to the array
        linkedNodesToClickedNode.push(e.item.dataItem);
        for (var i = 0; i < dataArray.length; i++) {
          var nodes = dataArrayoriginal[i];
          // push nodes that are linked to clicked node
          if (
            (Array.isArray(nodes.LinkedControlIds) &&
              nodes.LinkedControlIds.includes(clickedNodeId)) ||
            nodes.Header == NodeHeaderTypes.Risk
          ) {
            linkedNodesToClickedNode.push(nodes);
          }
        }
      

      // ReSet the data source and connections data source

      const CauseNodes = linkedNodesToClickedNode.filter((node) => node.Header == NodeHeaderTypes.Cause );
     
      //rectreate the connection source
      var connectionsDataSource = {data: [],};
      let isCausePrimary = CauseNodes.some(causeNode => causeNode.id === linkedNodesToClickedNode[0].LinkedControlIds[0]);
      
      for (let i = 1; i < linkedNodesToClickedNode.length; i++) {
   
        if (
          isCausePrimary == true &&
          linkedNodesToClickedNode[i].Header == NodeHeaderTypes.Cause
        ) {
          var conObj = {
            from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString(), // Convert to string
          };
          connectionsDataSource.data.push(conObj);
        } else if (
          isCausePrimary == true &&
          linkedNodesToClickedNode[i].Header == NodeHeaderTypes.Consequence
        ) {
          var conObj = {
            from: linkedNodesToClickedNode[1].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString(), // Convert to string
          };
          connectionsDataSource.data.push(conObj);
        } else if (
          isCausePrimary == false &&
          linkedNodesToClickedNode[i].Header == NodeHeaderTypes.Cause
        ) {
          var conObj = {
            from: linkedNodesToClickedNode[1].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString(), // Convert to string
          };
          connectionsDataSource.data.push(conObj);
        } else if (
          isCausePrimary == false &&
          linkedNodesToClickedNode[i].Header == NodeHeaderTypes.Consequence
        ) {
          var conObj = {
            from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[i].id.toString(), // Convert to string
          };
          connectionsDataSource.data.push(conObj);
        } else {
          var conObj1 = {
            from: linkedNodesToClickedNode[0].id.toString(), // Convert to string
            to: linkedNodesToClickedNode[1].id.toString(),
            toConnector: 'top', // Convert to string
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
          <button type="button" class="bt-BackFromCentralizedView btn bow-tie-btn-outline-primary" id="backButton"  style="display: none;">
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

  public CreateDataConnection(originalData: any) {
    //create data connection

    var notLinkedControlsTypeTwo: any[] = [];
    var notLinkedControlsTypeThree: any[] = [];
    let incidentNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Incident
    );
    let kpiNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Kpi
    );
    let treatmentNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Treatment
    );
    let auditNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Audit
    );
    let hierarchyNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Hierarchy_Linkages
    );
    let auditRecommendationNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Audit_Recommendations
    );
    let auditFindingNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Audit_Finding
    );
    let policyNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Policy
    );
    let linkRiskNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Linked_Risk
    );
    let obligationNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Obligation
    );
    let authorityDocumentNodes = originalData.filter(
      (node) => node.Header == NodeHeaderTypes.Authority_Document
    );

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
      if (originalData[i].Header === NodeHeaderTypes.Risk && hasType4Nodes) {
        this.dataConnections.push({
          Id: 0,
          FromShapeId: originalData[0].Id,
          ToShapeId: originalData[i].Id,
          Text: null,
          color: '#323250',
          fromConnector: 'center',
          toConnector: 'bottom',
        });
      }
      var ControlNodesLinkedToCause = [];
      var primaryLinkedcontrols = [];
      var controlId: number;

      if (
        (originalData[i].Header === NodeHeaderTypes.Cause ||
          originalData[i].Header === NodeHeaderTypes.Consequence) &&
        originalData[i].ParentNodeId != 0
      ) {
        for (let j = 0; j < originalData[i].LinkedControlIds.length + 1; j++) {
          controlId = originalData[i].LinkedControlIds[j];
          // Find the control node in originalData with the controlId
          var controlNode = originalData.find((node) => node.Id === controlId);
          if (controlNode) {
            ControlNodesLinkedToCause.push(controlNode);
            if (controlNode.LinkedControlIds[0] == originalData[i].Id) {
              primaryLinkedcontrols.push(controlId);
            }
          }
        }

        for (let j = 0; j < primaryLinkedcontrols.length + 1; j++) {
          if (primaryLinkedcontrols.length === 1) {
            this.dataConnections.push({
              Id: j,
              FromShapeId: j === 0 ? 0 : primaryLinkedcontrols[0],
              ToShapeId:
                j === 0 ? primaryLinkedcontrols[0] : originalData[i].Id,
              Text: null,
              fromConnector:
                j === 0 && originalData[i].Header === NodeHeaderTypes.Cause
                  ? 'left'
                  : j === 0 &&
                    originalData[i].Header === NodeHeaderTypes.Consequence
                  ? 'right'
                  : 'auto',
              toConnector: 'auto',
            });
          } else if (primaryLinkedcontrols.length > 4) {
            if ((j + 1) % 4 == 0 && j != primaryLinkedcontrols.length) {
              this.dataConnections.push({
                Id: j,
                FromShapeId: primaryLinkedcontrols[j],
                ToShapeId: originalData[i].Id,
                Text: null,
                fromConnector:
                  originalData[i].Header === NodeHeaderTypes.Cause
                    ? 'left'
                    : 'right',
                toConnector: 'auto',
              });
            }
            if (!(j % 4 === 0 && j === primaryLinkedcontrols.length)) {
              this.dataConnections.push({
                Id: j,
                FromShapeId: j % 4 == 0 ? 0 : primaryLinkedcontrols[j - 1],
                ToShapeId:
                  j === primaryLinkedcontrols.length
                    ? originalData[i].Id
                    : primaryLinkedcontrols[j],
                Text: null,
                fromConnector:
                  originalData[i].Header === NodeHeaderTypes.Cause
                    ? 'left'
                    : 'right',
              });
            }
          } else {
            this.dataConnections.push({
              Id: j,
              FromShapeId: j === 0 ? 0 : primaryLinkedcontrols[j - 1],
              ToShapeId:
                j === primaryLinkedcontrols.length
                  ? originalData[i].Id
                  : primaryLinkedcontrols[j],
              Text: null,
              fromConnector:
                originalData[i].Header === NodeHeaderTypes.Cause
                  ? 'left'
                  : 'right',
              toConnector: 'auto',
            });
          }
        }

        ControlNodesLinkedToCause = [];
        primaryLinkedcontrols = [];
      }

      if (
        (originalData[i].Header === NodeHeaderTypes.Cause ||
          originalData[i].Header === NodeHeaderTypes.Consequence) &&
        originalData[i].ParentNodeId === 0
      ) {
        this.dataConnections.push({
          Id: originalData[i].Id,
          FromShapeId: 0,
          ToShapeId: originalData[i].Id,
          Text: null,
          fromConnector:
            originalData[i].Header === NodeHeaderTypes.Cause ? 'left' : 'right',
          toConnector: 'auto',
        });
      }
    }
    // Collect all "Control Node" type 2 and 3 elements with IsLinkedToCauseOrConsequence set to false
    for (let i = 0; i < originalData.length; i++) {
      if (
        originalData[i].Header === NodeHeaderTypes.Control &&
        originalData[i].Type === 2 &&
        !originalData[i].ControlData.IsLinkedToCauseOrConsequence
      ) {
        notLinkedControlsTypeTwo.push(originalData[i]);
      }

      if (
        originalData[i].Header === NodeHeaderTypes.Control &&
        originalData[i].Type === 3 &&
        !originalData[i].ControlData.IsLinkedToCauseOrConsequence
      ) {
        notLinkedControlsTypeThree.push(originalData[i]);
      }
    }
    // Generate connection lines based on notLinkedControls - type two
    for (let j = 0; j < notLinkedControlsTypeTwo.length; j++) {
      this.dataConnections.push({
        Id: notLinkedControlsTypeTwo[j].Id, // Assuming you have the correct index or unique identifier for Id
        FromShapeId:
          j == 0 || j % 4 == 0 ? 0 : notLinkedControlsTypeTwo[j - 1].Id,
        ToShapeId: notLinkedControlsTypeTwo[j].Id,
        Text: null,
        toConnector: 'right',
        fromConnector: 'left', // Adjusted to use notLinkedControls[j] instead of originalData[i]
      });
    }
    // Generate connection lines based on notLinkedControls -type three
    for (let j = 0; j < notLinkedControlsTypeThree.length; j++) {
      this.dataConnections.push({
        Id: notLinkedControlsTypeThree[j].Id, // Assuming you have the correct index or unique identifier for Id
        FromShapeId:
          j == 0 || j % 4 == 0 ? 0 : notLinkedControlsTypeThree[j - 1].Id,
        ToShapeId: notLinkedControlsTypeThree[j].Id,
        Text: null,
        toConnector: 'left',
        fromConnector: 'right', // Adjusted to use notLinkedControls[j] instead of originalData[i]
      });
    }
    //generate connection lines for bottom nodes

    this.GenerateConnectionsForLinkedNodes(incidentNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(kpiNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(treatmentNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(auditNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(hierarchyNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(auditRecommendationNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(auditFindingNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(policyNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(linkRiskNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(obligationNodes, originalData);
    this.GenerateConnectionsForLinkedNodes(authorityDocumentNodes, originalData);
  }

  public GenerateConnectionsForLinkedNodes(nodes: any, originalData: any) {
    for (let j = 0; j < nodes.length; j++) {
      this.dataConnections.push({
        Id: nodes[j].Id,
        FromShapeId: j == 0 ? originalData[0].Id : nodes[j - 1].Id,
        ToShapeId: nodes[j].Id,
        Text: null,
        fromConnector: j == 0 ? 'center' : 'bottom',
        toConnector: 'top',
      });
    }
  }
}
