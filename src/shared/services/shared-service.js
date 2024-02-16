export class SharedService {
  cloneNDArray(originalArray) {
    function cloneArray(array) {
      return Array.isArray(array) ? array.map(cloneArray) : array;
    }

    return cloneArray(originalArray);
  }

  areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].length !== arr2[i].length) {
        return false;
      }

      for (let j = 0; j < arr1[i].length; j++) {
        if (arr1[i][j] !== arr2[i][j]) {
          return false;
        }
      }
    }

    return true;
  }

  rotate2DArray(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Transpose the matrix
    const transposedMatrix = [];
    for (let j = 0; j < cols; j++) {
      const newRow = [];
      for (let i = 0; i < rows; i++) {
        newRow.push(matrix[i][j]);
      }
      transposedMatrix.push(newRow);
    }

    // Reverse the rows to get the final rotated matrix
    const rotatedMatrix = [];
    for (let i = 0; i < cols; i++) {
      const reversedRow = transposedMatrix[i].reverse();
      rotatedMatrix.push(reversedRow);
    }

    return rotatedMatrix;
  }

  reverse2DArray(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const reversedMatrix = [];

    for (let i = 0; i < numRows; i++) {
      const reversedRow = [];
      for (let j = numCols - 1; j >= 0; j--) {
        reversedRow.push(matrix[i][j]);
      }
      reversedMatrix.push(reversedRow);
    }

    return reversedMatrix;
  }

  cropMatrix(matrix) {
    let minX = matrix[0].length;
    let maxX = 0;
    let minY = matrix.length;
    let maxY = 0;

    // Find the bounds of the non-zero values
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] !== false) {
          minX = Math.min(minX, j);
          maxX = Math.max(maxX, j);
          minY = Math.min(minY, i);
          maxY = Math.max(maxY, i);
        }
      }
    }

    // Create the cropped matrix
    let croppedMatrix = [];
    for (let i = minY; i <= maxY; i++) {
      let row = [];
      for (let j = minX; j <= maxX; j++) {
        row.push(matrix[i][j]);
      }
      croppedMatrix.push(row);
    }
    return croppedMatrix;
  }
}