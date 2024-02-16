import React, { useRef, useState } from 'react';
import { Sidebar } from './shared/Sidebar';
import Tangram from './tangram/Tangram';
import { Modal } from './shared/Modal/Modal';
import { PieceList } from './piece/PieceList/PieceList';
import { PieceService } from './piece/services/piece-service.js';


export default function MyApp() {
  const tangramRef = useRef(null);

  const [updateActive, setUpdateActive] = useState(false);
  const [resetActive, setResetActive] = useState(false);
  const [startActive, setStartActive] = useState(false);

  let pieceService = new PieceService();
  let pieceList = pieceService.data;
  
  const [pieceListState, setPieceList] = useState(pieceList);
  const [finalPieceListState, setFinalPieceList] = useState(pieceList);

  const handleUpdate = () => {
    setUpdateActive(true);
  }

  const handleReset = () => {
    setResetActive(true);
  }

  const handleStart = () => {
    setStartActive(true);
  }

  const closeUpdateModal = () => {
    setUpdateActive(false);
  }

  const closeResetModal = () => {
    setResetActive(false);
  }

  const closeStartModal = () => {
    setStartActive(false);
  }

  const resetPieceList = () => {
    setFinalPieceList(pieceService.data);
    setPieceList(pieceService.data);
  }

  const handleOkModal = () => {
    setFinalPieceList(pieceListState);
  }

  const handleListUpdate = (list) => {
    setPieceList(list);
  }

  const startSimulation = () => {
    // console.log("START");
    // console.log(tangramRef);
    setTimeout(() => {
      tangramRef.current.solve(finalPieceListState);
    }, 5);
  }

  return (
    <div>
      <div className="w-100 main d-flex gap-0 m-0 p-0">
          <Tangram ref={tangramRef}></Tangram>
          <Sidebar onUpdate={handleUpdate} onReset={handleReset} onStart={handleStart}></Sidebar>
      </div>
      {updateActive &&
        <Modal active={updateActive} title={"Update piece list"} onOk={() => {handleOkModal(); closeUpdateModal();}} onClose={closeUpdateModal}>
          <PieceList onListUpdate={handleListUpdate}  pieceList={finalPieceListState}></PieceList>
        </Modal>
      }
      {resetActive &&
        <Modal active={resetActive} title={"Confirm"} onOk={() => {resetPieceList();closeResetModal();}} onClose={closeResetModal}>
          <p>Reset piece list?</p>
        </Modal>
      }
      {startActive &&
        <Modal active={startActive} title={"Confirm"} onOk={() => {closeStartModal();startSimulation();}} onClose={closeStartModal}>
          <p>Start simulation?</p>
        </Modal>
      }
    </div>
  );
}