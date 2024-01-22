import { html, css } from '../../lib/lit-core.min.js';
import { ExtendedLitElement } from '../../js/ExtendedLitElement.js';


export class PieceComponent extends ExtendedLitElement {
    static styles = css `
    :host{
        display: flex;
        justify-content: center;
    } 

    .card-header {
        display: flex;
        justify-content: center;
    }

    .piece-card {
        padding: 10px;
        border: 4px solid grey;
        // min-width: max-content !important;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 0px; /* Espacement entre les cellules */
    }
  
    .cell {
        width: 35px;
        height: 35px;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 10px;
    }

    .grid .cell.fill {
        background-color: black;
        color: white;
    }

    .grid.edit .cell.fill {
        background-color: #0D6EFD;
    }

    .grid.diseable:not(.edit) .cell.fill {
        background-color: #bbbbbb;
    }
    `;

    static properties = {
        cell_size: 5,
        grid: [],
        title: "#Piece",
        edit: false,
        diseable: false
    };

    constructor() {
        super();
        this.grid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.random() < 0.5));
        this.title = "#Piece";
        this.edit = false;
        this.diseable = false;
    }

    firstUpdated() {
        super.loadGlobalCssScope(this.shadowRoot);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'grid' && oldVal !== newVal) {
            this.grid = JSON.parse(newVal);
        } else super.attributeChangedCallback(name, oldVal, newVal);
    }

    render() {
        return html `
            <div class="card piece-card">
                <h3 ?hidden=${this.edit}>${this.title}</h3>
                <div ?hidden=${!this.edit} class="card-header">
                    <div class="d-flex align-items-center">
                        <input class="fs-5 me-3 w-100 border-0 text-align-center overflow-x-auto" ?disabled=${!this.edit} @input=${this.changeTitle} placeholder="Enter your piece title" .value=${this.title}>
                        <i class="bi bi-pencil"></i>
                    </div>
                </div>
                <div class="grid">
                    ${this.renderGrid()}
                </div>
                <div class="card-footer d-flex justify-content-end m-0 gap-1 p-2 mt-3">
                    <button @click=${this.handleDeleteButton} type="button" class="btn btn-danger w-100 d-flex justify-content-around py-0 px-1"><i class="bi bi-trash"></i></button>
                    <button @click=${this.handleDiseableButton} type="button" class="btn btn-${this.diseable ? 'warning' : 'secondary'} w-100 d-flex justify-content-around py-0 px-1">
                        <i ?hidden=${this.diseable} class="bi bi-lock"></i>
                        <i ?hidden=${!this.diseable} class="bi bi-unlock"></i>
                    </button>
                    <button @click=${this.handleEditButton} type="button" class="btn btn-${this.edit ? 'success' : 'primary'} w-100 d-flex justify-content-around py-0 px-1">
                        <i ?hidden=${this.edit} class="bi bi-pencil"></i>
                        <i ?hidden=${!this.edit} class="bi bi-check2"></i>
                    </button>
                </div>
            </div>

            <confirm-modal-component @on-confirm=${this.deletePiece} id="confirm-modal" colorTheme='danger'></confirm-modal-component>
        `;
    }

    renderGrid() {
        let grid = [];

        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[0].length; y++) {
                grid.push(html `<div class="cell ${this.grid[x][y] ? 'fill' : ''}" @click=${this.handleCellClick} x=${x} y=${y}></div>`); //(${x + 1}, ${y + 1})
            }
        }

        return grid;
    }

    handleCellClick(event) {
        if (this.edit) {
            const xValue = event.currentTarget.getAttribute('x');
            const yValue = event.currentTarget.getAttribute('y');

            event.currentTarget.classList.toggle('fill');
            this.grid[xValue][yValue] = !this.grid[xValue][yValue];
        }
    }

    handleDeleteButton() {
        this.shadowRoot.querySelector('#confirm-modal').show('Are you sure you want to delete that piece?', "Delete confirmation");
    }

    deletePiece() {
        const event = new CustomEvent("on-delete", {});

        this.dispatchEvent(event);
    }

    handleDiseableButton() {
        this.diseable = !this.diseable;
        this.shadowRoot.querySelector(".grid").classList.toggle('diseable')
    }

    handleEditButton() {
        if (!this.diseable || this.edit) {
            this.edit = !this.edit;
            this.shadowRoot.querySelector(".grid").classList.toggle('edit')
        }
    }

    changeTitle(event) {
        const input = event.target;
        this.title = input.value;
    }
}
customElements.define('piece-component', PieceComponent);