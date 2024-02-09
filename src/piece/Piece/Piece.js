import { useEffect, useState } from "react";
import style from "./piece.css";
import { SharedService } from "../../shared/services/shared-service";
import { Modal } from "../../shared/Modal/Modal";

export function Piece({ grid, title, onGridUpdate }) {
  let sharedService = new SharedService();

  const [deleteActive, setDeleteActive] = useState(false);
  const [isEditionActive, setIsEditionActive] = useState(false);
  const [isLockActive, setIsLockActive] = useState(false);

  const [label, setLabel] = useState(title);
  const [gridState, setGridState] = useState(grid);

  // const nbBlockRequired = grid[0].length;
  const [nbBlockAvailable, setNbBlockAvailable] = useState(0);

  const [updated, setUpdated] = useState(false);
  
  const handleDeleteButton = () => {
    setDeleteActive(true);
  }

  const handleLockButton = () => {
    !isEditionActive && setIsLockActive(!isLockActive);
  }

  const handleEditButton = () => {
    // Validation
    if(isEditionActive){
      if(nbBlockAvailable != 0) return;
      setUpdated(true);
      onGridUpdate({data: gridState, label: label});
    }

    // Toggle state
    (!isLockActive || isEditionActive) && setIsEditionActive(!isEditionActive);
  }

  let gridComponents = [];

  const handleCellClick = (x, y) => {
    // console.log(`x=${x} y=${y}`);
    if(isEditionActive){
      let cloneGrid = sharedService.cloneNDArray(gridState);

      let changeVal = cloneGrid[x][y] ? 1 : -1;
      setNbBlockAvailable(nbBlockAvailable+changeVal);

      cloneGrid[x][y] = !cloneGrid[x][y];
      
      setGridState(cloneGrid);
    }
  }

  const handleInputChange = (event) => {
    setLabel(event.target.value);

    let cloneGrid = sharedService.cloneNDArray(gridState);

    setGridState(cloneGrid);

    onGridUpdate({data: cloneGrid, label: event.target.value});
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

  const deletePiece = () => {
    // Delete piece
    onGridUpdate(null);
  }

  const closeDeleteModal = () => {
    setDeleteActive(false);
  }

  // Handle title prop change
  useEffect(() => {
    if (title !== label) {
      setLabel(title);
    }
  }, [title]);

  // Handle grid prop change
  useEffect(() => {
    if (grid !== gridState) {
      setGridState(grid);
    }
  }, [grid]);

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
        {isEditionActive &&
          <div>
            {nbBlockAvailable < -1 && <p className="text-danger">{-nbBlockAvailable} extra blocks</p>}
            {nbBlockAvailable == -1 && <p className="text-danger">{-nbBlockAvailable} extra block</p>}
            {nbBlockAvailable == 0 && <p className="text-success">OK</p>}
            {nbBlockAvailable == 1 && <p className="text-warning">1 block remaining</p>}
            {nbBlockAvailable > 1 && <p className="text-warning">{nbBlockAvailable} blocks remaining</p>}
          </div>
        }
        {!isEditionActive && updated &&
          <p className="text-primary">Updated</p>
        }
        {!isEditionActive && !updated &&
          <p className="text-secondary">Current</p>
        }
        <div className="card-footer d-flex justify-content-end m-0 gap-1 p-2">
          <button onClick={handleDeleteButton} className="btn btn-danger w-100 d-flex justify-content-around py-0 px-1"><i className="bi bi-trash"></i></button>
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
      <Modal active={deleteActive} title={"Confirm"} onOk={() => {deletePiece();closeDeleteModal()}} onClose={closeDeleteModal}>
          <p>Delete this piece?</p>
      </Modal>
    </>
  );
}