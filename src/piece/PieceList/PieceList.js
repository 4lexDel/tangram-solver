import { useState } from 'react';
import { Piece } from '../Piece/Piece.js';
import { SharedService } from "../../shared/services/shared-service";
import { AddPiece } from '../AddPiece/add-piece.js';

export function PieceList({ onListUpdate, pieceList }) {  
  let sharedService = new SharedService();

  const [pieceListState, setPieceList] = useState(pieceList);

  const handleUpdateGrid = (index, grid) => {
    let clonePieceList = sharedService.cloneNDArray(pieceListState);

    // Update operation
    if(grid) clonePieceList[index] = grid;
    else {
      // Remove
      clonePieceList.splice(index, 1);
    }

    setPieceList(clonePieceList);

    onListUpdate(clonePieceList);
  }

  const pieceComponents = pieceListState.map((piece, index) => {
    return <Piece key={index} grid={piece.data} title={piece.label} onGridUpdate={(grid) => handleUpdateGrid(index, grid)}></Piece>
  });

  return (
    <div className="d-flex gap-3 py-4 overflow-x-auto justify-content-start pieces">
      {/* <AddPiece></AddPiece> */}
      {pieceComponents}
    </div>
  );
}