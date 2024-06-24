export class BowTieDiagramHelper {
  constructor() { }

  public RearrangedDataset = [];

  ArrangeData(originalData) {

    //get the data seperated from the original data array
    const riskNode = originalData.find((node) => node.Type === 1 && node.ParentNodeId === 0);
    const CommonPoint = originalData.find((node) => node.Title == 'Common-point');
    const linkedCauseNodes = originalData.filter((node) => node.Title == 'Cause Node' && node.ParentNodeId != 0);
    const notLinkedCauseNodes = originalData.filter((node) => node.Title == 'Cause Node' && node.ParentNodeId == 0);
    const linkedConsequenceNodes = originalData.filter((node) => node.Title == 'Consequences Node' && node.ParentNodeId != 0);
    const LinkedControlNodes = originalData.filter((node) => node.Title == 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === true);
    const notLinkedConsequenceNodes = originalData.filter((node) => node.Title == 'Consequences Node' && node.ParentNodeId == 0);
    const notLinkedControlNodes = originalData.filter((node) => node.Title == 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === false);
    const linkedBottomNodes = originalData.filter((node) => node.Type === 4);
    
    //push risk node and common point
    this.RearrangedDataset.push(CommonPoint);
    this.RearrangedDataset.push(riskNode);

    // Combine cause and consequence nodes
    const linkedNodes = linkedCauseNodes.concat(linkedConsequenceNodes);

    // Iterate through each node (both cause and consequence) to push the linked causes and consequnces to the relavant control
    for (let i = 0; i < linkedNodes.length; i++) {
      const node = linkedNodes[i];
      // Iterate through each control ID in the node's LinkedControlIds array
      for (let j = 0; j < node.LinkedControlIds.length; j++) {
        const controlId = node.LinkedControlIds[j];
        // Find the control node in LinkedControlNodes with the current control ID
        for (let k = 0; k < LinkedControlNodes.length; k++) {
          const controlNode = LinkedControlNodes[k];
          // If the control node is found, ensure that its LinkedControlIds array is initialized
          if (controlNode.Id === controlId || controlNode.id === controlId) {
            if (!controlNode.LinkedControlIds) {
              controlNode.LinkedControlIds = []; // Initialize the array if it's undefined
            }
            // Push the node's ID to the control node's LinkedControlIds array
            controlNode.LinkedControlIds.push(node.Id || node.id);
            // Break out of the loop once the control node is found
            break;
          }
        }
      }
    }

    //loop causes and arrage the data set
    for (let i = 0; i < linkedCauseNodes.length; i++) {
      
      if (linkedCauseNodes[i].LinkedControlIds.length > 4) {

        const controlsToAddIds = linkedCauseNodes[i].LinkedControlIds.slice(0, 4); // Get the first 4 control IDs


        // Find the controls nodes in originalData and push them to RearrangedDataset
        for (const controlId of controlsToAddIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId) && linkedCauseNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }

        // Find the relevant cause node in originalData and push it after the 4th element

        this.RearrangedDataset.push(linkedCauseNodes[i]);


        // Find and push the remaining control nodes (if any) after the relevant cause
        for (const controlId of linkedCauseNodes[i].LinkedControlIds.slice(4)) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId) && linkedCauseNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }
      }
      else {

        for (const controlId of linkedCauseNodes[i].LinkedControlIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId) && linkedCauseNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }
        this.RearrangedDataset.push(linkedCauseNodes[i]);


      }

    }

    //loop consequences and arrage the data set
    for (let i = 0; i < linkedConsequenceNodes.length; i++) {

      if (linkedConsequenceNodes[i].LinkedControlIds.length > 4) {
        const controlsToAddIds = linkedConsequenceNodes[i].LinkedControlIds.slice(0, 4); // Get the first 4 control IDs


        // Find the controls nodes in originalData and push them to RearrangedDataset
        for (const controlId of controlsToAddIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId) && linkedConsequenceNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }

        // Find the relevant cause node in originalData and push it after the 4th element

        this.RearrangedDataset.push(linkedConsequenceNodes[i]);


        // Find and push the remaining control nodes (if any) after the relevant cause
        for (const controlId of linkedConsequenceNodes[i].LinkedControlIds.slice(4)) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId) && linkedConsequenceNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }
      }
      else {

        for (const controlId of linkedConsequenceNodes[i].LinkedControlIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId) && linkedConsequenceNodes[i].Id == controlNode.LinkedControlIds[0]) {
            this.RearrangedDataset.push(controlNode);
          }
        }
        this.RearrangedDataset.push(linkedConsequenceNodes[i]);
      }

    }

    //push all other nodes to the data set
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

  ArrangeNodes(isExpand: boolean) {

    const arrangedNodes = [];
    let maxCauseNodeLength = 0;
    let causeNodeLength = 0;

    // Find the risk node (type 1 with ParentNodeId 0)
    const riskNode = this.RearrangedDataset.find((node) => node.Type === 1 && node.ParentNodeId === 0);
    const CommonPoint = this.RearrangedDataset.find((node) => node.Title == 'Common-point');

    //filter all causes
    const causeNodes = this.RearrangedDataset.filter(
      (node) => node.Title == 'Cause Node'
    );


    /*find the cause that have maximum linked controls in the LinkedControlIds array to place the cause after the last column of maximum 
    linked control row and all other causes place the same column  */

    for (let i = 0; i < causeNodes.length; i++) {
      if (causeNodes[i].LinkedControlIds.length < 4) {
        causeNodeLength = causeNodes[i].LinkedControlIds.length;

        if (causeNodeLength >= maxCauseNodeLength) {
          maxCauseNodeLength = causeNodeLength + 1;
        }
      } else {
        maxCauseNodeLength = 5;
      }
    }

    //filter all Consequences

    const consequenceNodes = this.RearrangedDataset.filter(
      (node) => node.Title == 'Consequences Node'
    );
    let maxConsequenceNodeLength = 0;
    let consequenceNodeLength = 0;

    /*find the Consequences that have maximum linked controls in the LinkedControlIds array to place the Consequences after the last column of maximum 
    linked control row and all other Consequences place the same column  */

    for (let i = 0; i < consequenceNodes.length; i++) {
      if (consequenceNodes[i].LinkedControlIds.length < 4) {
        consequenceNodeLength = consequenceNodes[i].LinkedControlIds.length;

        if (consequenceNodeLength >= maxConsequenceNodeLength) {
          maxConsequenceNodeLength = consequenceNodeLength + 1;
        }
      } else {
        maxConsequenceNodeLength = 5;
      }
    }

    //if risk node exist only the other nodes beging to arrange

    if (riskNode) {
      const horizontalSpacing = 500;
      const verticalSpacing = isExpand ? 470 : 250;
      let riskCordinateIncrementValue = 10;
      let CommonPointYValueIncrement = isExpand ? 500 : 300;
      const originX = 0;
      const originY = 0;
      let rowNumbertypetwo = 0;
      let columnNumber = 0;
      let rowNodeCount = 0;      
      let controlNodesPerRow = 0;
      var ControlNodesLinkedToCause = [];
      var primaryLinkedcontrols = [];
      let CommonPointYValue;
      var controlId: number;
      const typeTwoNodes = this.RearrangedDataset.filter((node) => node.Type === 2); //filter type two nodes
      const typeThreeNodes = this.RearrangedDataset.filter((node) => node.Type === 3);
      const notLinkedControlTypeTwo = typeTwoNodes.filter((node) => node.Title === 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === false);
      const notLinkedControlTypeThree = typeThreeNodes.filter((node) => node.Title == 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === false);

      // arrange type 2 nodes (left of type 1)
      for (let i = 0; i < typeTwoNodes.length; i++) {

        if (typeTwoNodes[i].Title == 'Cause Node' && typeTwoNodes[i].LinkedControlIds.length != 0) {

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

          //place the cause node 
          if (primaryLinkedcontrols.length == 0 && typeTwoNodes[i].LinkedControlIds.length != 0) {
            //place the cause node 
            rowNodeCount = 0;
            const x = originX - 1 * horizontalSpacing; 
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNumbertypetwo++;
            rowNodeCount = 0;
          }
          else {
            //place the cause node 
            const x = originX - maxCauseNodeLength * horizontalSpacing; 
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

          if (controlNodesPerRow == 4 || (notLinkedControlTypeTwo[notLinkedControlTypeTwo.length - 1].Id == typeTwoNodes[i].Id && typeTwoNodes[i].Id != undefined)
            || (notLinkedControlTypeTwo[notLinkedControlTypeTwo.length - 1].id == typeTwoNodes[i].id && typeTwoNodes[i].id != undefined)) {
            rowNumbertypetwo++;
            rowNodeCount = 0;
            controlNodesPerRow = 0
          }

          columnNumber = rowNodeCount;

        }

        if (typeTwoNodes[i].Title == 'Cause Node' && typeTwoNodes[i].LinkedControlIds.length == 0) {

          const x = originX - 1 * horizontalSpacing; // Fifth place from the left
          const y = originY + rowNumbertypetwo * verticalSpacing;
          typeTwoNodes[i].x = x;
          typeTwoNodes[i].y = y;
          arrangedNodes.push(typeTwoNodes[i]);
          rowNumbertypetwo++
          rowNodeCount = 0;
        }
      }


      // Arrange type 3 nodes (right of type 1)
      rowNodeCount = 0;
      columnNumber = 0;
      controlNodesPerRow = 0;
      let rowNumbertypethree = 0;
      //const notLinkedControl = typeThreeNodes.filter((node) => node.Title == 'Control Node' && node.ControlData.IsLinkedToCauseOrConsequence === false);

      for (let i = 0; i < typeThreeNodes.length; i++) {

        if (typeThreeNodes[i].Title == 'Consequences Node' && typeThreeNodes[i].LinkedControlIds.length != 0) {

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
          //place the Consequences node 
          if (primaryLinkedcontrols.length == 0 && typeThreeNodes[i].LinkedControlIds.length != 0) {
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

          if (controlNodesPerRow == 4 || (notLinkedControlTypeThree[notLinkedControlTypeThree.length - 1].Id == typeThreeNodes[i].Id && typeThreeNodes[i].Id != undefined)
            || (notLinkedControlTypeThree[notLinkedControlTypeThree.length - 1].id == typeThreeNodes[i].id && typeThreeNodes[i].id != undefined)) {
            rowNumbertypethree++;
            rowNodeCount = 0;
            controlNodesPerRow = 0
          }

          columnNumber = rowNodeCount;
        }

        if (typeThreeNodes[i].Title == 'Consequences Node' && typeThreeNodes[i].LinkedControlIds.length == 0) {

          const x = originX + 1 * horizontalSpacing; // Fifth place from the left
          const y = originY + rowNumbertypethree * verticalSpacing;
          typeThreeNodes[i].x = x;
          typeThreeNodes[i].y = y;
          arrangedNodes.push(typeThreeNodes[i]);
          rowNumbertypethree++
          rowNodeCount = 0;
        }

      }



      let riskYCodinate = 0;

      if (typeThreeNodes.length == 0 && typeTwoNodes.length == 0) {
        riskYCodinate = originY;
      }

      else if (typeThreeNodes.length != 0 && rowNumbertypetwo >= rowNumbertypethree) {
        let getMiddleYValueForRiskTypeThree = typeThreeNodes[0].y + typeThreeNodes[typeThreeNodes.length - 1].y

        riskYCodinate = getMiddleYValueForRiskTypeThree === 0 ? originY : getMiddleYValueForRiskTypeThree / 2;
      }
      else if (typeThreeNodes.length == 0) {
        let getMiddleYValueForRiskTypeTwo = typeTwoNodes[0].y + typeTwoNodes[typeTwoNodes.length - 1].y

        riskYCodinate = getMiddleYValueForRiskTypeTwo === 0 ? originY : getMiddleYValueForRiskTypeTwo / 2;
      }
      else if (typeTwoNodes.length != 0 && rowNumbertypetwo < rowNumbertypethree) {
        let getMiddleYValueForRiskTypeTwo = typeTwoNodes[0].y + typeTwoNodes[typeTwoNodes.length - 1].y
        riskYCodinate = getMiddleYValueForRiskTypeTwo === 0 ? originY : getMiddleYValueForRiskTypeTwo / 2;
      }
      else if (typeTwoNodes.length == 0) {
        let getMiddleYValueForRiskTypeThree = typeThreeNodes[0].y + typeThreeNodes[typeThreeNodes.length - 1].y

        riskYCodinate = getMiddleYValueForRiskTypeThree === 0 ? originY : getMiddleYValueForRiskTypeThree / 2;
      }



      if ((typeTwoNodes.length == 0 && typeThreeNodes.length == 0) || (rowNumbertypetwo == 0 && rowNumbertypethree == 0)
        || (rowNumbertypetwo == 1 && rowNumbertypethree == 1) || (rowNumbertypetwo == 0 && rowNumbertypethree == 1)
        || (rowNumbertypetwo == 1 && rowNumbertypethree == 0)) {
        let riskNodeX = originX;
        let riskNodeY = originY + riskCordinateIncrementValue;
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


      //...............................Arrange common point...........................................

      if ((typeTwoNodes.length == 0 && typeThreeNodes.length == 0) || (rowNumbertypetwo == 0 && rowNumbertypethree == 0)
        || (rowNumbertypetwo == 1 && rowNumbertypethree == 1) || (rowNumbertypetwo == 0 && rowNumbertypethree == 1)
        || (rowNumbertypetwo == 1 && rowNumbertypethree == 0)) {
        CommonPointYValue = isExpand ? riskNode.y + 800 : riskNode.y + 500;
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

      rowNodeCount = 0;
      let typeFourNodePlacingValue;



      // Filter nodes based on their header types
      const IncidentNodes = this.RearrangedDataset.filter((node) => node.Header == 'Incident');
      const KPINodes = this.RearrangedDataset.filter((node) => node.Header == 'KPI');
      const TreatmentNodes = this.RearrangedDataset.filter((node) => node.Header == 'Action');
      const AuditNodes = this.RearrangedDataset.filter((node) => node.Header == 'Audit');
      const HierarchyNodes = this.RearrangedDataset.filter((node) => node.Header == 'Hierarchy Linkages');
      const AuditRecommendationNodes = this.RearrangedDataset.filter((node) => node.Header == 'Audit Recommendations');
      const AuditFindingNodes = this.RearrangedDataset.filter((node) => node.Header == 'Audit Finding');
      const PolicyNodes = this.RearrangedDataset.filter((node) => node.Header == 'Policy');
      const linkRiskNodes = this.RearrangedDataset.filter((node) => node.Header == 'Linked Risk');
      const ObligationNodes = this.RearrangedDataset.filter((node) => node.Header == 'Obligation');
      const AuthorityDocumentNodes = this.RearrangedDataset.filter((node) => node.Header == 'Authority Document');

      const availableTypeFourNodes = [
        { nodes: TreatmentNodes, verticalSpacingFour: isExpand ? 400 : 200 },
        { nodes: KPINodes, verticalSpacingFour: isExpand ? 380 : 200 },
        { nodes: IncidentNodes, verticalSpacingFour: isExpand ? 430 : 200 },
        { nodes: AuditNodes, verticalSpacingFour: isExpand ? 250 : 200 },
        { nodes: linkRiskNodes, verticalSpacingFour: isExpand ? 480 : 200 },
        { nodes: ObligationNodes, verticalSpacingFour: isExpand ? 330 : 200 },
        { nodes: HierarchyNodes, verticalSpacingFour: isExpand ? 250 : 200 },
        { nodes: AuthorityDocumentNodes, verticalSpacingFour: isExpand ? 320 : 200 },
        { nodes: PolicyNodes, verticalSpacingFour: isExpand ? 320 : 200 },
        { nodes: AuditRecommendationNodes, verticalSpacingFour: isExpand ? 200 : 200 },
        { nodes: AuditFindingNodes, verticalSpacingFour: isExpand ? 200 : 200 },
      ].filter(({ nodes }) => nodes.length > 0);

      // Total number of columns
      const totalColumns = availableTypeFourNodes.length;

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
      availableTypeFourNodes.forEach(({ nodes, verticalSpacingFour }, index) => {
        arrangeNodesInColumn(nodes, index, totalColumns, verticalSpacingFour);
      });

    }
    return arrangedNodes;
  }
  
}
