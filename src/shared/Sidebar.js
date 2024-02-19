import { useState } from 'react';
import style from './sidebar.css'

export function Sidebar({onUpdate, onReset, onStart, onAbort, onSelect, simulationStarted}) {
    const [isCollapse, setIsCollapse] = useState(false);

    const componentStyles = {
        backgroundColor: "#212529",
        height: "100vh"
    };

    const activateSimulationState = () => {
        onStart();
    }

    const deactivateSimulationState = () => {
        onAbort();
    }

    return (
        <div style={componentStyles}> 
            <div className="d-flex">
                <button onClick={() => setIsCollapse(!isCollapse)} className="mt-2 btn btn-link text-white w-100">
                    <i className="bi bi-arrow-left-right fs-5"></i>
                </button>
            </div>

            {!isCollapse &&
                <div id="sidebar-collapse" className="p-3 text-white">
                <div className="d-flex flex-column">
                    <span className="fs-4 text-lg-nowrap">Tangram solver</span>
                    <hr />
                    <span className="fs-5">Tangram</span>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto gap-3">
                        <li onClick={onSelect} className="nav-item">
                            <button type="button" className="btn btn-info w-100 d-flex justify-content-around p-2">
                            <i className="bi bi-grid-3x2"></i>
                                Settings
                            </button>
                        </li>
                    </ul>
                    <hr />
                    <span className="fs-5">Pieces</span>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto gap-3">
                        <li className="nav-item">
                            <button onClick={onUpdate} className="btn btn-primary w-100 d-flex justify-content-around p-2">
                                <i className="bi bi-plus-slash-minus"></i>
                                Update
                            </button>
                        </li>
                        <li onClick={onReset} className="nav-item">
                            <button type="button" className="btn btn-warning w-100 d-flex justify-content-around p-2">
                                <i className="bi bi-x-octagon"></i>
                                Reset
                            </button>
                        </li>
                    </ul>
                    <hr />
                    <span className="fs-5">Simulation</span>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto gap-3">
                        {!simulationStarted &&
                        <li onClick={activateSimulationState}>
                            <button type="button" className="btn btn-success w-100 d-flex justify-content-around p-2 text-nowrap">
                                <i className="bi bi-play"></i>
                                Solve Tangram
                            </button>
                        </li>
                        }
                        {simulationStarted &&
                            <li onClick={deactivateSimulationState}>
                            <button type="button" className="btn btn-danger w-100 d-flex justify-content-around p-2 text-nowrap">
                                <i className="bi bi-stop"></i>
                                Abort simulation
                            </button>
                        </li>
                        }
                    </ul>
                    <hr />
                </div>
            </div>
            }
        </div>
    );
}