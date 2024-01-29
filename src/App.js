import { useState } from 'react';
import { Sidebar } from './shared/Sidebar';
import { Tangram } from './tangram/Tangram';
import { Modal } from './shared/Modal/Modal';
import { PieceList } from './piece/PieceList/PieceList';

export default function MyApp() {
  const [updateActive, setUpdateActive] = useState(false);

  const componentStyles = {
    // color: 'red',
    // fontSize: '16px',
    // other styles...
  };

  const handleUpdate = () => {
    console.log("handleUpdate");
    setUpdateActive(true);
  }

  const closeUpdateModal = () => {
    setUpdateActive(false);
  }

  return (
    <div style={componentStyles}>
      <div className="w-100 main d-flex gap-0 m-0 p-0">
          <Tangram></Tangram>
          <Sidebar onUpdate={handleUpdate}></Sidebar>
      </div>
      {updateActive &&
        <Modal active={updateActive} onOk={closeUpdateModal} onClose={closeUpdateModal}>
          {/* <p>PIECES LIST CONTENT</p> */}
          <PieceList></PieceList>
        </Modal>
      }
    </div>
  );
}