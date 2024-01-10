

export class BowTieDiagramHelper {
  constructor(
  ) {}
  
  ArrangeNodes(originalData, isExpand:boolean) {

    // console.log(originalData);
    const arrangedNodes = [];
    // Find the risk node (type 1 with ParentNodeId 0)
    const riskNode = originalData.find(
      (node) => node.Type === 1 && node.ParentNodeId === 0
    );

    const causeNodes = originalData.filter((node) => node.Title == 'Cause Node');
    let maxCauseNodeLength = 0;
    let causeNodeLength = 0;

    for (let i = 0; i < causeNodes.length; i++) {

      if (causeNodes[i].LinkedControlIds.length < 4) {

        causeNodeLength = causeNodes[i].LinkedControlIds.length;


        if (causeNodeLength >= maxCauseNodeLength) {
          maxCauseNodeLength = causeNodeLength  + 1;
        }
        
      }

      else {
        maxCauseNodeLength = 5;
      }
    }

    const consequenceNodes = originalData.filter((node) => node.Title == 'Consequences Node');
    let maxConsequenceNodeLength = 0;
    let consequenceNodeLength = 0;

    for (let i = 0; i < consequenceNodes.length; i++) {

      if (consequenceNodes[i].LinkedControlIds.length < 4) {

        consequenceNodeLength = consequenceNodes[i].LinkedControlIds.length;


        if (consequenceNodeLength >= maxConsequenceNodeLength) {
          maxConsequenceNodeLength = consequenceNodeLength + 1  ;
        }
      
      }

      else {
        maxConsequenceNodeLength = 5;
      }
    }




    if (riskNode) {
      const horizontalSpacing = 520;
      let verticalSpacing = 520;
      let verticalSpacingFour = 520;
      const maxNodesPerRow = 5;
      const maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4
      let typeFourIndex = 0;
      let rowNodeCountControl = 0;

      const originX = 0;
      const originY = 0;
      const typeTwoNodes = originalData.filter((node) => node.Type === 2);
      let rowNumbertypetwo = 0;
      let columnNumber = 0;
      let rowNodeCount = 0;
      let controlHorizontalSpacing = 0;

      if(!isExpand)
      {
      
       verticalSpacing = 600;
      
       
      }
      

      

      // arrange type 2 nodes (left of type 1)
      for (let i = 0; i < typeTwoNodes.length; i++) {

        controlHorizontalSpacing = horizontalSpacing;
        if (rowNodeCount == 0) {
          controlHorizontalSpacing = 600;
        }

       

        if (typeTwoNodes[i].Title == 'Control Node') {


            const x = originX - (columnNumber + 1) * controlHorizontalSpacing;
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;

            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;
          

            if (rowNodeCount === maxNodesPerRow) {
              rowNumbertypetwo++;
              rowNodeCount = 0;
            }
          
            columnNumber = rowNodeCount;

         } else if (  typeTwoNodes[i].Title == 'Cause Node') {

            const x = originX - maxCauseNodeLength * horizontalSpacing; // Fifth place from the left
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;
            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;
            rowNumbertypetwo++;
            rowNodeCount = 0;
            columnNumber = rowNodeCount;

            console.log(typeTwoNodes);
          }

      }

      // Arrange type 3 nodes (right of type 1)
      rowNodeCount = 0;
      columnNumber = 0;
      let rowNumbertypethree = 0;
      const typeThreeNodes = originalData.filter((node) => node.Type === 3);

      for (let i = 0; i < typeThreeNodes.length; i++) {

        controlHorizontalSpacing = horizontalSpacing;
        if (rowNodeCount == 0) {
          controlHorizontalSpacing = 600;
        }

       if (typeThreeNodes[i].Title == 'Control Node') {

          const x = originX + (columnNumber + 1) * controlHorizontalSpacing;
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
      
      if(typeTwoNodes.length!= 0  && typeTwoNodes.length >= typeThreeNodes.length){
         riskYCodinate = (typeTwoNodes[typeTwoNodes.length - 1].y) - 250 ;
      }
      else if(typeThreeNodes.length != 0 && typeTwoNodes.length < typeThreeNodes.length){
         riskYCodinate = (typeThreeNodes[typeThreeNodes.length - 2].y) - 200;
      }

      if(typeTwoNodes.length == 0 && typeThreeNodes.length == 0){
        let riskNodeX = originX;
        let riskNodeY = originY;
        riskNode.x = riskNodeX;
        riskNode.y = riskNodeY;
        arrangedNodes.push(riskNode);
      }
      else{
      
      let riskNodeX = originX;
      let riskNodeY = originY + riskYCodinate - verticalSpacing / 2; 
      riskNode.x = riskNodeX;
      riskNode.y = riskNodeY;
      arrangedNodes.push(riskNode);
    }

     

    let typeFourNodeCount
      // Arrange type 4 nodes (below type 2 and type 3)
      const typeFourNodes = originalData.filter((node) => node.Type === 4);
      if(typeFourNodes.length < 11){
       typeFourNodeCount = (typeFourNodes.length / 2);}
      else{
        typeFourNodeCount = Math.ceil(typeFourNodes.length / typeFourNodes.length ) * 6;
      }

     
      let rowNumbertypeFour = 3;
      columnNumber = typeFourIndex % maxNodesPerRowFour; // Calculate the column number
     
      typeFourNodes.forEach((node, index) => {
        

      

        // Adjusting the starting point for type 4 nodes
        
        const x = riskNode.x + (columnNumber - typeFourNodeCount) * horizontalSpacing;    
        const y = riskNode.y + rowNumbertypeFour  * verticalSpacingFour;

        node.x = x;
        node.y = y;
        arrangedNodes.push(node);
      
        typeFourIndex++;
        columnNumber++;
        rowNodeCount++;

        if (rowNodeCount === maxNodesPerRowFour) {
          
          rowNumbertypeFour++;
          rowNodeCount = 0;
          columnNumber = rowNodeCount; 
         
        }
       
      });
    
      // Arrange control nodes that are not link to cause or consequence nodes (below type 2 and type 3)

      // if (originalData.ControlData?.IsLinkedToCauseOrConsequence == false) {
      //   const notLinkedNodes = originalData.filter((node) => node?.IsLinkedToCauseOrConsequence === false);
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

    }
    return arrangedNodes;
  }

}
