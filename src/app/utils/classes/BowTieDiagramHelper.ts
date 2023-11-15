

export class BowTieDiagramHelper {
  constructor(
  ) {}
  
  ArrangeNodes(originalData, isExpand:boolean) {

   
    const arrangedNodes = [];

    // Find the risk node (type 1 with ParentNodeId 0)
      const riskNode = originalData.find(
        (node) => node.Type === 1 && node.ParentNodeId === 0
      );

    //filter all causes
      const causeNodes = originalData.filter((node) => node.Title == 'Cause Node');
      let maxCauseNodeLength = 0;
      let causeNodeLength = 0;

    /*find the cause that have maximum linked controls in the LinkedControlIds array to place the cause after the last column of maximum 
    linked control row and all other causes place the same column  */

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

    //filter all Consequences

      const consequenceNodes = originalData.filter((node) => node.Title == 'Consequences Node');
      let maxConsequenceNodeLength = 0;
      let consequenceNodeLength = 0;

    /*find the Consequences that have maximum linked controls in the LinkedControlIds array to place the Consequences after the last column of maximum 
    linked control row and all other Consequences place the same column  */

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


    //if risk node exist only the other nodes beging to arrange

    if (riskNode) {
      const horizontalSpacing = 500;
      let verticalSpacing = 520;
      let verticalSpacingFour = 520;
      const maxNodesPerRow = 5;
      const maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4
      let typeFourIndex = 0;

      const originX = 0;
      const originY = 0;
      const typeTwoNodes = originalData.filter((node) => node.Type === 2); //filter type two nodes
      let rowNumbertypetwo = 0;
      let columnNumber = 0;
      let rowNodeCount = 0;
      let controlHorizontalSpacing = 0;


      if(!isExpand)
      {
      
       verticalSpacing = 420;
      
       
      }
      

      

    // arrange type 2 nodes (left of type 1)
      for (let i = 0; i < typeTwoNodes.length; i++) {

        // assign the horizontal space for first node in type two side
        controlHorizontalSpacing = horizontalSpacing;
        if (rowNodeCount == 0) {
          controlHorizontalSpacing = 500;
        }

    // arrange type two control nodes

        if (typeTwoNodes[i].Title == 'Control Node') {


            const x = originX - (columnNumber + 1) * controlHorizontalSpacing;
            const y = originY + rowNumbertypetwo * verticalSpacing;
            typeTwoNodes[i].x = x;
            typeTwoNodes[i].y = y;

            arrangedNodes.push(typeTwoNodes[i]);
            rowNodeCount++;
          //move to next row when nodes per row = 5
            if (rowNodeCount === maxNodesPerRow) {
              rowNumbertypetwo++;
              rowNodeCount = 0;
            }
          
            columnNumber = rowNodeCount;

          }
    //arrange type two cause nodes      
          
          else if (  typeTwoNodes[i].Title == 'Cause Node') {

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

      // Arrange type 3 nodes (right of type 1)
      rowNodeCount = 0;
      columnNumber = 0;
      let rowNumbertypethree = 0;
      const typeThreeNodes = originalData.filter((node) => node.Type === 3);

      for (let i = 0; i < typeThreeNodes.length; i++) {

        // assign the horizontal space for first node in type two side
        controlHorizontalSpacing = horizontalSpacing;
        if (rowNodeCount == 0) {
          controlHorizontalSpacing = 500;
        }
        // arrange type three control nodes
       if (typeThreeNodes[i].Title == 'Control Node') {

          const x = originX + (columnNumber + 1) * controlHorizontalSpacing;
          const y = originY + rowNumbertypethree * verticalSpacing;
          typeThreeNodes[i].x = x;
          typeThreeNodes[i].y = y;
          arrangedNodes.push(typeThreeNodes[i]);
          rowNodeCount++;
         //move to next row when nodes per row = 5
          if (rowNodeCount === maxNodesPerRow) {
            rowNumbertypethree++;
            rowNodeCount = 0;   
          }
          columnNumber = rowNodeCount;

        }
      //arrange type two Consequences nodes   
        else if (typeThreeNodes[i].Title == 'Consequences Node') {
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

    //filter type four nodes

      const typeFourNodes = originalData.filter((node) => node.Type === 4);



    //Arrange Risk node (in the middle)
    
    //if type two nodes are more than type three and less than 6 then place risk at the end else place risk second last row

      if(typeTwoNodes.length!= 0 && typeTwoNodes.length >= typeThreeNodes.length){
          if(typeTwoNodes.length < 6 && typeTwoNodes.length != 0  ){

            riskYCodinate = typeTwoNodes[typeTwoNodes.length - 1].y;

          }
          else if(typeTwoNodes.length >= 6 && typeTwoNodes.length != 0 ){

            riskYCodinate = typeTwoNodes[typeTwoNodes.length - 2].y;

          }
      }

    //if type three nodes are more than type two and less than 6 then place risk at the end else place risk second last row

      else if(typeThreeNodes.length != 0 && typeTwoNodes.length < typeThreeNodes.length){

          if(typeThreeNodes.length < 6 && typeThreeNodes.length != 0  ){

            riskYCodinate = typeThreeNodes[typeThreeNodes.length - 1].y;

          }
          else if(typeThreeNodes.length >= 6 && typeThreeNodes.length != 0 ){

            riskYCodinate = typeThreeNodes[typeThreeNodes.length - 2].y;

          }
         
      }
    
    //if there are no type two and three nodes then place the risk in the middle(0,0)

      if(typeTwoNodes.length == 0 && typeThreeNodes.length == 0){
          let riskNodeX = originX;
          let riskNodeY = originY;
          riskNode.x = riskNodeX;
          riskNode.y = riskNodeY;
          arrangedNodes.push(riskNode);
      }
    //when there are no bottom nodes then risk place the middle of the most nodes available side  
      else if(typeFourNodes.length == 0){
          if(typeTwoNodes.length >= typeThreeNodes.length)
          {
              let middleNodeTypeTwo = Math.floor(typeTwoNodes.length / 2);       
              let riskNodeX = originX;        
              riskYCodinate = typeTwoNodes[middleNodeTypeTwo].y;          
              riskNode.x = riskNodeX;
              riskNode.y = originY + riskYCodinate - verticalSpacing / 2; 
              arrangedNodes.push(riskNode);
          }

          else{

              let middleNodeTypeThree = Math.floor(typeThreeNodes.length / 2);
              let riskNodeX = originX;
              riskYCodinate = typeThreeNodes[middleNodeTypeThree].y;
              riskNode.x = riskNodeX;
              riskNode.y = originY + riskYCodinate - verticalSpacing / 2; 
              arrangedNodes.push(riskNode);
            
          }
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
     if(typeFourNodes.length < 12){
       typeFourNodeCount = (typeFourNodes.length / 2);
     }
     else{
       typeFourNodeCount = (typeFourNodes.length / 3);
     }
      
      let rowNumbertypeFour = 2;
      let rowNumbertypeFourWhenOnlyBottomNodes = 1.5;
      columnNumber = typeFourIndex % maxNodesPerRowFour; // Calculate the column number
     
      typeFourNodes.forEach((node, index) => {
        
        // Adjusting the starting point for type 4 nodes when there are np type two or three nodes

        if(typeTwoNodes.length == 0 && typeThreeNodes.length == 0){

          const x = riskNode.x + (columnNumber - typeFourNodeCount) * horizontalSpacing; 
          const y = originY + rowNumbertypeFourWhenOnlyBottomNodes * verticalSpacingFour;
          node.x = x;
          node.y = y;
          arrangedNodes.push(node);
          typeFourIndex++;
          columnNumber++;
          rowNodeCount++;
        }

        else{
        
        const x = riskNode.x + (columnNumber - typeFourNodeCount) * horizontalSpacing;    
        const y = riskNode.y + rowNumbertypeFour  * verticalSpacingFour;

        node.x = x;
        node.y = y;
        arrangedNodes.push(node);
      
        typeFourIndex++;
        columnNumber++;
        rowNodeCount++;
        }
      //move to next row when nodes per row = 12
        if (rowNodeCount === maxNodesPerRowFour) {
          
          rowNumbertypeFour++;
          rowNumbertypeFourWhenOnlyBottomNodes++;
          rowNodeCount = 0;
          columnNumber = rowNodeCount; 
         
        }
       
      });
    
     

    }
    return arrangedNodes;
  }

}
