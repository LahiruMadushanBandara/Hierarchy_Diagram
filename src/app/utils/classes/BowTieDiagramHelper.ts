

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
    const LinkedControlNodes = originalData.filter((node) => node.Title == 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === true);
    const linkedBottomNodes = originalData.filter((node) => node.Type === 4);

    this.RearrangedDataset.push(CommonPoint);
    this.RearrangedDataset.push(riskNode);
    // Combine cause and consequence nodes
    const linkedNodes = linkedCauseNodes.concat(linkedConsequenceNodes);

    // Iterate through each node (both cause and consequence)
    for (let i = 0; i < linkedNodes.length; i++) {
      const node = linkedNodes[i];
      // Iterate through each control ID in the node's LinkedControlIds array
      for (let j = 0; j < node.LinkedControlIds.length; j++) {
        const controlId = node.LinkedControlIds[j];
        // Find the control node in LinkedControlNodes with the current control ID
        for (let k = 0; k < LinkedControlNodes.length; k++) {
          const controlNode = LinkedControlNodes[k];
          // If the control node is found, ensure that its LinkedControlIds array is initialized
          if (controlNode.Id === controlId) {
            if (!controlNode.LinkedControlIds) {
              controlNode.LinkedControlIds = []; // Initialize the array if it's undefined
            }
            // Push the node's ID to the control node's LinkedControlIds array
            controlNode.LinkedControlIds.push(node.Id);
            // Break out of the loop once the control node is found
            break;
          }
        }
      }
    }


    for (let i = 0; i < linkedCauseNodes.length; i++) {



      if (linkedCauseNodes[i].LinkedControlIds.length > 4) {

        const controlsToAddIds = linkedCauseNodes[i].LinkedControlIds.slice(0, 4); // Get the first 4 control IDs


        // Find the controls nodes in originalData and push them to RearrangedDataset
        for (const controlId of controlsToAddIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.some(node => node.Id === controlId) && linkedCauseNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }

        // Find the relevant cause node in originalData and push it after the 4th element

        this.RearrangedDataset.push(linkedCauseNodes[i]);


        // Find and push the remaining control nodes (if any) after the relevant cause
        for (const controlId of linkedCauseNodes[i].LinkedControlIds.slice(4)) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.some(node => node.Id === controlId) && linkedCauseNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }
      }
      else {

        for (const controlId of linkedCauseNodes[i].LinkedControlIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.some(node => node.Id === controlId) && linkedCauseNodes[i].Id == controlNode.LinkedControlIds[0]) {
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
          if (controlNode && !this.RearrangedDataset.some(node => node.Id === controlId) && linkedConsequenceNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }

        // Find the relevant cause node in originalData and push it after the 4th element

        this.RearrangedDataset.push(linkedConsequenceNodes[i]);


        // Find and push the remaining control nodes (if any) after the relevant cause
        for (const controlId of linkedConsequenceNodes[i].LinkedControlIds.slice(4)) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.some(node => node.Id === controlId) && linkedConsequenceNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }
      }
      else {

        for (const controlId of linkedConsequenceNodes[i].LinkedControlIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.some(node => node.Id === controlId) && linkedConsequenceNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }
        this.RearrangedDataset.push(linkedConsequenceNodes[i]);
      }

    }
   
    for (let i = 0; i < notLinkedControlNodes.length; i++) {
      this.RearrangedDataset.push(notLinkedControlNodes[i]);
    }
    for (let i = 0; i < notLinkedCauseNodes.length; i++) {
      this.RearrangedDataset.push(notLinkedCauseNodes[i]);
    }
    for (let i = 0; i < notLinkedConsequenceNodes.length; i++) {
      this.RearrangedDataset.push(notLinkedConsequenceNodes[i]);
    }
    for (let i = 0; i < linkedBottomNodes.length; i++) {
      this.RearrangedDataset.push(linkedBottomNodes[i]);
    }
    return this.RearrangedDataset;
  }




  public ArrangeNodes(isExpand: boolean) {

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
      const verticalSpacing = isExpand ? 570 : 300;
      let CommonPointYValue = isExpand ? 2600 : 1800;
      let CommonPointYValueIncrement = isExpand ? 500 : 10;
      let verticalSpacingFour = isExpand ? 600 : 250;

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
      let lastLinkedControlIdCause;
      let lastLinkedControlIdconsequence;
      var ControlNodesLinkedToCause = []
      var primaryLinkedcontrols = []
      var controlId: number
      let rowNumber
      // arrange type 2 nodes (left of type 1)

      for (let i = 0; i < typeTwoNodes.length; i++) {

        if (typeTwoNodes[i].Title == 'Cause Node') {

          for (let j = 0; j < typeTwoNodes[i].LinkedControlIds.length; j++) {

            controlId = typeTwoNodes[i].LinkedControlIds[j];
            // Find the control node in originalData with the controlId
            var controlNode = this.RearrangedDataset.find(node => node.Id === controlId || node.id === controlId);
            if (controlNode) {
              ControlNodesLinkedToCause.push(controlNode);
              if (controlNode.LinkedControlIds[0] == typeTwoNodes[i].Id || controlNode.LinkedControlIds[0] == typeTwoNodes[i].id) {
                primaryLinkedcontrols.push(controlNode)
              }
            }
          }
          if (primaryLinkedcontrols.length == 0 &&  typeTwoNodes[i].LinkedControlIds.length != 0) {
            //place the cause node 
            rowNodeCount = 0;
            const x = originX - maxCauseNodeLength * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNumbertypetwo++;
            rowNodeCount = 0;
          }else{
              //place the cause node 
          const x = originX - maxCauseNodeLength * horizontalSpacing; // Fifth place from the left
          const y = originY + rowNumbertypetwo * verticalSpacing;
          typeTwoNodes[i].x = x;
          typeTwoNodes[i].y = y;
          arrangedNodes.push(typeTwoNodes[i]);
          }
        

          //place the controls nodes link to the cause

          for (let i = 0; i < primaryLinkedcontrols.length; i++) {
            const x = originX - (columnNumber + 1) * horizontalSpacing;
            const y = originY + rowNumbertypetwo * verticalSpacing;
            primaryLinkedcontrols[i].x = x;
            primaryLinkedcontrols[i].y = y;

            arrangedNodes.push(primaryLinkedcontrols[i]);
            rowNodeCount++;
            controlNodesPerRow++

            if (controlNodesPerRow >= 4 || i == primaryLinkedcontrols.length - 1) {
              rowNumbertypetwo++;
              rowNodeCount = 0;
              controlNodesPerRow = 0
            }

            columnNumber = rowNodeCount;
          }
          ControlNodesLinkedToCause = [];
          primaryLinkedcontrols = []
        }

        if (typeTwoNodes[i].Title == 'Control Node' && typeTwoNodes[i].ControlData.IsLinkedToCauseOrConsequence === false) {
          const x = originX - (columnNumber + 1) * horizontalSpacing;
          const y = originY + rowNumbertypetwo * verticalSpacing;
          typeTwoNodes[i].x = x;
          typeTwoNodes[i].y = y;

          arrangedNodes.push(typeTwoNodes[i]);
          rowNodeCount++;
          controlNodesPerRow++
          rowNumber = rowNumbertypetwo
          if (controlNodesPerRow >= 4) {
            rowNumbertypetwo++;
            rowNodeCount = 0;
            controlNodesPerRow = 0
          }

          columnNumber = rowNodeCount;

        }

        if (typeTwoNodes[i].Title == 'Cause Node' && typeTwoNodes[i].LinkedControlIds.length == 0) {
          const notLinkedControlCount = typeTwoNodes.filter(node => node.Title === 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === false).length;
         
          if (notLinkedControlCount % 4 !== 0) {
            rowNumbertypetwo++;
            const x = originX - 1 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount = 0;
          }
          else {
            const x = originX - 1 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNumbertypetwo++
            rowNodeCount = 0;
          }


        }
      }

      // Arrange type 3 nodes (right of type 1)
      rowNodeCount = 0;
      columnNumber = 0;
      let rowNumbertypethree = 0;


      for (let i = 0; i < typeThreeNodes.length; i++) {

        if (typeThreeNodes[i].Title == 'Consequences Node') {

          for (let j = 0; j < typeThreeNodes[i].LinkedControlIds.length; j++) {

            controlId = typeThreeNodes[i].LinkedControlIds[j];
            // Find the control node in originalData with the controlId
            
            var controlNode = this.RearrangedDataset.find(node => node.Id === controlId || node.id === controlId);
            if (controlNode) {
              ControlNodesLinkedToCause.push(controlNode);
              if (controlNode.LinkedControlIds[0] == typeThreeNodes[i].Id || controlNode.LinkedControlIds[0] == typeThreeNodes[i].id) {
                primaryLinkedcontrols.push(controlNode)
              }
            }
          }
          //place the cause node 
          if (primaryLinkedcontrols.length == 0 &&  typeThreeNodes[i].LinkedControlIds.length != 0) {
            const x = originX + 1 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypethree * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNumbertypethree++;
            rowNodeCount = 0;
          }
          else {
            const x = originX + maxConsequenceNodeLength * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypethree * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
          }
          //place the controls nodes link to the cause


          for (let i = 0; i < primaryLinkedcontrols.length; i++) {
            const x = originX + (columnNumber + 1) * horizontalSpacing;
            const y = originY + rowNumbertypethree * verticalSpacing;
            primaryLinkedcontrols[i].x = x;
            primaryLinkedcontrols[i].y = y;

            arrangedNodes.push(primaryLinkedcontrols[i]);
            rowNodeCount++;
            controlNodesPerRow++

            if (controlNodesPerRow >= 4 || i == primaryLinkedcontrols.length - 1) {
              rowNumbertypethree++;
              rowNodeCount = 0;
              controlNodesPerRow = 0
            }

            columnNumber = rowNodeCount;

          }



          ControlNodesLinkedToCause = [];
          primaryLinkedcontrols = []
        }

        if (typeThreeNodes[i].Title == 'Control Node' && typeThreeNodes[i].ControlData.IsLinkedToCauseOrConsequence === false) {
          const x = originX + (columnNumber + 1) * horizontalSpacing;
          const y = originY + rowNumbertypethree * verticalSpacing;
          typeThreeNodes[i].x = x;
          typeThreeNodes[i].y = y;

          arrangedNodes.push(typeThreeNodes[i]);
          rowNodeCount++;
          controlNodesPerRow++
          rowNumber = rowNumbertypethree
          if (controlNodesPerRow >= 4) {
            rowNumbertypethree++;
            rowNodeCount = 0;
            controlNodesPerRow = 0
          }

          columnNumber = rowNodeCount;
        }
        if (typeThreeNodes[i].Title == 'Consequences Node' && typeThreeNodes[i].LinkedControlIds.length == 0) {
          let notLinkedControlCount = typeThreeNodes.filter(node => node.Title === 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === false).length;
          
          if (notLinkedControlCount % 4 !== 0) {
            rowNumbertypethree++
            const x = originX + 1 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypethree * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNodeCount = 0;
          }
          else {
            const x = originX + 1 * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypethree * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNumbertypethree++
            rowNodeCount = 0;
          }
      

        }

      }




      //Arrange Risk node (in the middle)
      let riskYCodinate = 0;
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
        CommonPoint.y = riskNode.y + CommonPointYValue;
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
        { nodes: IncidentNodes, verticalSpacingFour: isExpand ? 500 : 250 },
        { nodes: KPINodes, verticalSpacingFour: isExpand ? 400 : 250 },
        { nodes: TreatmentNodes, verticalSpacingFour: isExpand ? 420 : 250 },
        { nodes: AuditNodes, verticalSpacingFour: isExpand ? 300 : 250 },
        { nodes: HierarchyNodes, verticalSpacingFour: isExpand ? 220 : 250 },
        { nodes: AuditRecommendationNodes, verticalSpacingFour: isExpand ? 250 : 250 },
        { nodes: AuditFindingNodes, verticalSpacingFour: isExpand ? 250 : 250 },
        { nodes: PolicyNodes, verticalSpacingFour: isExpand ? 450 : 250 }
      ].filter(({ nodes }) => nodes.length > 0);

      // Total number of columns
      const totalColumns = nonEmptyHeaders.length;

      // Function to arrange nodes in a column based on their header
      const arrangeNodesInColumn = (nodes, columnOffset, totalColumns, verticalSpacingFour) => {
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
      nonEmptyHeaders.forEach(({ nodes, verticalSpacingFour }, index) => {
        arrangeNodesInColumn(nodes, index, totalColumns, verticalSpacingFour);
      });


    }
    return arrangedNodes;
  }

  
}

