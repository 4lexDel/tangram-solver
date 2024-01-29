import { html, css } from '../../lib/lit-core.min.js';
import { ExtendedLitElement } from '../../js/utils/extended-lit-element.js';
import { ArrayUtils } from '../../js/utils/array-utils.js';


export class PieceListComponent extends ExtendedLitElement {
    static styles = css `
    #form-modal.close {
        display: none;
    }

    #form-modal {
        display: block;
    }

    // .modal.fade:not(.show) {
    //     display: hidden;
    //   }
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
            // [
            //     [false, true, false, false, false],
            //     [false, true, false, false, false], // The 'L'
            //     [false, true, false, false, false],
            //     [false, true, true, false, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, false, true, false, false], // Cross
            //     [false, true, true, true, false],
            //     [false, false, true, false, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, false, true, true, false], // Zig zag
            //     [false, true, true, false, false],
            //     [false, true, false, false, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, false, true, false, false], // Break line
            //     [false, true, true, false, false],
            //     [false, true, false, false, false],
            //     [false, true, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false], // Break cross
            //     [false, false, true, false, false],
            //     [false, true, true, true, false],
            //     [false, true, false, false, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, false, false, false, false], // The 'U'
            //     [false, true, false, true, false],
            //     [false, true, true, true, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, false, true, true, false], // The 'S'
            //     [false, false, true, false, false],
            //     [false, true, true, false, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, false, false, false, false], // Truck
            //     [false, false, true, true, false],
            //     [false, true, true, true, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, true, true, true, false], // The 'T'
            //     [false, false, true, false, false],
            //     [false, false, true, false, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, true, false, false, false], // Corner
            //     [false, true, false, false, false],
            //     [false, true, true, true, false],
            //     [false, false, false, false, false],
            // ],
            // [
            //     [false, false, false, false, false],
            //     [false, false, false, false, false], // Boat
            //     [false, false, true, false, false],
            //     [true, true, true, true, false],
            //     [false, false, false, false, false],
            // ],
        ];
        this.defaultLabels = ["Line", "The 'L'", "Cross", "Zig zag", "Break line", "Break cross", "The 'U'", "The 'S'", "Truck", "The 'T'", "Corner", "Boat"];


        this.resetPieceList();
    }

    resetPieceList() {
        this.grids = ArrayUtils.cloneNDArray(this.defaultGrids);
        this.labels = ArrayUtils.cloneNDArray(this.defaultLabels);

        // console.log(this.grids);

        this.requestUpdate();
    }

    removeAllPieces() {
        if (this.shadowRoot) {
            // console.log(this.shadowRoot);
            const elementsToRemove = this.shadowRoot.querySelectorAll('.piece');

            const elementsArray = Array.from(elementsToRemove);
            // console.log(elementsArray);

            elementsArray.forEach(element => {
                element.remove();
            });
        }
    }

    firstUpdated() {
        super.loadGlobalCssScope(this.shadowRoot);
        // this.formModal = new bootstrap.Modal(this.shadowRoot.getElementById('form-modal'));

        let closeButtons = this.shadowRoot.querySelectorAll('[close-modal]');

        closeButtons.forEach(button => {
            button.addEventListener("click", () => {
                let modalIdentifier = button.getAttribute('close-modal');

                console.log(modalIdentifier);

                this.shadowRoot.querySelector(modalIdentifier).classList.add("close");
            });
        });
    }

    render() {
        return html `
        <div class="modal" id="form-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="10" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Pieces list</h1>
                        <button type="button" class="btn-close" close-modal="#form-modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body"> 
                    <div class="d-flex gap-3 py-4 overflow-x-auto justify-content-start pieces">
                        <add-piece-component></add-piece-component>
                        ${this.renderPieces()}
                    </div>
                    </div>
                    <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click=${this.onCancelButton}>Cancel</button> -->
                        <button type="button" class="btn btn-secondary" close-modal="#form-modal" @click=${this.onCancelButton}>Cancel</button>
                        <button type="button" class="btn btn-primary" close-modal="#form-modal" @click=${this.onConfirmButton}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    renderPieces() {
        // const elementsToRemove = this.shadowRoot.querySelectorAll('piece-component');

        // elementsToRemove.forEach(element => {
        //     // element.remove();
        // });

        let pieces = [];

        for (let i = 0; i < this.grids.length; i++) {
            pieces.push(html `
                <piece-component class="piece" @on-delete=${(event) => this.handleDeletePiece(event, i)} title="${this.labels[i]}" grid=${JSON.stringify(this.grids[i])}>                
            `);
        }

        console.log(pieces);

        return pieces;
    }

    handleDeletePiece(event, index) {
        this.grids.splice(index, 1);
        this.labels.splice(index, 1);

        this.requestUpdate();

        // console.log(this.defaultGrids);
    }

    show() {
        // this.formModal.show();
        this.shadowRoot.getElementById('form-modal').classList.remove("close");

        // this.removeAllPieces();
        this.requestUpdate();
    }

    onConfirmButton() {
        const event = new CustomEvent("on-confirm", {});

        this.dispatchEvent(event);
    }

    onCancelButton() {
        const event = new CustomEvent("on-cancel", {});

        this.dispatchEvent(event);
    }
}
customElements.define('piece-list-component', PieceListComponent);