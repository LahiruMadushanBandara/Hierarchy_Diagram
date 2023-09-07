import { data } from 'src/app/models/data.model';

export class BowTieDiagramHelper {
  constructor(
  ) {}
  
  ArrangeNodes(originalData)
  {
      const arrangedNodes = [];
      // Find the risk node (type 1 with ParentNodeId 0)
      const riskNode = originalData.find(
        (node) => node.Type === 1 && node.ParentNodeId === 0
      );

      if (riskNode) {
        const horizontalSpacing = 450;
        const verticalSpacing = 420;
        const verticalSpacingFour = 200;
        const maxNodesPerRow = 5;
        const maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4

        let typeFourIndex = 0;

        const originX = 0;
        const originY = 0;

        // arrange type 2 nodes (left of type 1)
        const typeTwoNodes = originalData.filter((node) => node.Type === 2);
        let rowNumbertypetwo = 0;
        let columnNumber = 0;
        let rowNodeCount = 0;

        for (let i = 0; i < typeTwoNodes.length; i++) {
          if (
            typeTwoNodes[i].ParentNodeId == 0 &&
            typeTwoNodes[i].Title == 'Cause Node'
          ) {
           
            // Calculate the x and y coordinates for the cause node
            const x = originX - 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypetwo * verticalSpacing;

            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNumbertypetwo++;
          } 
          else if (typeTwoNodes[i].Title == 'Control Node') {
            const x = originX - (columnNumber + 1) * horizontalSpacing;
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;
            if (columnNumber === 4) {
              rowNumbertypetwo++;
              rowNodeCount = 0;
            }
            columnNumber = rowNodeCount;
          } else if ( typeTwoNodes[i].ParentNodeId !== 0 && typeTwoNodes[i].Title == 'Cause Node'
          ) {
            const x = originX - 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
           
            rowNumbertypetwo++;
            rowNodeCount = 0;
            columnNumber = rowNodeCount;
          }
        }

        // Arrange type 3 nodes (right of type 1)
         let rowNumbertypethree = 0;
        const typeThreeNodes = originalData.filter((node) => node.Type === 3);

        for (let i = 0; i < typeThreeNodes.length; i++) {
          if (
            typeThreeNodes[i].ParentNodeId == 0 &&
            typeThreeNodes[i].Title == 'Consequences Node'
          ) {
            rowNumbertypethree++;
            const x = originX + 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypethree * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNumbertypethree++;


          } else if (typeThreeNodes[i].Title == 'Control Node') {
            const x = originX + (columnNumber + 1) * horizontalSpacing;
            const y = originY + rowNumbertypethree * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNodeCount++;
            if (rowNodeCount === maxNodesPerRow ) {
              rowNumbertypethree++;
              rowNodeCount = 0;
            }
             columnNumber = rowNodeCount;
          }else if (
            typeThreeNodes[i].ParentNodeId !== 0 &&
            typeThreeNodes[i].Title == 'Consequences Node' 
          ) {
            const x = originX + 5 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypethree * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNodeCount++;
            rowNumbertypethree++;
            rowNodeCount = 0;
            columnNumber = rowNodeCount;
          } 
        }
        
        let maxTypeTwoTypeThreeRows = Math.max(rowNumbertypetwo, rowNumbertypethree);
        let riskNodeX = originX;
        let riskNodeY =
          originY +
          (maxTypeTwoTypeThreeRows - 2) * verticalSpacing +
          verticalSpacing / 2; // Adjust the Y-coordinate to place it in the center of the last two rows
          riskNode.x = riskNodeX;
          riskNode.y = riskNodeY;
          arrangedNodes.push(riskNode);
          

        // Arrange type 4 nodes (below type 2 and type 3)
        const typeFourNodes = originalData.filter((node) => node.Type === 4);
        typeFourNodes.forEach((node, index) => {
          const rowNumber = Math.floor(typeFourIndex / maxNodesPerRowFour); // Calculate the row number

          const columnNumber = typeFourIndex % maxNodesPerRowFour; // Calculate the column number

          const x = riskNode.x - (columnNumber - 5) * horizontalSpacing; // Adjusting the starting point for type 4 nodes
          const y =
            riskNode.y +
            rowNumber * verticalSpacingFour +
            (maxTypeTwoTypeThreeRows + 4) * verticalSpacingFour;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          typeFourIndex++;
        });

        // Arrange control nodes that are not link to cause or consequence nodes (below type 2 and type 3)
        
        if (originalData.ControlData?.IsLinkedToCauseOrConsequence == false) {
          const notLinkedNodes = originalData.filter((node) => node?.IsLinkedToCauseOrConsequence === false);
          const typeTwoNode = arrangedNodes.filter((node) => node.Type === 2);
          const typeThreeNode = arrangedNodes.filter((node) => node.Type === 3);
          let isTypeTwo = true; // Start with type 2 placement
          let typeTwoIndex = typeTwoNode.length - 1; // Start from the last type 2 node
          let typeThreeIndex = typeThreeNode.length - 1; // Start from the last type 3 node

          const lastRowNumber = Math.max(rowNumbertypetwo, rowNumbertypethree);

          for (const node of notLinkedNodes) {
            const rowNumber = lastRowNumber;
            const columnNumber = isTypeTwo ? typeTwoIndex : typeThreeIndex;

            const x = node.Type === 2
              ? originX - (columnNumber + 1) * horizontalSpacing
              : originX + (columnNumber + 1) * horizontalSpacing;

            const y = originY + rowNumber * verticalSpacing;

            node.x = x;
            node.y = y;
            node.Type = isTypeTwo ? 2 : 3; // Update the node type
            arrangedNodes.push(node);

            if (isTypeTwo) {
              typeTwoIndex--;
            } else {
              typeThreeIndex--;
            }
            isTypeTwo = !isTypeTwo;
          }
        }
      }
    
    return arrangedNodes;
  }


