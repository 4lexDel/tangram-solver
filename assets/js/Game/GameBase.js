export class GameBase {
    constructor(canvas, grid) {
        this.canvas = canvas;
        this.grid = grid;

        this.ctx = this.canvas.getContext("2d");

        // window.onresize = (e) => {
        //     this.canvas.resize();
        // };
    }

    resize(width, height) {
        // console.log(1);
        this.canvas.width = width;
        this.canvas.height = height;

        this.d = Math.min(this.canvas.width / (this.grid.length + 1), this.canvas.height / (this.grid[0].length + 1));

        // Use to center the screen
        this.mx = (this.canvas.width - (this.d * this.grid.length)) / 2;
        this.my = (this.canvas.height - (this.d * this.grid[0].length)) / 2;
    }

    preloadImages(urls) { //Load IMG by URL and return Image instance
        const promises = urls.map((url) => {
            return new Promise((resolve, reject) => {
                const image = new Image();

                image.src = url;

                image.onload = () => resolve(image);
                image.onerror = () => reject(`Image failed to load: ${url}`);
            });
        });

        return Promise.all(promises);
    }
}