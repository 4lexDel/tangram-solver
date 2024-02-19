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

  getCropAreas(patternToCrop) {
    // Pattern definition
    // 0 : available
    // other : block or none
    patternToCrop = this.cloneNDArray(patternToCrop);

    let cropAreas = [];

    let id = 100; // Use to separate area

    while (true) {
      let result = this.countBlocksInNextAreaAvailable(patternToCrop, id);

      if (!result) break;

      let {
        count,
        pattern
      } = result;

      let newCropArea = this.cropMatrixByValue(pattern, id);

      cropAreas.push({area: newCropArea, count: count});

      id += 100;
    }

    return cropAreas;
  }

  countBlocksInNextAreaAvailable(pattern, id) {
    let originCoord = this.getFirstBlockCoordAvailable(pattern);
    if (!originCoord) return null; // No blocks available

    let counter = {
      val: 1,
      currentId: id
    }; // Use an object for ref parameters exchange

    pattern[originCoord.x][originCoord.y] = id;
    this.countAreaBlocks(pattern, originCoord, counter);

    return {
      count: counter.val,
      pattern: pattern
    };
  }

  getFirstBlockCoordAvailable(pattern) {
    for (let x = 0; x < pattern.length; x++) {
      for (let y = 0; y < pattern[0].length; y++) {
        if (pattern[x][y] == 0) return {
          x: x,
          y: y
        };
      }
    }

    return null;
  }

  countAreaBlocks(pattern, coord, counter) {
    // recursive function that count all the blocks in an area
    let blockCoordsAvailable = this.getNeighboorsAvailable(pattern, coord);

    blockCoordsAvailable.forEach(blocCoord => {
      counter.val++;
      pattern[blocCoord.x][blocCoord.y] = counter.currentId; // To avoid duplicate count
    });

    blockCoordsAvailable.forEach(blocCoord => {
      this.countAreaBlocks(pattern, blocCoord, counter);
    });
  }

  getNeighboorsAvailable(pattern, coord) {
    let directions = [
      [0, -1],
      [-1, 0],
      [1, 0],
      [0, 1],
    ]

    let coordsAvailable = [];

    directions.forEach(d => {
      d[0] += coord.x;
      d[1] += coord.y;

      if (d[0] >= 0 && d[0] < pattern.length && d[1] >= 0 && d[1] < pattern[0].length) {
        if (pattern[d[0]][d[1]] == 0) coordsAvailable.push({
          x: d[0],
          y: d[1]
        })
      }
    });

    return coordsAvailable;
  }

  cropMatrixByValue(matrix, valueToKeep) {
    let minX = matrix[0].length;
    let maxX = 0;
    let minY = matrix.length;
    let maxY = 0;

    // Find the bounds of the non-zero values
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == valueToKeep) {
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

  replaceValueIn2Darray(matrix, oldValue, newValue) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == oldValue) matrix[i][j] = newValue;
      }
    }
  }
}