// for (let i = 0; i < typeTwoNodes.length; i++) {

      //   if ((i < typeTwoNodes.length - 1 && typeTwoNodes[i + 1].Title === 'Cause Node'))
      //   // (i < typeThreeNodes.length - 1 && typeThreeNodes[i + 1].Title === 'Consequences Node'))
      //   {
      //     maxNodesPerRow = 5;
      //   } else {
      //     maxNodesPerRow = 4;
      //   }


      //   controlHorizontalSpacing = horizontalSpacing;
      //   if (rowNodeCount == 0) {
      //     controlHorizontalSpacing = 520;
      //   }



      //   if (typeTwoNodes[i].Title == 'Control Node') {


      //     const x = originX - (columnNumber + 1) * horizontalSpacing;
      //     const y = originY + rowNumbertypetwo * verticalSpacing;
      //     typeTwoNodes[i].x = x;
      //     typeTwoNodes[i].y = y;

      //     arrangedNodes.push(typeTwoNodes[i]);
      //     rowNodeCount++;
      //     controlNodesPerRow++

      //     if (rowNodeCount === maxNodesPerRow ||
      //       ((typeTwoNodes[i].id == lastLinkedControlIdCause || typeTwoNodes[i].Id == lastLinkedControlIdCause) && lastLinkedControlIdCause != undefined)) {
      //       rowNumbertypetwo++;
      //       rowNodeCount = 0;

      //     }

      //     columnNumber = rowNodeCount;

      //   } else if (typeTwoNodes[i].Title == 'Cause Node') {
      //     for (let j = 0; j < typeTwoNodes[i].LinkedControlIds.length + 1; j++) {

      //       controlId = typeTwoNodes[i].LinkedControlIds[j];
      //       // Find the control node in originalData with the controlId
      //       var controlNode = typeTwoNodes.find(node => node.Id === controlId);
      //       if (controlNode) {
      //         ControlNodesLinkedToCause.push(controlNode);
      //         if (controlNode.LinkedControlIds[0] == typeTwoNodes[i].Id) {
      //           primaryLinkedcontrols.push(controlId)
      //         }
      //       }
      //     }

      //     if (typeTwoNodes[i].ParentNodeId != 0 && typeTwoNodes[i].Title == 'Cause Node') {
      //       lastLinkedControlIdCause = primaryLinkedcontrols[primaryLinkedcontrols.length - 1];

      //     }


      //     const x = originX - maxCauseNodeLength * horizontalSpacing; // Fifth place from the left
      //     const y = originY + rowNumbertypetwo * verticalSpacing;
      //     typeTwoNodes[i].x = x;
      //     typeTwoNodes[i].y = y;
      //     arrangedNodes.push(typeTwoNodes[i]);
      //     rowNodeCount++;
      //     rowNumbertypetwo++
      //     rowNodeCount = 0;
      //     columnNumber = rowNodeCount;


      //   }
      //   ControlNodesLinkedToCause = [];
      //   primaryLinkedcontrols = []
      // }

