import { GameBase } from "./GameBase.js";

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

        /*---------Draw settings----------*/
        this.FPS = 60;
        this.prevTick = 0;

        /*----------------Mouse----------------*/

        this.mousePressed = false;

        this.mouseX = 0;
        this.mouseY = 0;


        this.initEvent();

        /**---------------START----------------- */
        this.draw();
    }

    initEvent() {
        this.canvas.onmousedown = (e) => {
            this.mouseAction(e);
        };
        // this.canvas.onmouseup = (e) => {
        //     this.mousePressed = false;
        // };
        // this.canvas.onmousemove = (e) => { this.refreshMouseCoord(e); };

        // this.canvas.addEventListener('touchstart', (e) => {
        //     this.refreshTouchCoord(e);
        //     this.mousePressed = true;
        // }, false);

        // this.canvas.addEventListener('touchmove', (e) => {
        //     this.refreshTouchCoord(e);
        // }, false);

        // this.canvas.addEventListener('touchend', (e) => {
        //     this.refreshTouchCoord(e);
        //     this.mousePressed = false;
        // }, false);

        // window.onresize = (e) => {
        //     this.resize();
        // };
    }

    mouseAction(e) {
        // console.log(e.button);
        let coord = this.getMousePos(this.canvas, e);

        this.mouseX = parseInt((coord.x - this.mx) / this.d);
        this.mouseY = parseInt((coord.y - this.my) / this.d);

        // console.log(`${this.mouseX} ${this.mouseY}`);
        console.log(this.grid);

        if (e.button == 0) this.grid[this.mouseX][this.mouseY] += 1;
        if (e.button == 2) this.grid[this.mouseX][this.mouseY] -= 1;

        let min = 0;
        let max = 13;

        if (this.grid[this.mouseX][this.mouseY] == min - 1) this.grid[this.mouseX][this.mouseY] = max;
        if (this.grid[this.mouseX][this.mouseY] == max + 1) this.grid[this.mouseX][this.mouseY] = min;
    }

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    refreshTouchCoord(e) {
        let coord = TouchControl.getTouchPos(this.canvas, e);

        this.mouseX = coord.x;
        this.mouseY = coord.y;
    }

    refreshMouseCoord(e) {
        let coord = MouseControl.getMousePos(this.canvas, e);

        this.mouseX = coord.x;
        this.mouseY = coord.y;
    }

    draw() {
        // console.log("draw");
        /*------------------------------FPS-----------------------------*/
        window.requestAnimationFrame(() => this.draw());

        let now = Math.round(this.FPS * Date.now() / 1000);
        if (now == this.prevTick) return;
        this.prevTick = now;
        /*--------------------------------------------------------------*/

        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
        // this.ctx.fillStyle = "rgb(210,210,210)";
        // this.ctx.fillStyle = "#F4D527";
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        /*------------------------------GRID-----------------------------*/
        this.displayGrid();
    }

    displayGrid() {
        this.ctx.strokeStyle = "rgb(80,80,80)";
        this.ctx.lineWidth = 0.5;

        for (var x = 0; x < this.grid.length; x++) {
            for (var y = 0; y < this.grid[0].length; y++) {
                switch (this.grid[x][y]) {
                    case -1:
                        this.ctx.fillStyle = "transparent   ";
                        break;
                    case 0:
                        this.ctx.fillStyle = "beige";
                        break;
                    default:
                        this.ctx.fillStyle = this.colorHexa[this.grid[x][y] - 1];

                        this.ctx.fillRect(this.mx + x * this.d, this.my + y * this.d, this.d, this.d);
                        break;
                }

                // this.ctx.strokeRect(this.mx + x * this.d, this.my + y * this.d, this.d, this.d);
            }
        }
    }
}