import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Game } from "./solver/game.js";
import { TangramService } from './services/tangram-service.js';

const createWorker = () => new Worker(
    new URL('./solver/solver.worker.js', import.meta.url),
    { type: 'module' }
);

const Tangram = forwardRef(({ onSimulationOver }, ref) => {
    const containerRef = useRef(null);
    const canvaRef = useRef(null);

    let tangramService = new TangramService();

    let game = null;
    let newWorker = null;

    let currentPattern = tangramService.defaultTangramModel;

    let grid = tangramService.tangramList[currentPattern];

    const componentStyles = {
        main: {
            width: '100%',
            height: '100wh',
            backgroundImage: 'linear-gradient(#404040, black)',
            padding: 0,
        },
        canvas: {
            position: 'fixed',
            overflowX: 'hidden'
        }
    };

    useEffect(() => {
        let timeoutId;

        game = new Game(canvaRef.current, grid);

        const observerCallback = (entries) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                window.requestAnimationFrame(() => {
                    // console.log("RESIZE");
                    game.resize(containerRef.current.clientWidth, containerRef.current.clientHeight);
                });
            }, 100); // Debounce time
        };

        const resizeObserver = new ResizeObserver(observerCallback);

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
            clearTimeout(timeoutId);
        };
    }, [containerRef]);

    const resetWorker = () => {
        if(newWorker) newWorker.terminate();
        newWorker = createWorker();

        refreshPattern();
    }

    const solve = async (pieceList) => {
        if (game) {
            // console.log(game.grid);
            resetWorker();

            // game.solve(pieceList);
            let startTimer = null;

            // Set up event listener to receive messages from the worker
            newWorker.onmessage = (event) => {
                const data = event.data;

                if(onSimulationOver && !data["result"] && data["status"]) onSimulationOver();

                if(data["result"]){
                    if(data["status"]){
                        console.log(`================= Execution time =================`);
                        console.log(`${Date.now() - startTimer} ms`);
                        console.log(`==================================================`);
                        startTimer = null;
    
                        setTimeout(() => {
                            game.grid = data["result"];
                            game.isRenderNeed = true;
                        }, 100);

                        onSimulationOver();
                    }
                    else{
                        game.grid = data["result"];
                        game.isRenderNeed = true;
                    }
                }
            };

            startTimer = Date.now();            // Start timer
            newWorker.postMessage({ pattern: game.grid, pieceList: pieceList });
        }

        // TODO KILL WORKERS
    }

    const refreshPattern = () => {
        grid = tangramService.tangramList[currentPattern];

        game.grid = grid;
        game.isRenderNeed = true;
    }

    const changePattern = (pattern) => {
        currentPattern = pattern;

        refreshPattern();
    }

    useImperativeHandle(ref, () => ({
        changePattern, solve, resetWorker
    }), [game]);

    return (
        <div ref={containerRef} style={componentStyles.main}>
            <canvas ref={canvaRef} style={componentStyles.canvas}></canvas>
        </div>
    );
});

export default Tangram;