console.log()
 // for (let i = 0; i < typeThreeNodes.length; i++) {

      //   if ((i < typeThreeNodes.length - 1 && typeThreeNodes[i + 1].Title === 'Consequences Node'))
      //   // (i < typeThreeNodes.length - 1 && typeThreeNodes[i + 1].Title === 'Consequences Node'))
      //   {
      //     maxNodesPerRow = 5;
      //   } else {
      //     maxNodesPerRow = 4;
      //   }


      //   controlHorizontalSpacing = horizontalSpacing;
      //   if (rowNodeCount == 0) {
      //     controlHorizontalSpacing = 520;
      //   }

      //   if (typeThreeNodes[i].Title == 'Control Node') {

      //     // let controlIdcons = typeThreeNodes[i].Id
      //     const x = originX + (columnNumber + 1) * horizontalSpacing;
      //     const y = originY + rowNumbertypethree * verticalSpacing;
      //     typeThreeNodes[i].x = x;
      //     typeThreeNodes[i].y = y;

      //     arrangedNodes.push(typeThreeNodes[i]);
      //     rowNodeCount++;
      //     controlNodesPerRow++

      //     if (rowNodeCount === maxNodesPerRow ||
      //       ((typeThreeNodes[i].id == lastLinkedControlIdconsequence || typeThreeNodes[i].Id == lastLinkedControlIdconsequence) && lastLinkedControlIdconsequence != undefined)) {
      //       rowNumbertypethree++;
      //       rowNodeCount = 0;

      //     }
      //     columnNumber = rowNodeCount;

      //   } else if (typeThreeNodes[i].Title == 'Consequences Node') {

      //     for (let j = 0; j < typeThreeNodes[i].LinkedControlIds.length + 1; j++) {

      //       controlId = typeThreeNodes[i].LinkedControlIds[j];
      //       // Find the control node in originalData with the controlId
      //       var controlNode = typeThreeNodes.find(node => node.Id === controlId);
      //       if (controlNode) {
      //         ControlNodesLinkedToCause.push(controlNode);
      //         if (controlNode.LinkedControlIds[0] == typeThreeNodes[i].Id) {
      //           primaryLinkedcontrols.push(controlId)
      //         }
      //       }
      //     }

      //     if (typeThreeNodes[i].ParentNodeId != 0 && typeThreeNodes[i].Title == 'Consequences Node') {
      //       lastLinkedControlIdconsequence = primaryLinkedcontrols[primaryLinkedcontrols.length - 1];


      //     }


      //     const x = originX + maxConsequenceNodeLength * horizontalSpacing; // Fifth place from the left
      //     const y = originY + rowNumbertypethree * verticalSpacing;
      //     typeThreeNodes[i].x = x;
      //     typeThreeNodes[i].y = y;
      //     arrangedNodes.push(typeThreeNodes[i]);
      //     rowNodeCount++;
      //     rowNumbertypethree++;
      //     rowNodeCount = 0;
      //     columnNumber = rowNodeCount;
      //   }
      //   ControlNodesLinkedToCause = [];
      //   primaryLinkedcontrols = []
      // }
console.log()

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
