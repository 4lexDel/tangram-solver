function html(strings, ...values) {
    // Your implementation here
    // This could be a simple string concatenation or a more sophisticated templating engine
    // For the sake of example, let's use a simple join
    return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}

class PieceComponent extends HTMLElement {
    constructor() {
        super();

        this.cell_size = ko.observable(20); // Taille de la cellule en pixels
        // this.grid = Array.from({ length: 5 }, () => Array(5).fill(false));
        this.grid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.random() < 0.5));

        this.name = ko.observable("Piece");

    }

    // component attributes
    static get observedAttributes() {
        return ['name', 'grid', 'cell_size'];
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        console.log(newValue);
        if (oldValue === newValue) return;
        if (property == "grid") this[property] = newValue;
        else this[property] = ko.observable(newValue);

        console.log(this[property]);
    }

    connectedCallback() {
        /** SHADOW OPTION */
        this.shadow = this.attachShadow({ mode: 'open' });

        // this.shadow.appendChild(style);
        this.shadow.innerHTML = this.getTemplate();

        this.shadow.querySelector('.piece').append(this.getSVGGrid());

        this.confirmModal = new bootstrap.Modal(this.shadow.getElementById('confirm-modal')); //this.shadow.querySelector("#confirm-modal");

        ko.applyBindings(this, this.shadow.getElementById('myComponent')); //
    }

    getTemplate() {
        return html `
        <style></style>
        <div id="myComponent">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
            <link rel="stylesheet" href="./assets/css/piece.css">
            
            <div class="card piece-card">
                <div class="card-header">
                    <p data-bind="text: name"></p>
                </div>
                <div class="piece p-3"></div>
                <div part="bts-icon" class="card-footer d-flex justify-content-end m-0 gap-1 p-1">
                    <button type="button" class="btn btn-danger w-1s00 d-flex justify-content-around py-0 px-1" onclick="$('#confirm-modal-component').showModal()"><i class="bi bi-trash"></i></button>
                    <button type="button" class="btn btn-primary w-10s0 d-flex justify-content-around py-0 px-1"><i class="bi bi-pencil"></i></button>
                </div>
            </div>

            <confirm-modal id="confirm-modal-component"></confirm-modal>
        </div>
        `
    }

    getSVGGrid() {
        const svgNS = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(svgNS, "svg");
        const numRows = this.grid.length;
        const numCols = this.grid[0].length;

        svg.setAttribute("width", numCols * this.cell_size());
        svg.setAttribute("height", numRows * this.cell_size());

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                const rect = document.createElementNS(svgNS, "rect");
                rect.setAttribute("x", j * this.cell_size());
                rect.setAttribute("y", i * this.cell_size());
                rect.setAttribute("width", this.cell_size());
                rect.setAttribute("height", this.cell_size());

                // Ajout d'une classe pour différencier les rectangles
                rect.classList.add("grid-cell");

                // Donner une couleur de remplissage en fonction de la valeur binaire
                rect.setAttribute("fill", this.grid[i][j] ? "black" : "white");

                // Ajouter une bordure fine
                rect.setAttribute("stroke", "gray"); // Couleur de la bordure
                rect.setAttribute("stroke-width", "0.2"); // Largeur de la bordure


                // Ajout de l'événement au clic pour éditer la valeur
                rect.addEventListener("click", () => {
                    this.grid[i][j] = !this.grid[i][j]; // Inverser la valeur binaire
                    rect.setAttribute("fill", this.grid[i][j] ? "black" : "white"); // Mettre à jour la couleur
                });

                svg.appendChild(rect);
            }
        }

        return svg;
    }

    showModal(callback = null) {
        this.confirmModal.show();

        if (callback) {
            if (this.lastCallback) this.onfirmModalDeleteButton.removeEventListener("click", this.lastCallback);
            this.lastCallback = callback;

            this.confirmModalDeleteButton.addEventListener("click", callback);
        }
    }
}

customElements.define('piece-component', PieceComponent);