  public toggleExpand(isExpanded: boolean, kendoDiagram:any) {
    isExpanded = !isExpanded;

    // Update the switch state
    const expandSwitch = document.getElementById('expandSwitch');
    expandSwitch.classList.toggle('active', isExpanded);

    // Use kendoDiagram variable to get the diagram instance
    var diagram = kendoDiagram.getKendoDiagram();
    diagram.bringIntoView(diagram.shapes);
    diagram.refresh();
  }

  // toggleRiskview() {
  //     if (enableKPIview == false) {
  //       enableriskview = !enableriskview;
  //       const riskviewSwitch = document.getElementById('riskviewSwitch');
  //       riskviewSwitch.classList.toggle('active', enableriskview);
  //       var diagram = kendoDiagram.getKendoDiagram();
  //       var connectionsDataSource = diagram.connectionsDataSource;

  //       if (enableriskview) {
  //         // Clear connections that are not linked to nodes with header = riskExpand
  //         var visibleConnections = diagram.connectionsDataSource
  //           .data()
  //           .filter(function (connection) {
  //             var fromNode = diagram.dataSource.get(connection.from);
  //             var toNode = diagram.dataSource.get(connection.to);
  //             return (
  //               (fromNode && fromNode.Header === 'riskExpand') ||
  //               (toNode && toNode.Header === 'riskExpand')
  //             );
  //           });

  //         // Store the original connections before clearing them
  //         originalConnections = diagram.connectionsDataSource
  //           .data()
  //           .slice();

  //         // Clear all connections
  //         connectionsDataSource.data([]);

  //         // Re-add visible connections
  //         connectionsDataSource.data(visibleConnections);
  //       } else {
  //         // Re-establish all the original connections
  //         connectionsDataSource.data(originalConnections);
  //       }
  //       diagram.bringIntoView(diagram.shapes);
  //       diagram.refresh();
  //     }
  //   }

  //   toggleKPIview() {
  //     if (!enableriskview) {
  //       enableKPIview = !enableKPIview;
  //       const kpiviewSwitch = document.getElementById('kpiviewSwitch');
  //       kpiviewSwitch.classList.toggle('active', enableKPIview);

  //       var diagram = kendoDiagram.getKendoDiagram();
  //       var connectionsDataSource = diagram.connectionsDataSource;

  //       if (enableKPIview) {
  //         // Clear connections that are not linked to nodes with header = riskExpand
  //         var visibleConnections = diagram.connectionsDataSource
  //           .data()
  //           .filter(function (connection) {
  //             var fromNode = diagram.dataSource.get(connection.from);
  //             var toNode = diagram.dataSource.get(connection.to);
  //             return (
  //               (fromNode && fromNode.Header === 'Kpi') ||
  //               (toNode && toNode.Header === 'Kpi')
  //             );
  //           });

  //         // Store the original connections before clearing them
  //         originalConnections = diagram.connectionsDataSource
  //           .data()
  //           .slice();

  //         // Clear all connections
  //         connectionsDataSource.data([]);

  //         // Re-add visible connections
  //         connectionsDataSource.data(visibleConnections);
  //       } else {
  //         // Re-establish all the original connections
  //         connectionsDataSource.data(originalConnections);
  //       }

  //       diagram.bringIntoView(diagram.shapes);
  //       diagram.refresh();
  //     }
  //   }

  //  togglePerformanceview() {
  //     enablePerformanceview = !enablePerformanceview;

  //     const performanceviewSwitch = document.getElementById(
  //       'performanceviewSwitch'
  //     );
  //     performanceviewSwitch.classList.toggle(
  //       'active',
  //       enablePerformanceview
  //     );

          
  //     var diagram = kendoDiagram.getKendoDiagram();
  //     diagram.bringIntoView(diagram.shapes);
  //     diagram.refresh();
  //   }
  
}
