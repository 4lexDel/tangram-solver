import { Solver } from "./Solver.js";
import { GameBase } from "./game-base.js";

export class Game extends GameBase { //A renommer ?
    constructor(canvas, grid) {
        super(canvas, grid);

        this.init(grid);
    }

    init(grid) {
        this.colorHexa = [
            "#931717", // dark red
            "#fd0d34", // red
            "#8a1793", // dark purple
            "#ec0dfd", // purple
            "#174993", // dark blue
            "#0d6efd", // blue
            "#176793", // neutral blue
            "#0de9fd", // cyan
            "#179374", // neutral green
            "#0dfd78", // light green
            "#938317", // golden
            "#ecfd0d", // yellow
            "#99abc2", // grey
        ]
        this.grid = grid;

        // /*----------------IMG-----------------*/
        // const urls = [];

        /*----------------Draw settings----------*/
        this.FPS = 20;
        this.prevTick = 0;

        /*----------------Solver-----------------*/
        this.solver = new Solver(grid, this);

        /**---------------START----------------- */
        this.isRenderNeed = true;
        this.draw();

        this.initEvent();
    }

    initEvent() {
        this.onMouseDown((e) => this.mouseAction(e));
    }

    mouseAction(e) {
        let x = parseInt((this.mouseX - this.mx) / this.d);
        let y = parseInt((this.mouseY - this.my) / this.d);

        if (x < 0 || x >= this.grid.length || y < 0 || y >= this.grid[0].length) {
            return;
        }

        this.updateCell(x, y, e.button);
    }

    updateCell(x, y, eventType=0) {
        // let min = 0;
        // let max = 13;

        if(eventType==0) this.grid[x][y] = 0;
        else this.grid[x][y] = -1;

        // if (this.grid[x][y] == max + 1) this.grid[x][y] = min + 1;

        this.isRenderNeed = true;
    }

    solve(pieceList){
        let result = this.solver.solve(pieceList, this.grid);

        result && (this.grid = result);

        this.isRenderNeed = true;
    }

    draw() {
        /*------------------------------FPS-----------------------------*/
        window.requestAnimationFrame(() => this.draw());

        let now = Math.round(this.FPS * Date.now() / 1000);
        if (now == this.prevTick) return;
        this.prevTick = now;
        /*--------------------------RENDER------------------------------*/
        if (!this.isRenderNeed) return; // Use to avoid to much rendering

        this.drawProcess();
    }

    drawProcess(){
        console.log("drawProcess");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.displayGrid();

        this.isRenderNeed = false;
    }

    displayGrid() {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[0].length; y++) {
                switch (this.grid[x][y]) {
                    case -1:
                        this.ctx.fillStyle = "transparent";
                        break;
                    case 0:
                        this.ctx.fillStyle = "beige";
                        this.ctx.fillRect(this.mx + x * this.d, this.my + y * this.d, this.d, this.d);

                        this.displayCellBorder(this.mx + x * this.d, this.my + y * this.d, this.d, this.d);
                        break;
                    default:
                        this.ctx.fillStyle = this.colorHexa[this.grid[x][y] - 1];
                        this.ctx.fillRect(this.mx + x * this.d, this.my + y * this.d, this.d, this.d);

                        this.displayCellBorder(this.mx + x * this.d, this.my + y * this.d, this.d, this.d);
                        break;
                }
            }
        }
    }

    displayCellBorder(x, y, d){
        this.ctx.strokeStyle = "rgb(80,80,80)";
        this.ctx.lineWidth = 0.2;
        this.ctx.strokeRect(x, y, d, d);
    }
}