let canvasDiv = document.getElementById('tangram');

canvasDiv.onresize = (e) => {
    console.log("OK");
};

function setup() {
    let widthCanvas = canvasDiv.offsetWidth;
    // let heightCanvas = canvasDiv.offsetHeight;

    let canvas = createCanvas(widthCanvas, windowHeight);
    canvas.parent("tangram");

    background(200);
}

function resize() {
    let widthCanvas = canvasDiv.offsetWidth;
    resizeCanvas(widthCanvas, windowHeight);
}

function draw() {
    background(200);
}

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        // entry.target est l'élément observé (dans ce cas, la div redimensionnable)
        // entry.contentRect contient les informations sur la nouvelle taille
        console.log('Div redimensionnée :', entry.contentRect.width, entry.contentRect.height);
        resize();
    }
});

resizeObserver.observe(canvasDiv);