import { SharedService } from "../../shared/services/shared-service";

export class Solver {
    constructor(pattern) {
        this.sharedService = new SharedService();

        this.initialPattern = pattern;

        this.nbIteration = 0;
    }

    getAllPiecesCombinations(pieceObjList) {       
        let pieceList = pieceObjList.map((piece) => this.sharedService.cropMatrix(piece["data"]));

        // console.log(pieceList);

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

    solve(pieceList, pattern=null, callback=null) {
        this.nbIteration = 0;

        // console.log(pattern);
        let allPieces = this.getAllPiecesCombinations(pieceList);
        allPieces = allPieces.sort(() => (Math.random() > .5) ? 1 : -1);

        if(!pattern) pattern = this.sharedService.cloneNDArray(this.initialPattern);
        else this.parsePattern(pattern);

        pattern = this.process(pattern, allPieces, 1, callback);

        return pattern;
    }

    process(pattern, pieceList, level, callback) {
        this.nbIteration++;

        if(callback){
            if(pieceList.length == 0){
                callback(pattern, true);
            }
            else if(this.nbIteration % 100 == 0) callback(pattern);
        }
        if (pieceList.length == 0) return pattern; // No pieces to place = win !

        const pieceTransformations = pieceList[0];

        for (let j = 0; j < pieceTransformations.length; j++) {
            const piece = pieceTransformations[j];

            for (let x = 0; x < pattern.length; x++) {
                for (let y = 0; y < pattern[0].length; y++) {

                    if (this.isPiecePlacable(piece, x, y, pattern)) {
                        let newPattern = this.sharedService.cloneNDArray(pattern);
                        
                        this.placePiece(piece, x, y, newPattern, level);  // Place pieces
                        // console.log(newPattern);
                        let newPieceList = this.sharedService.cloneNDArray(pieceList);
                        newPieceList.shift();

                        if (!this.isWrongAreaExist(newPattern, newPieceList)) {    // Prunning !
                            // console.log("newPieceList");
                            let result = this.process(newPattern, newPieceList, level + 1, callback);

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

    isWrongAreaExist(pattern, pieceList) {
        // Pattern definition
        // -1 : not available
        // 0 : available
        // other : block

        let cropAreas = this.sharedService.getCropAreas(pattern);

        for (let i = 0; i < cropAreas.length; i++) {
            const cropArea = cropAreas[i];
            
            if(cropArea.count %5 != 0) return true; 
            else if(cropArea.count == 5){
                // console.log("piece remaining");
                // console.log(pieceList);

                let patternWorks = false;
                for (let j = 0; j < pieceList.length; j++) {
                    const pieceTransformations = pieceList[j];
                    
                    for (let k = 0; k < pieceTransformations.length; k++) {
                        const piece = pieceTransformations[k];
                        
                        if(cropArea.area.length == piece.length && cropArea.area[0].length == piece[0].length) {
                            let pieceWorks = true;
                            for(let x = 0; x < piece.length; x++){
                                for(let y = 0; y < piece[0].length; y++){
                                    if(cropArea.area[x][y] >= 100 && !piece[x][y]){ // Block value must be greater or equal than 100
                                        pieceWorks = false;
                                    }
                                }
                            }
                            if(pieceWorks){
                                patternWorks = true;
                                break;
                            }
                        }
                    }
                    if(patternWorks) break;
                }
                if(!patternWorks) return true;
            }
        }
        // RETIRER LA PIECE QUAND UNE HYPOTHESE SE VERIFIE DANS LE CAS OU 2 AREAS SONT IDENTIQUES

        return false;
    }
}