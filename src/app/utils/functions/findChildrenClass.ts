import { DataConnection } from 'src/app/models/dataConnection.model';

export function findChildNodes(data: DataConnection[], node: DataConnection) {
  const childNodes = [];

  function findChildren(node: DataConnection) {
    for (const connection of data) {
      if (connection.FromShapeId === node.ToShapeId) {
        childNodes.push(connection.ToShapeId);
        findChildren(connection);
      }
    }
  }

  findChildren(node);
  return childNodes;
}

// public findChildrens() {
//   var data = [
//     { Id: 0, FromShapeId: 1, ToShapeId: 2, Text: null },
//     { Id: 1, FromShapeId: 2, ToShapeId: 3, Text: null },
//     { Id: 2, FromShapeId: 3, ToShapeId: 4, Text: null },
//     { Id: 3, FromShapeId: 4, ToShapeId: 5, Text: null },
//     { Id: 4, FromShapeId: 1, ToShapeId: 6, Text: null },
//     { Id: 5, FromShapeId: 6, ToShapeId: 7, Text: null },
//     { Id: 6, FromShapeId: 7, ToShapeId: 8, Text: null },
//     { Id: 7, FromShapeId: 8, ToShapeId: 9, Text: null },
//     { Id: 8, FromShapeId: 1, ToShapeId: 10, Text: null },
//     { Id: 9, FromShapeId: 10, ToShapeId: 11, Text: null },

//     { Id: 10, FromShapeId: 1, ToShapeId: 12, Text: null },
//     { Id: 11, FromShapeId: 12, ToShapeId: 13, Text: null },
//     { Id: 12, FromShapeId: 13, ToShapeId: 14, Text: null },
//     { Id: 13, FromShapeId: 14, ToShapeId: 15, Text: null },
//     { Id: 14, FromShapeId: 1, ToShapeId: 16, Text: null },
//     { Id: 15, FromShapeId: 16, ToShapeId: 17, Text: null },
//     { Id: 16, FromShapeId: 17, ToShapeId: 18, Text: null },
//     { Id: 17, FromShapeId: 18, ToShapeId: 19, Text: null },
//     { Id: 18, FromShapeId: 1, ToShapeId: 20, Text: null },
//     { Id: 19, FromShapeId: 20, ToShapeId: 21, Text: null },

//     { Id: 30, FromShapeId: 1, ToShapeId: 31, Text: null },
//     { Id: 20, FromShapeId: 1, ToShapeId: 22, Text: null },
//     { Id: 21, FromShapeId: 1, ToShapeId: 23, Text: null },
//     { Id: 22, FromShapeId: 1, ToShapeId: 24, Text: null },
//     { Id: 23, FromShapeId: 1, ToShapeId: 25, Text: null },
//     { Id: 24, FromShapeId: 1, ToShapeId: 26, Text: null },
//     { Id: 25, FromShapeId: 1, ToShapeId: 27, Text: null },
//     { Id: 26, FromShapeId: 1, ToShapeId: 28, Text: null },
//     { Id: 27, FromShapeId: 1, ToShapeId: 29, Text: null },
//     { Id: 28, FromShapeId: 1, ToShapeId: 30, Text: null },
//     { Id: 29, FromShapeId: 1, ToShapeId: 31, Text: null },
//   ];
//   function findChildNodes(node: DataConnection) {
//     const childNodes = [];

//     function findChildren(node: DataConnection) {
//       for (const connection of data) {
//         if (connection.FromShapeId === node.ToShapeId) {
//           childNodes.push(connection.ToShapeId);
//           findChildren(connection);
//         }
//       }
//     }

//     findChildren(node);
//     return childNodes;
//   }

//   // Example usage:
//   const givenNode = { Id: 1, FromShapeId: 2, ToShapeId: 27, Text: null };
//   const childNodes = findChildNodes(givenNode);
// }
