

export class BowTieDiagramHelper {
  constructor(
  ) { }
  public RearrangedDataset = [];

  ArrangeNodesTesting(originalData) {

    const riskNode = originalData.find((node) => node.Type === 1 && node.ParentNodeId === 0);
    const CommonPoint = originalData.find((node) => node.Title == 'Common-point');
    const linkedCauseNodes = originalData.filter((node) => node.Title == 'Cause Node' && node.ParentNodeId != 0);
    const notLinkedCauseNodes = originalData.filter((node) => node.Title == 'Cause Node' && node.ParentNodeId == 0);
    const linkedConsequenceNodes = originalData.filter((node) => node.Title == 'Consequences Node' && node.ParentNodeId != 0);
    const notLinkedConsequenceNodes = originalData.filter((node) => node.Title == 'Consequences Node' && node.ParentNodeId == 0);
    const notLinkedControlNodes = originalData.filter((node) => node.Title == 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === false);
    const linkedBottomNodes = originalData.filter((node) => node.Type === 4);

    this.RearrangedDataset.push(CommonPoint);
    this.RearrangedDataset.push(riskNode);

    for (let i = 0; i < linkedCauseNodes.length; i++) {

      if (linkedCauseNodes[i].LinkedControlIds.length > 4) {

        const controlsToAddIds = linkedCauseNodes[i].LinkedControlIds.slice(0, 4); // Get the first 4 control IDs


        // Find the controls nodes in originalData and push them to RearrangedDataset
        for (const controlId of controlsToAddIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode) {
            this.RearrangedDataset.push(controlNode);
          }
        }

        // Find the relevant cause node in originalData and push it after the 4th element

        this.RearrangedDataset.push(linkedCauseNodes[i]);


        // Find and push the remaining control nodes (if any) after the relevant cause
        for (const controlId of linkedCauseNodes[i].LinkedControlIds.slice(4)) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode) {
            this.RearrangedDataset.push(controlNode);
          }
        }
      }
      else {

        for (const controlId of linkedCauseNodes[i].LinkedControlIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode) {
            this.RearrangedDataset.push(controlNode);
          }
        }
        this.RearrangedDataset.push(linkedCauseNodes[i]);


      }

    }

    for (let i = 0; i < linkedConsequenceNodes.length; i++) {

      if (linkedConsequenceNodes[i].LinkedControlIds.length > 4) {
        const controlsToAddIds = linkedConsequenceNodes[i].LinkedControlIds.slice(0, 4); // Get the first 4 control IDs


        // Find the controls nodes in originalData and push them to RearrangedDataset
        for (const controlId of controlsToAddIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode) {
            this.RearrangedDataset.push(controlNode);
          }
        }

        // Find the relevant cause node in originalData and push it after the 4th element

        this.RearrangedDataset.push(linkedConsequenceNodes[i]);


        // Find and push the remaining control nodes (if any) after the relevant cause
        for (const controlId of linkedConsequenceNodes[i].LinkedControlIds.slice(4)) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode) {
            this.RearrangedDataset.push(controlNode);
          }
        }
      }
      else {

        for (const controlId of linkedConsequenceNodes[i].LinkedControlIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode) {
            this.RearrangedDataset.push(controlNode);
          }
        }
        this.RearrangedDataset.push(linkedConsequenceNodes[i]);
      }

    }
    for (let i = 0; i < notLinkedCauseNodes.length; i++) {
      this.RearrangedDataset.push(notLinkedCauseNodes[i]);
    }
    for (let i = 0; i < notLinkedConsequenceNodes.length; i++) {
      this.RearrangedDataset.push(notLinkedConsequenceNodes[i]);
    }
    for (let i = 0; i < notLinkedControlNodes.length; i++) {
      this.RearrangedDataset.push(notLinkedControlNodes[i]);
    }
    for (let i = 0; i < linkedBottomNodes.length; i++) {
      this.RearrangedDataset.push(linkedBottomNodes[i]);
    }
    return this.RearrangedDataset;
  }




  ArrangeNodes(isExpand: boolean) {

    const arrangedNodes = [];
    // Find the risk node (type 1 with ParentNodeId 0)

    const riskNode = this.RearrangedDataset.find((node) => node.Type == 1 && node.ParentNodeId == 0);


    const CommonPoint = this.RearrangedDataset.find((node) => node.Title == 'Common-point');

    const causeNodes = this.RearrangedDataset.filter((node) => node.Title == 'Cause Node');
    let maxCauseNodeLength = 0;
    let causeNodeLength = 0;

    for (let i = 0; i < causeNodes.length; i++) {

      if (causeNodes[i].LinkedControlIds.length < 4) {

        causeNodeLength = causeNodes[i].LinkedControlIds.length;


        if (causeNodeLength >= maxCauseNodeLength) {
          maxCauseNodeLength = causeNodeLength + 1;
        }

      }

      else {
        maxCauseNodeLength = 5;
      }
    }

    const consequenceNodes = this.RearrangedDataset.filter((node) => node.Title == 'Consequences Node');
    let maxConsequenceNodeLength = 0;
    let consequenceNodeLength = 0;

    for (let i = 0; i < consequenceNodes.length; i++) {

      if (consequenceNodes[i].LinkedControlIds.length < 4) {

        consequenceNodeLength = consequenceNodes[i].LinkedControlIds.length;


        if (consequenceNodeLength >= maxConsequenceNodeLength) {
          maxConsequenceNodeLength = consequenceNodeLength + 1;
        }

      }

      else {
        maxConsequenceNodeLength = 5;
      }
    }




    if (riskNode) {
      const horizontalSpacing = 520;
      const verticalSpacing = isExpand ? 520 : 300;
      let verticalSpacingFour = isExpand ? 600 : 250;
      let CommonPointYValue = isExpand ? 2600 : 1800;
      let CommonPointYValueIncrement = isExpand ? 500 : 300;
      let maxNodesPerRow;
      const maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4
      let typeFourIndex = 0;
      let rowNodeCountControl = 0;

      const originX = 0;
      const typeTwoNodes = this.RearrangedDataset.filter((node) => node.Type === 2);
      const typeThreeNodes = this.RearrangedDataset.filter((node) => node.Type === 3);
      const originY = 0;
      let rowNumbertypetwo = 0;
      let columnNumber = 0;
      let rowNodeCount = 0;
      let controlHorizontalSpacing = 0;
      let controlNodesPerRow = 0;
      let lastLinkedControlId;




      // arrange type 2 nodes (left of type 1)
      for (let i = 0; i < typeTwoNodes.length; i++) {

        if ((i < typeTwoNodes.length - 1 && typeTwoNodes[i + 1].Title === 'Cause Node'))
        // (i < typeThreeNodes.length - 1 && typeThreeNodes[i + 1].Title === 'Consequences Node'))
        {
          maxNodesPerRow = 5;
        } else {
          maxNodesPerRow = 4;
        }


        controlHorizontalSpacing = horizontalSpacing;
        if (rowNodeCount == 0) {
          controlHorizontalSpacing = 520;
        }



        if (typeTwoNodes[i].Title == 'Control Node') {


          const x = originX - (columnNumber + 1) * horizontalSpacing;
          const y = originY + rowNumbertypetwo * verticalSpacing;
          typeTwoNodes[i].x = x;
          typeTwoNodes[i].y = y;

          arrangedNodes.push(typeTwoNodes[i]);
          rowNodeCount++;
          controlNodesPerRow++

          if (rowNodeCount === maxNodesPerRow ||
            ((typeTwoNodes[i].id == lastLinkedControlId || typeTwoNodes[i].Id == lastLinkedControlId) && lastLinkedControlId != undefined)) {
            rowNumbertypetwo++;
            rowNodeCount = 0;

          }

          columnNumber = rowNodeCount;

        } else if (typeTwoNodes[i].Title == 'Cause Node') {

          if (typeTwoNodes[i].ParentNodeId != 0 && typeTwoNodes[i].Title == 'Cause Node') {
            lastLinkedControlId = typeTwoNodes[i].LinkedControlIds[typeTwoNodes[i].LinkedControlIds.length - 1];
          }


          const x = originX - maxCauseNodeLength * horizontalSpacing; // Fifth place from the left
          const y = originY + rowNumbertypetwo * verticalSpacing;
          typeTwoNodes[i].x = x;
          typeTwoNodes[i].y = y;
          arrangedNodes.push(typeTwoNodes[i]);
          rowNodeCount++;
          rowNumbertypetwo++
          rowNodeCount = 0;
          columnNumber = rowNodeCount;


        }

      }

      // Arrange type 3 nodes (right of type 1)
      rowNodeCount = 0;
      columnNumber = 0;
      let rowNumbertypethree = 0;



      for (let i = 0; i < typeThreeNodes.length; i++) {

        controlHorizontalSpacing = horizontalSpacing;
        if (rowNodeCount == 0) {
          controlHorizontalSpacing = 520;
        }

        if (typeThreeNodes[i].Title == 'Control Node') {

          const x = originX + (columnNumber + 1) * horizontalSpacing;
          const y = originY + rowNumbertypethree * verticalSpacing;
          typeThreeNodes[i].x = x;
          typeThreeNodes[i].y = y;
          arrangedNodes.push(typeThreeNodes[i]);
          rowNodeCount++;

          if (rowNodeCount === maxNodesPerRow) {
            rowNumbertypethree++;
            rowNodeCount = 0;
          }
          columnNumber = rowNodeCount;

        } else if (typeThreeNodes[i].Title == 'Consequences Node') {
          const x = originX + maxConsequenceNodeLength * horizontalSpacing; // Fifth place from the left
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
      let riskYCodinate = 0;


      //Arrange Risk node (in the middle)

      if (typeTwoNodes.length != 0 && typeTwoNodes.length >= typeThreeNodes.length) {
        riskYCodinate = (typeThreeNodes[1].y + typeThreeNodes[typeThreeNodes.length - 1].y) / 2 - 100;
      }
      else if (typeThreeNodes.length != 0 && typeTwoNodes.length < typeThreeNodes.length) {
        riskYCodinate = (typeTwoNodes[1].y + typeTwoNodes[typeTwoNodes.length - 1].y) / 2;
      }

      if (typeTwoNodes.length == 0 && typeThreeNodes.length == 0) {
        let riskNodeX = originX;
        let riskNodeY = originY;
        riskNode.x = riskNodeX;
        riskNode.y = riskNodeY;
        arrangedNodes.push(riskNode);
      }
      else {

        let riskNodeX = originX;
        let riskNodeY = originY + riskYCodinate - verticalSpacing / 2;
        riskNode.x = riskNodeX;
        riskNode.y = riskNodeY;
        arrangedNodes.push(riskNode);
      }





      //....................common point placemens.......................................




      if ((typeTwoNodes.length == 0 && typeThreeNodes.length == 0) || (rowNumbertypetwo == 0 && rowNumbertypethree == 0) || (rowNumbertypetwo == 1 && rowNumbertypethree == 1)) {
        CommonPointYValue = riskNode.y + 500
      }
      else if (rowNumbertypetwo >= rowNumbertypethree) {
        CommonPointYValue = typeTwoNodes[typeTwoNodes.length - 1].y + CommonPointYValueIncrement;
      } else {
        CommonPointYValue = typeThreeNodes[typeThreeNodes.length - 1].y + CommonPointYValueIncrement;
      }

      if (CommonPoint.Title == 'Common-point') {
        CommonPoint.x = 190;
        CommonPoint.y = CommonPointYValue;
        arrangedNodes.push(CommonPoint);
      }



      //................................Arrange type 4 nodes (below type 2 and type 3).....................................


      let typeFourNodePlacingValue;

      // Filter nodes based on their header types
      const IncidentNodes = this.RearrangedDataset.filter((node) => node.Header == 'Incident');
      const KPINodes = this.RearrangedDataset.filter((node) => node.Header == 'KPI');
      const TreatmentNodes = this.RearrangedDataset.filter((node) => node.Header == 'Treatment');
      const AuditNodes = this.RearrangedDataset.filter((node) => node.Header == 'Audit');
      const HierarchyNodes = this.RearrangedDataset.filter((node) => node.Header == 'Hierarchy');
      const AuditRecommendationNodes = this.RearrangedDataset.filter((node) => node.Header == 'AuditRecommendation');
      const AuditFindingNodes = this.RearrangedDataset.filter((node) => node.Header == 'AuditFinding');
      const PolicyNodes = this.RearrangedDataset.filter((node) => node.Header == 'Policy');

      const nonEmptyHeaders = [
        IncidentNodes,        
        TreatmentNodes,
        PolicyNodes,
        KPINodes,
        AuditNodes,       
        AuditRecommendationNodes,
        AuditFindingNodes,
        HierarchyNodes
       
      ].filter(nodes => nodes.length > 0);
      console.log("nonEmptyHeaders", nonEmptyHeaders)
      // Total number of columns
      const totalColumns = nonEmptyHeaders.length;

      // Function to arrange nodes in a column based on their header
      const arrangeNodesInColumn = (nodes, columnOffset, totalColumns) => {
        if (totalColumns % 2 === 0) { typeFourNodePlacingValue = 200 }
        else { typeFourNodePlacingValue = 190 }

        let currentY = CommonPoint.y + 100;

        const distanceFromMiddle = columnOffset - (totalColumns - 1) / 2; // Calculate the distance from the middle column

        let nodeCount = 0;
        for (const node of nodes) {
          const xBaseOffset = distanceFromMiddle * horizontalSpacing; // Calculate x-coordinate offset from the middle
          node.x = CommonPoint.x - typeFourNodePlacingValue + xBaseOffset;
          node.y = currentY;
          arrangedNodes.push(node);
          currentY += verticalSpacingFour;
          nodeCount++;
        }
      };

      // Arrange nodes for each header type in columns
      nonEmptyHeaders.forEach((nodes, index) => {
        arrangeNodesInColumn(nodes, index, totalColumns);
      });



    }
    return arrangedNodes;
  }



  // ArrangeConnectionLines() {
  //   var dataConnections = [];


  //   for (let i = 1; i < this.RearrangedDataset.length; i++) {

  //     if (this.RearrangedDataset[i].Title === "Risk Node") {
  //       dataConnections.push({
  //         Id: 0,
  //         FromShapeId: this.RearrangedDataset[0].Id,
  //         ToShapeId: this.RearrangedDataset[i].Id,
  //         Text: null,
  //         fromConnector: "center",
  //         toConnector: "bottom"

  //       });

  //     }
  //     if (this.RearrangedDataset[i].Title === "Other Node") {
  //       dataConnections.push({
  //         Id: this.RearrangedDataset[i].Id,
  //         FromShapeId: this.RearrangedDataset[0].Id,
  //         ToShapeId: this.RearrangedDataset[i].Id,
  //         Text: null,
  //         fromConnector: "center",
  //         toConnector: "top"
  //       });
  //     }

  //     if ((this.RearrangedDataset[i].Title === "Cause Node" || this.RearrangedDataset[i].Title === "Consequences Node") && this.RearrangedDataset[i].ParentNodeId != 0) {

  //       for (let j = 0; j < this.RearrangedDataset[i].LinkedControlIds.length + 1; j++) {
  //         if (this.RearrangedDataset[i].LinkedControlIds.length === 1) {
  //           dataConnections.push({
  //             Id: j,
  //             FromShapeId: (j === 0) ? 0 : this.RearrangedDataset[i].LinkedControlIds[0],
  //             ToShapeId: (j === 0) ? this.RearrangedDataset[i].LinkedControlIds[0] : this.RearrangedDataset[i].Id,
  //             Text: null,
  //             fromConnector: (j === 0 && this.RearrangedDataset[i].Title === "Cause Node") ? "left" :
  //               (j === 0 && this.RearrangedDataset[i].Title === "Consequences Node") ? "right" : "auto",
  //           });
  //         } else {
  //           // (j % 4 == 0) ? this.RearrangedDataset[i].LinkedControlIds[j - 5]
  //           dataConnections.push({
  //             Id: j,
  //             FromShapeId: (j != 5 && (j === 0 || (j - 1) % 4 == 0)) ? 0 : this.RearrangedDataset[i].LinkedControlIds[j - 1],
  //             ToShapeId: ((j === this.RearrangedDataset[i].LinkedControlIds.length || j === 3 || j % 4 === 0) && j != 4) ? this.RearrangedDataset[i].Id : this.RearrangedDataset[i].LinkedControlIds[j],
  //             Text: null,

  //             fromConnector: (this.RearrangedDataset[i].Title === "Cause Node") ? "left" : "right",
  //           });
  //         }
  //       }
  //     }

  //     if ((this.RearrangedDataset[i].Title === "Cause Node" || this.RearrangedDataset[i].Title === "Consequences Node") && this.RearrangedDataset[i].ParentNodeId === 0) {
  //       dataConnections.push({
  //         Id: this.RearrangedDataset[i].Id,
  //         FromShapeId: 0,
  //         ToShapeId: this.RearrangedDataset[i].Id,
  //         Text: null,
  //         fromConnector: (this.RearrangedDataset[i].Title === "Cause Node") ? "left" : "right",
  //       });
  //     }


  //   }

  //   var notLinkedControlsTypeTwo: any[] = [];
  //   var notLinkedControlsTypeThree: any[] = [];

  //   // Collect all "Control Node" type 2 and 3 elements with IsLinkedToCauseOrConsequence set to false
  //   for (let i = 0; i < this.RearrangedDataset.length; i++) {
  //     if (this.RearrangedDataset[i].Title === "Control Node" && this.RearrangedDataset[i].Type === 2 && !this.RearrangedDataset[i].ControlData.IsLinkedToCauseOrConsequence) {
  //       notLinkedControlsTypeTwo.push(this.RearrangedDataset[i]);
  //     }

  //     if (this.RearrangedDataset[i].Title === "Control Node" && this.RearrangedDataset[i].Type === 3 && !this.RearrangedDataset[i].ControlData.IsLinkedToCauseOrConsequence) {
  //       notLinkedControlsTypeThree.push(this.RearrangedDataset[i]);
  //     }
  //   }

  //   // Generate connection lines based on notLinkedControls
  //   for (let j = 0; j < notLinkedControlsTypeTwo.length; j++) {
  //     dataConnections.push({
  //       Id: notLinkedControlsTypeTwo[j].Id, // Assuming you have the correct index or unique identifier for Id
  //       FromShapeId: (j == 0 || j % 4 == 0) ? 0 : notLinkedControlsTypeTwo[j - 1].Id,
  //       ToShapeId: notLinkedControlsTypeTwo[j].Id,
  //       Text: null,
  //       toConnector: "right",
  //       fromConnector: "left", // Adjusted to use notLinkedControls[j] instead of this.RearrangedDataset[i]
  //     });
  //   }

  //   // Generate connection lines based on notLinkedControls
  //   for (let j = 0; j < notLinkedControlsTypeThree.length; j++) {
  //     dataConnections.push({
  //       Id: notLinkedControlsTypeThree[j].Id, // Assuming you have the correct index or unique identifier for Id
  //       FromShapeId: (j == 0 || j % 4 == 0) ? 0 : notLinkedControlsTypeThree[j - 1].Id,
  //       ToShapeId: notLinkedControlsTypeThree[j].Id,
  //       Text: null,
  //       toConnector: "left",
  //       fromConnector: "right", // Adjusted to use notLinkedControls[j] instead of this.RearrangedDataset[i]
  //     });
  //   }
  // }

}












 // Arrange control nodes that are not link to cause or consequence nodes (below type 2 and type 3)

      // if (this.RearrangedDataset.ControlData?.IsLinkedToCauseOrConsequence == false) {
      //   const notLinkedNodes = this.RearrangedDataset.filter((node) => node?.IsLinkedToCauseOrConsequence === false);
      //   const typeTwoNode = arrangedNodes.filter((node) => node.Type === 2);
      //   const typeThreeNode = arrangedNodes.filter((node) => node.Type === 3);
      //   let isTypeTwo = true; // Start with type 2 placement
      //   let typeTwoIndex = typeTwoNode.length - 1; // Start from the last type 2 node
      //   let typeThreeIndex = typeThreeNode.length - 1; // Start from the last type 3 node

      //   const lastRowNumber = Math.max(rowNumbertypetwo, rowNumbertypethree);

      //   for (const node of notLinkedNodes) {
      //     const rowNumber = lastRowNumber;
      //     const columnNumber = isTypeTwo ? typeTwoIndex : typeThreeIndex;

      //     const x = node.Type === 2
      //       ? originX - (columnNumber + 1) * horizontalSpacing
      //       : originX + (columnNumber + 1) * horizontalSpacing;

      //     const y = originY + rowNumber * verticalSpacing;

      //     node.x = x;
      //     node.y = y;
      //     node.Type = isTypeTwo ? 2 : 3; // Update the node type
      //     arrangedNodes.push(node);

      //     if (isTypeTwo) {
      //       typeTwoIndex--;
      //     } else {
      //       typeThreeIndex--;
      //     }
      //     isTypeTwo = !isTypeTwo;
      //   }
      // }
