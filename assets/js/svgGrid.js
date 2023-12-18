let pieceNumber = 0;

function createSVGGrid(binaryArray) {
    const cellSize = 20; // Taille de la cellule en pixels
    const svgNS = "http://www.w3.org/2000/svg";

    const svg = document.createElementNS(svgNS, "svg");
    const numRows = binaryArray.length;
    const numCols = binaryArray[0].length;

    svg.setAttribute("width", numCols * cellSize);
    svg.setAttribute("height", numRows * cellSize);

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const rect = document.createElementNS(svgNS, "rect");
            rect.setAttribute("x", j * cellSize);
            rect.setAttribute("y", i * cellSize);
            rect.setAttribute("width", cellSize);
            rect.setAttribute("height", cellSize);

            // Ajout d'une classe pour différencier les rectangles
            rect.classList.add("grid-cell");

            // Donner une couleur de remplissage en fonction de la valeur binaire
            rect.setAttribute("fill", binaryArray[i][j] ? "black" : "white");

            // Ajouter une bordure fine
            rect.setAttribute("stroke", "gray"); // Couleur de la bordure
            rect.setAttribute("stroke-width", "0.2"); // Largeur de la bordure


            // Ajout de l'événement au clic pour éditer la valeur
            rect.addEventListener("click", function() {
                binaryArray[i][j] = !binaryArray[i][j]; // Inverser la valeur binaire
                rect.setAttribute("fill", binaryArray[i][j] ? "black" : "white"); // Mettre à jour la couleur
            });

            svg.appendChild(rect);
        }
    }

    addCard(document.querySelector(".list-pieces"), svg); // Ajouter le SVG à la page
}

function addCard(container, content) {
    pieceNumber++;

    container.innerHTML += `
    <div class="card piece-card">
        <div class="card-header">
            #${pieceNumber}
        </div>
       <div class="piece-${pieceNumber} p-3"></div>
        <div class="card-footer d-flex justify-content-end m-0 gap-1 p-1">
            <button type="button" class="btn btn-danger w-1s00 d-flex justify-content-around py-0 px-1" onclick="openConfirmModal('Delete piece', ()=>console.log('Callback delete piece n°${pieceNumber}'))"><i class="bi bi-trash"></i></button>
            <button type="button" class="btn btn-primary w-10s0 d-flex justify-content-around py-0 px-1"><i class="bi bi-pencil"></i></button>
        </div>
    </div>
    `;

    document.querySelector(`.piece-${pieceNumber}`).append(content);
}

// Exemple d'utilisation
const binaryArray = [
    [true, false, true, true, true],
    [false, true, false, true, false],
    [true, true, false, true, true],
    [true, true, false, false, true],
    [false, true, false, false, true],
];

createSVGGrid(binaryArray);