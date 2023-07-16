import { data } from 'src/app/models/data.model';

export class NodePlaceClass {
  constructor(
    private typeTwoNodes: data[],
    private typeThreeNodes: data[],
    private centralizedNode: data,
    private typeFourNodes: data[]
  ) {}
  private horizontalSpacing = 450;
  private verticalSpacing = 450;
  private verticalSpacingFour = 200;
  private maxNodesPerRow = 5;
  private maxNodesPerRowFour = 12; // Updated to 12 nodes per row for type 4
  private typeFourIndex = 0;

  private originX = 0;
  private originY = 0;
  private rowNumber = 0;
  private columnNumber = 0;
  private rowNodeCount = 0;
  private arrangedNodes = [];
  private maxTypeTwoTypeThreeRows: any;

  private placeTypeTwoNodes() {
    for (let i = 0; i < this.typeTwoNodes.length; i++) {
      if (
        this.typeTwoNodes[i].ParentNodeId == 1 &&
        this.typeTwoNodes[i].Title == 'Cause Node'
      ) {
        // Calculate the x and y coordinates for the cause node
        const x = this.originX - 5 * this.horizontalSpacing; // Fifth place from the left
        const y = this.originY + this.rowNumber * this.verticalSpacing;

        this.typeTwoNodes[i].x = x;
        this.typeTwoNodes[i].y = y;
        this.arrangedNodes.push(this.typeTwoNodes[i]);
        this.rowNumber++;
      } else if (this.typeTwoNodes[i].Title == 'Control Node') {
        const x =
          this.originX - (this.columnNumber + 1) * this.horizontalSpacing;
        const y = this.originY + this.rowNumber * this.verticalSpacing;
        this.typeTwoNodes[i].x = x;
        this.typeTwoNodes[i].y = y;
        this.arrangedNodes.push(this.typeTwoNodes[i]);
        this.rowNodeCount++;
        if (this.rowNodeCount === this.maxNodesPerRow) {
          this.rowNumber++;
          this.rowNodeCount = 0;
        }
        this.columnNumber = this.rowNodeCount;
      } else if (
        this.typeTwoNodes[i].ParentNodeId !== 1 &&
        this.typeTwoNodes[i].Title == 'Cause Node'
      ) {
        const x = this.originX - 5 * this.horizontalSpacing; // Fifth place from the left
        const y = this.originY + this.rowNumber * this.verticalSpacing;
        this.typeTwoNodes[i].x = x;
        this.typeTwoNodes[i].y = y;
        this.arrangedNodes.push(this.typeTwoNodes[i]);
        this.rowNodeCount++;

        this.rowNumber++;
        this.rowNodeCount = 0;

        this.columnNumber = this.rowNodeCount;
      }
    }
  }

  private placeTypeThreeNodes() {
    this.rowNumber = 0;
    for (let i = 0; i < this.typeThreeNodes.length; i++) {
      if (
        this.typeThreeNodes[i].ParentNodeId == 1 &&
        this.typeThreeNodes[i].Title == 'Consequences Node'
      ) {
        const x = this.originX + 5 * this.horizontalSpacing; // Fifth place from the left
        const y = this.originY + this.rowNumber * this.verticalSpacing;
        this.typeThreeNodes[i].x = x;
        this.typeThreeNodes[i].y = y;
        this.arrangedNodes.push(this.typeThreeNodes[i]);
        this.rowNumber++;
      } else if (this.typeThreeNodes[i].Title == 'Control Node') {
        const x =
          this.originX + (this.columnNumber + 1) * this.horizontalSpacing;
        const y = this.originY + this.rowNumber * this.verticalSpacing;
        this.typeThreeNodes[i].x = x;
        this.typeThreeNodes[i].y = y;
        this.arrangedNodes.push(this.typeThreeNodes[i]);
        this.rowNodeCount++;
        if (this.rowNodeCount === this.maxNodesPerRow) {
          this.rowNumber++;
          this.rowNodeCount = 0;
        }
        this.columnNumber = this.rowNodeCount;
      } else if (
        this.typeThreeNodes[i].ParentNodeId !== 1 &&
        this.typeThreeNodes[i].Title == 'Consequences Node'
      ) {
        const x = this.originX + 5 * this.horizontalSpacing; // Fifth place from the left
        const y = this.originY + this.rowNumber * this.verticalSpacing;
        this.typeThreeNodes[i].x = x;
        this.typeThreeNodes[i].y = y;
        this.arrangedNodes.push(this.typeThreeNodes[i]);
        this.rowNodeCount++;

        this.rowNumber++;
        this.rowNodeCount = 0;

        this.columnNumber = this.rowNodeCount;
      }
    }
  }

  private placeCentralizedNode() {
    // Arrange type 1 (risk) node
    const typeTwoRows = Math.ceil(
      this.typeTwoNodes.length / this.maxNodesPerRow
    );
    const typeThreeRows = Math.ceil(
      this.typeThreeNodes.length / this.maxNodesPerRow
    );

    this.maxTypeTwoTypeThreeRows = Math.max(typeTwoRows, typeThreeRows);

    if (typeTwoRows === typeThreeRows) {
      const riskNodeX = this.originX;
      const riskNodeY =
        this.originY +
        (this.maxTypeTwoTypeThreeRows - 2) * this.verticalSpacing +
        this.verticalSpacing / 2; // Adjust the Y-coordinate to place it in the center of the last two rows
      this.centralizedNode.x = riskNodeX;
      this.centralizedNode.y = riskNodeY;
      this.arrangedNodes.push(this.centralizedNode);
    } else {
      const riskNodeX = this.originX;
      const riskNodeY = this.originY + this.verticalSpacing / 2; // Adjust the Y-coordinate to place it in the center of the last two rows
      this.centralizedNode.x = riskNodeX;
      this.centralizedNode.y = riskNodeY;
      this.arrangedNodes.push(this.centralizedNode);
    }
  }

  private placeTypeFourNodes() {
    this.typeFourNodes.forEach((node, index) => {
      const rowNumber = Math.floor(
        this.typeFourIndex / this.maxNodesPerRowFour
      ); // Calculate the row number

      const columnNumber = this.typeFourIndex % this.maxNodesPerRowFour; // Calculate the column number

      const x =
        this.centralizedNode.x - (columnNumber - 5) * this.horizontalSpacing; // Adjusting the starting point for type 4 nodes
      const y =
        this.centralizedNode.y +
        rowNumber * this.verticalSpacingFour +
        (this.maxTypeTwoTypeThreeRows + 4) * this.verticalSpacingFour;
      node.x = x;
      node.y = y;
      this.arrangedNodes.push(node);
      this.typeFourIndex++;
    });
  }

  public getArrangedNodes(): data[] {
    this.placeTypeTwoNodes();
    this.placeTypeThreeNodes();
    this.placeCentralizedNode();
    this.placeTypeFourNodes();
    return this.arrangedNodes;
  }
}
