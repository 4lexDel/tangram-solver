import { useState } from "react";
import style from "./piece.css";
import { SharedService } from "../../shared/services/shared-service";

export function Piece({ grid, title }) {
  let sharedService = new SharedService();

  const [isEditionActive, setIsEditionActive] = useState(false);
  const [isLockActive, setIsLockActive] = useState(false);

  const [label, setLabel] = useState(title);
  const [gridState, setGridState] = useState(
    grid
  );

  const handleLockButton = () => {
    setIsLockActive(!isLockActive);
    setIsEditionActive(false);  // A débattre
  }

  const handleEditButton = () => {
    (!isLockActive || isEditionActive) && setIsEditionActive(!isEditionActive);
  }

  // let gridState = grid;

  let gridComponents = [];

  const handleCellClick = (x, y) => {
    console.log(`x=${x} y=${y}`);
    if(isEditionActive){
      let cloneGrid = sharedService.cloneNDArray(gridState);
      cloneGrid[x][y] = cloneGrid[x][y] ? 0 : 1;
      setGridState(cloneGrid);
    }
  }

  for (let x = 0; x < gridState.length; x++) {
    for (let y = 0; y < gridState[0].length; y++) {
      gridComponents.push(<div key={(x * gridState.length) + y} 
                                className={`cell ${gridState[x][y] ? 'fill' : ''} ${isEditionActive ? 'edit' : ''} ${isLockActive ? 'diseable' : ''}`} 
                                onClick={() => handleCellClick(x, y)} 
                                x={`${x}`} y={`${y}`}>
                          </div>);
    }
  }

  const handleInputChange = (event) => {
    setLabel(event.target.value);
  }

  return (
    <>
      <div className="card piece-card">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <input onChange={handleInputChange} disabled={!isEditionActive} value={label} className="fs-5 me-3 w-100 border-0 text-align-center overflow-x-auto" placeholder="Enter your piece title" />
            {isEditionActive && <i className="bi bi-pencil"></i>}
          </div>
        </div>
        <div className="grid">
          {gridComponents}
        </div>
        <div className="card-footer d-flex justify-content-end m-0 gap-1 p-2 mt-3">
          <button className="btn btn-danger w-100 d-flex justify-content-around py-0 px-1"><i className="bi bi-trash"></i></button>
            {!isLockActive && 
            <button onClick={handleLockButton} className="btn btn-secondary w-100 d-flex justify-content-around py-0 px-1">
              <i className="bi bi-lock"></i>
            </button>}
            {isLockActive && 
            <button onClick={handleLockButton} className="btn btn-warning w-100 d-flex justify-content-around py-0 px-1">
              <i className="bi bi-unlock"></i>
            </button>}

            {!isEditionActive && 
            <button onClick={handleEditButton} className="btn btn-primary w-100 d-flex justify-content-around py-0 px-1">
              <i className="bi bi-pencil"></i>
            </button>}
            {isEditionActive && 
            <button onClick={handleEditButton} className="btn btn-success w-100 d-flex justify-content-around py-0 px-1">
              <i className="bi bi-check2"></i>
            </button>}          
        </div>
      </div>
    </>
  );
}