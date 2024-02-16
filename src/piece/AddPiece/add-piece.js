import { useEffect, useState } from "react";
import style from "./add-piece.css";

export function AddPiece({}) {
  const [label, setLabel] = useState("");

  const handleInputChange = (event) => {
    // setLabel(event.target.value);
  }

  return (
    <>
      <div className="card piece-card bg-light">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <p>New piece</p>
          </div>
        </div>
        <div className="h-100 mt-3">
          <div className="d-flex gap-2">
            <label htmlFor="title">Title</label>
            <input className="fs-5 me-3 w-100 border-1 text-align-center overflow-x-auto" type="text"/>
          </div>
          <div className="h-100 d-flex align-items-center justify-content-center">
            <p>Coming soon...</p>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end m-0 gap-1 p-2">
        </div>
      </div>
    </>
  );
}