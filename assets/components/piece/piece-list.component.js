import { html, css } from '../../lib/lit-core.min.js';
import { ExtendedLitElement } from '../../js/utils/ExtendedLitElement.js';
import { ArrayUtils } from '../../js/utils/array-utils.js';


export class PieceListComponent extends ExtendedLitElement {
    static styles = css `
    `;

    static properties = {};

    constructor() {
        super();

        this.defaultGrids = [
            [
                [false, false, true, false, false],
                [false, false, true, false, false], // Line
                [false, false, true, false, false],
                [false, false, true, false, false],
                [false, false, true, false, false],
            ],
            [
                [false, true, false, false, false],
                [false, true, false, false, false], // The 'L'
                [false, true, false, false, false],
                [false, true, true, false, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, false, true, false, false], // Cross
                [false, true, true, true, false],
                [false, false, true, false, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, false, true, true, false], // Zig zag
                [false, true, true, false, false],
                [false, true, false, false, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, false, true, false, false], // Break line
                [false, true, true, false, false],
                [false, true, false, false, false],
                [false, true, false, false, false],
            ],
            [
                [false, false, false, false, false], // Break cross
                [false, false, true, false, false],
                [false, true, true, true, false],
                [false, true, false, false, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, false, false, false, false], // The 'U'
                [false, true, false, true, false],
                [false, true, true, true, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, false, true, true, false], // The 'S'
                [false, false, true, false, false],
                [false, true, true, false, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, false, false, false, false], // Truck
                [false, false, true, true, false],
                [false, true, true, true, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, true, true, true, false], // The 'T'
                [false, false, true, false, false],
                [false, false, true, false, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, true, false, false, false], // Corner
                [false, true, false, false, false],
                [false, true, true, true, false],
                [false, false, false, false, false],
            ],
            [
                [false, false, false, false, false],
                [false, false, false, false, false], // Boat
                [false, false, true, false, false],
                [true, true, true, true, false],
                [false, false, false, false, false],
            ],
        ];
        this.defaultLabel = ["Line", "The 'L'", "Cross", "Zig zag", "Break line", "Break cross", "The 'U'", "The 'S'", "Truck", "The 'T'", "Corner", "Boat"];


        this.resetPieceList();
    }

    resetPieceList() {
        this.grids = ArrayUtils.cloneNDArray(this.defaultGrids);
        this.label = ArrayUtils.cloneNDArray(this.defaultLabel);
    }

    firstUpdated() {
        super.loadGlobalCssScope(this.shadowRoot);
    }

    render() {
        return html `
            <div class="d-flex gap-3 py-4 overflow-x-auto justify-content-start">
                <add-piece-component></add-piece-component>
                ${this.renderPieces()}
            </div>
        `;
    }

    renderPieces() {
        let pieces = [];

        for (let i = 0; i < this.grids.length; i++) {
            pieces.push(html `
                <piece-component @on-delete=${(event) => this.handleDeletePiece(event, i)} title="${this.label[i]}" grid=${JSON.stringify(this.grids[i])}>                
            `);
        }

        return pieces;
    }

    handleDeletePiece(event, index) {
        this.grids.splice(index, 1);
        this.label.splice(index, 1);

        this.requestUpdate();

        console.log(this.defaultGrids);
    }
}
customElements.define('piece-list-component', PieceListComponent);