import { Piece } from '../Piece/Piece.js';
import { PieceService } from '../services/piece-service.js';


export function PieceList() {  
  let pieceService = new PieceService();

  const pieceComponents = pieceService.pieceList.map((piece, index) => {
    return <Piece key={index} grid={piece.data} title={piece.label}></Piece>
  });

  return (
    <div className="d-flex gap-3 py-4 overflow-x-auto justify-content-start pieces">
      {pieceComponents}
    </div>
  );
}