import { SharedService } from "../../shared/services/shared-service";

export class Solver {
    constructor(pattern, gameRef=null) {
        this.sharedService = new SharedService();

        this.initialPattern = pattern;

        this.gameRef = gameRef;
    }

    getAllPiecesCombinations(pieceObjList) {       
        let pieceList = pieceObjList.map((piece) => this.sharedService.cropMatrix(piece["data"]));

        console.log(pieceList);

        let finalPieceList = [];

        pieceList.forEach(piece => {
            let pieceCombinations = [];

            pieceCombinations.push(piece);
            pieceCombinations.push(this.sharedService.reverse2DArray(piece));


            let rotatedPiece = this.sharedService.cloneNDArray(piece);

            for (let i = 0; i < 3; i++) {
                rotatedPiece = this.sharedService.rotate2DArray(rotatedPiece);
                pieceCombinations.push(rotatedPiece);
                pieceCombinations.push(this.sharedService.reverse2DArray(rotatedPiece));
            }

            finalPieceList.push(this.removeDuplicateArrays(pieceCombinations));
        });

        return finalPieceList;
    }

    removeDuplicateArrays(arrays) {
        const uniqueArrays = [];

        for (const array of arrays) {
            let isDuplicate = false;
            for (const uniqueArray of uniqueArrays) {
                if (this.sharedService.areArraysEqual(array, uniqueArray)) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                uniqueArrays.push(array);
            }
        }

        return uniqueArrays;
    }

    parsePattern(pattern){
        // Piece to available

        for (let x = 0; x < pattern.length; x++) {
            for (let y = 0; y < pattern[0].length; y++) {
                if(pattern[x][y] != -1) pattern[x][y] = 0;
            }
        }
    }

    solve(pieceList, pattern=null) {
        // console.log(pattern);
        let allPieces = this.getAllPiecesCombinations(pieceList);
        allPieces = allPieces.sort(() => (Math.random() > .5) ? 1 : -1);

        // console.log(allPieces);

        if(!pattern) pattern = this.sharedService.cloneNDArray(this.initialPattern);
        else this.parsePattern(pattern);

        pattern = this.process(pattern, allPieces, 1);

        return pattern;
    }

    process(pattern, pieceList, level) {
        // if(this.gameRef){
        //    this.gameRef.grid = pattern;
        //     setTimeout(() => {
        //         this.gameRef.drawProcess();
        //     }, 5); 
        // }
        if (pieceList.length == 12-12) return pattern; // No pieces to place = win !

        const pieceTransformations = pieceList[0];

        for (let j = 0; j < pieceTransformations.length; j++) {
            const piece = pieceTransformations[j];

            for (let x = 0; x < pattern.length; x++) {
                for (let y = 0; y < pattern[0].length; y++) {

                    if (this.isPiecePlacable(piece, x, y, pattern)) {
                        let newPattern = this.sharedService.cloneNDArray(pattern);
                        
                        this.placePiece(piece, x, y, newPattern, level);  // Place pieces
                        // console.log(newPattern);
                        if (!this.isWrongAreaExist(newPattern)) {    // Prunning !
                            let newPieceList = this.sharedService.cloneNDArray(pieceList);
                            newPieceList.shift();
                            // console.log("newPieceList");
                            let result = this.process(newPattern, newPieceList, level + 1);

                            if (result) return result;       // Return result = win !!
                            // Else nothing so piece will be moved
                        }
                    }
                }
            }
        }

        return null;    // Piece not working = set up impossible
    }

    placePiece(piece, x, y, pattern, id = 1) {
        for (let px = 0; px < piece.length; px++) {
            for (let py = 0; py < piece[0].length; py++) {
                if (piece[px][py] && pattern[x + px][y + py] == 0) {
                    pattern[x + px][y + py] = id;
                };
            }
        }
    }

    isPiecePlacable(piece, x, y, pattern) {
        if (x + piece.length >= pattern.length || y + piece[0].length >= pattern[0].length) return false;

        for (let px = 0; px < piece.length; px++) {
            for (let py = 0; py < piece[0].length; py++) {
                if (piece[px][py] && pattern[x + px][y + py] != 0) return false;
            }
        }

        return true;
    }

    isWrongAreaExist(pattern) {
        // Pattern definition
        // -1 : not available
        // 0 : available
        // other : block
        let patternToCount = this.sharedService.cloneNDArray(pattern);

        let value = 0;  // Nb of unit by area

        while (true) {
            value = this.countBlocksInNextAreaAvailable(patternToCount);

            if (value == -1) return false;
            else if (value % 5 != 0) return true;
        }

    }

    countBlocksInNextAreaAvailable(pattern) {
        let originCoord = this.getFirstBlockCoordAvailable(pattern);
        if (!originCoord) return -1; // No blocks available

        let counter = { val: 1 }; // Use an object for ref parameters exchange

        pattern[originCoord.x][originCoord.y] = -1;
        this.countAreaBlocks(pattern, originCoord, counter);

        return counter.val;
    }

    getFirstBlockCoordAvailable(pattern) {
        for (let x = 0; x < pattern.length; x++) {
            for (let y = 0; y < pattern[0].length; y++) {
                if (pattern[x][y] == 0) return { x: x, y: y };
            }
        }

        return null;
    }

    countAreaBlocks(pattern, coord, counter) {
        // recursive function that count all the blocks in an area
        let blockCoordsAvailable = this.getNeighboorsAvailable(pattern, coord);
        // console.log(blockCoordsAvailable);

        blockCoordsAvailable.forEach(blocCoord => {
            counter.val++;
            pattern[blocCoord.x][blocCoord.y] = -1; // To avoid duplicate count
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
                if (pattern[d[0]][d[1]] == 0) coordsAvailable.push({ x: d[0], y: d[1] })
            }
        });

        return coordsAvailable;
    }
}