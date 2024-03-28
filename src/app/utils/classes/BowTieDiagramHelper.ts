export class BowTieDiagramHelper {
  constructor() { }

  public RearrangedDataset = [];

  ArrangeData(originalData) {

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
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId)) {
            this.RearrangedDataset.push(controlNode);
          }
        }

        // Find the relevant cause node in originalData and push it after the 4th element

        this.RearrangedDataset.push(linkedCauseNodes[i]);


        // Find and push the remaining control nodes (if any) after the relevant cause
        for (const controlId of linkedCauseNodes[i].LinkedControlIds.slice(4)) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId)) {
            this.RearrangedDataset.push(controlNode);
          }
        }
      }
      else {

        for (const controlId of linkedCauseNodes[i].LinkedControlIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId)) {
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
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId)) {
            this.RearrangedDataset.push(controlNode);
          }
        }

        // Find the relevant cause node in originalData and push it after the 4th element

        this.RearrangedDataset.push(linkedConsequenceNodes[i]);


        // Find and push the remaining control nodes (if any) after the relevant cause
        for (const controlId of linkedConsequenceNodes[i].LinkedControlIds.slice(4)) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId)) {
            this.RearrangedDataset.push(controlNode);
          }
        }
      }
      else {

        for (const controlId of linkedConsequenceNodes[i].LinkedControlIds) {
          const controlNode = originalData.find(node => node.Id === controlId);
          if (controlNode && !this.RearrangedDataset.find(node => node.Id === controlId)) {
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
      let verticalSpacingFour = isExpand ? 50 : 50;
      let riskCordinateIncrementValue = 10;
      let CommonPointYValueIncrement = isExpand ? 500 : 300;
      let CommonPointYValue;
      let maxNodesPerRow;
      const maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4
      let typeFourIndex = 0;
      const originX = 0;
      const originY = 0;
      let rowNumbertypetwo = 0;
      let columnNumber = 0;
      let rowNodeCount = 0;
      let lastLinkedControlId;

      const typeTwoNodes = this.RearrangedDataset.filter((node) => node.Type === 2); //filter type two nodes
      const typeThreeNodes = this.RearrangedDataset.filter((node) => node.Type === 3);






      // arrange type 2 nodes (left of type 1)
      for (let i = 0; i < typeTwoNodes.length; i++) {

        if ((i < typeTwoNodes.length - 1 && typeTwoNodes[i + 1].Title === 'Cause Node'))
        // (i < typeThreeNodes.length - 1 && typeThreeNodes[i + 1].Title === 'Consequences Node'))
        {
          maxNodesPerRow = 5;
        } else {
          maxNodesPerRow = 4;
        }

        // arrange type two control nodes

        if (typeTwoNodes[i].Title == 'Control Node') {
          const x = originX - (columnNumber + 1) * horizontalSpacing;
          const y = originY + rowNumbertypetwo * verticalSpacing;
          typeTwoNodes[i].x = x;
          typeTwoNodes[i].y = y;

          arrangedNodes.push(typeTwoNodes[i]);
          rowNodeCount++;
          //move to next row when nodes per row = 5
          if (rowNodeCount === maxNodesPerRow ||
            (((typeTwoNodes[i].Id == lastLinkedControlId) || (typeTwoNodes[i].id == lastLinkedControlId))  && lastLinkedControlId != undefined) ||
            (typeTwoNodes.length > i + 1 && typeTwoNodes[i + 1].Title == 'Cause Node' && typeTwoNodes[i + 1].LinkedControlIds.length == 0)) {
            rowNumbertypetwo++;
            rowNodeCount = 0;
           
          }
  
          columnNumber = rowNodeCount;
        }
        //arrange type two cause nodes
        else if (typeTwoNodes[i].Title == 'Cause Node') {

          if (typeTwoNodes[i].ParentNodeId != 0 && typeTwoNodes[i].Title == 'Cause Node' && typeTwoNodes[i].LinkedControlIds.length > 4) {
            lastLinkedControlId = typeTwoNodes[i].LinkedControlIds[typeTwoNodes[i].LinkedControlIds.length - 1];
           
          }
          if (typeTwoNodes[i].LinkedControlIds.length == 0) {
            const x = originX -  horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;
            rowNumbertypetwo++;
            rowNodeCount = 0;
            columnNumber = rowNodeCount;
          }
          else {
            const x = originX - maxCauseNodeLength * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;
            rowNumbertypetwo++;
            rowNodeCount = 0;
            columnNumber = rowNodeCount;
          }

        }
      }

      // Arrange type 3 nodes (right of type 1)
      rowNodeCount = 0;
      columnNumber = 0;
      let rowNumbertypethree = 0;


      for (let i = 0; i < typeThreeNodes.length; i++) {

        if ((i < typeThreeNodes.length - 1 && typeThreeNodes[i + 1].Title === 'Consequences Node')) {
          maxNodesPerRow = 5;
        } else {
          maxNodesPerRow = 4;
        }




        // arrange type three control nodes
        if (typeThreeNodes[i].Title == 'Control Node') {
          const x = originX + (columnNumber + 1) * horizontalSpacing;
          const y = originY + rowNumbertypethree * verticalSpacing;
          typeThreeNodes[i].x = x;
          typeThreeNodes[i].y = y;
          arrangedNodes.push(typeThreeNodes[i]);
          rowNodeCount++;
          //move to next row when nodes per row = 5
          if (rowNodeCount === maxNodesPerRow ||
            (((typeThreeNodes[i].Id == lastLinkedControlId) || (typeThreeNodes[i].id == lastLinkedControlId) ) && lastLinkedControlId != undefined) ||
            (typeThreeNodes.length > i + 1 && typeThreeNodes[i + 1].Title == 'Consequences Node' && typeThreeNodes[i + 1].LinkedControlIds.length == 0)) {
            rowNumbertypethree++;
            rowNodeCount = 0;
          }
          columnNumber = rowNodeCount;
        }
        //arrange type two Consequences nodes
        else if (typeThreeNodes[i].Title == 'Consequences Node') {

          if (typeThreeNodes[i].ParentNodeId != 0 && typeThreeNodes[i].Title == 'Consequences Node' && typeThreeNodes[i].LinkedControlIds.length > 4) {
            lastLinkedControlId = typeThreeNodes[i].LinkedControlIds[typeThreeNodes[i].LinkedControlIds.length - 1];

          }

          if (typeThreeNodes[i].LinkedControlIds.length == 0) {
            const x = originX + horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypethree * verticalSpacing;
            typeThreeNodes[i].x = x;
            typeThreeNodes[i].y = y;
            arrangedNodes.push(typeThreeNodes[i]);
            rowNodeCount++;
            rowNumbertypethree++;
            rowNodeCount = 0;
            columnNumber = rowNodeCount;
          }

          else {
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
      }




      //.................................Arrange Risk node (in the middle).........................................
      let riskYCodinate = 0;
   
      if (typeTwoNodes.length != 0 && typeTwoNodes.length >= typeThreeNodes.length) {
        riskYCodinate = (typeThreeNodes[0].y + typeThreeNodes[typeThreeNodes.length - 1].y) / 2 - 100;
      }
      else if (typeThreeNodes.length != 0 && typeTwoNodes.length < typeThreeNodes.length) {
        riskYCodinate = (typeTwoNodes[0].y + typeTwoNodes[typeTwoNodes.length - 1].y) / 2;
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


      //..............................Arrange type 4 nodes (below type 2 and type 3)....................................

      //filter type four nodes

      const typeFourNodes = this.RearrangedDataset.filter((node) => node.Type === 4);
      rowNodeCount = 0;
     



      
      //................................Arrange type 4 nodes (below type 2 and type 3).....................................


      let typeFourNodePlacingValue;



      // Filter nodes based on their header types
      const IncidentNodes = this.RearrangedDataset.filter((node) => node.Header == 'Incident');
      const KPINodes = this.RearrangedDataset.filter((node) => node.Header == 'KPI');
      const TreatmentNodes = this.RearrangedDataset.filter((node) => node.Header == 'Action');
      const AuditNodes = this.RearrangedDataset.filter((node) => node.Header == 'Audit');
      const HierarchyNodes = this.RearrangedDataset.filter((node) => node.Header == 'Hierarchy Linkages');
      const AuditRecommendationNodes = this.RearrangedDataset.filter((node) => node.Header == 'Audit Recommendation');
      const AuditFindingNodes = this.RearrangedDataset.filter((node) => node.Header == 'Audit Finding');
      const PolicyNodes = this.RearrangedDataset.filter((node) => node.Header == 'Policy');
      const linkRiskNodes = this.RearrangedDataset.filter((node) => node.Header == 'Linked Risk');
      const ObligationNodes = this.RearrangedDataset.filter((node) => node.Header == 'Obligation');
      const AuthorityDocumentNodes = this.RearrangedDataset.filter((node) => node.Header == 'Authority Document');

      const nonEmptyHeaders = [
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
