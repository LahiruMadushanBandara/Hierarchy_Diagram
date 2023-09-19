import { data } from "src/app/models/data.model";
export class BowTieDiagramOnClick{ 
  constructor() {}

 

  public NodeClick(originalData,clickedNodeId,clicked,kendoDiagram) {
   
   
    // Create arrays to store the IDs of linked causes and consequences
  var linkedCausesIds = [];
  var linkedConsequencesIds = [];

  // Iterate through all nodes to find matches with the clicked node's ID
  var nodes = kendoDiagram.dataSource.data();
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    // Check if the current node has LinkedControlIds
    if (node.LinkedControlIds) {
      // Check if the clicked node's ID is in the LinkedControlIds array
      if (node.LinkedControlIds.includes(clickedNodeId)) {
        // Add the current node's ID to the appropriate array
        if (node.Type === 2) {
          linkedCausesIds.push(node.id);
        } else if (node.Type === 3) {
          linkedConsequencesIds.push(node.id);
        }
      }
    }
  }

  // Clear the diagram and connection lines
  kendoDiagram.clear();

  // Add the clicked node and the linked causes and consequences back to the diagram
  for (var j = 0; j < nodes.length; j++) {
    var currentNode = nodes[j];

    // Add the clicked node
    if (currentNode.id === clickedNodeId) {
      kendoDiagram.addShape(currentNode);
    }
    
    // Add linked causes and consequences
    if (linkedCausesIds.includes(currentNode.id) || linkedConsequencesIds.includes(currentNode.id)) {
      kendoDiagram.addShape(currentNode);
    }
  }

  // Refresh the diagram to display the changes
  kendoDiagram.refresh();
}
    
   
  

 



}