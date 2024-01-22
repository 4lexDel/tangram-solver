import { html, css } from '../../lib/lit-core.min.js';
import { ExtendedLitElement } from '../../js/ExtendedLitElement.js';


export class ConfirmModalComponent extends ExtendedLitElement {
    static styles = css `
        #confirm-modal{
            display: none;
        }
    `;

    static properties = {
        modalContent: "",
        modalTitle: "",
        colorTheme: 'primary'
    };

    constructor() {
        super();

        this.defaultModalContent = "Confirm?"
        this.modalContent = this.defaultModalContent;
        this.defaultModalTitle = "Confirm modal"
        this.modalTitle = this.defaultModalTitle;

        this.colorTheme = 'primary';

        this.paramToReturn = null;
    }

    firstUpdated() {
        super.loadGlobalCssScope(this.shadowRoot);

        this.confirmModal = new bootstrap.Modal(this.shadowRoot.getElementById('confirm-modal')); //this.shadow.querySelector("#confirm-modal");
    }

    render() {
        return html `
            <div class="modal fade" id="confirm-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div style="border: ${this.getColorTheme()} solid 3px !important;" class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" >ConfirmModal</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${this.modalContent}</p>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal" @click=${this.onCancelButton}>Cancel</button>
                            <button class="btn btn-${this.colorTheme}" data-bs-dismiss="modal" @click=${this.onConfirmButton}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getColorTheme() {
        switch (this.colorTheme) {
            case 'primary':
                return '#0d6efd'

            case 'danger':
                return '#bb2d3b'

            case 'warning':
                return '#ffc107'
        }
    }

    show(modalContent = this.defaultModalContent, modalTitle = this.defaultModalTitle, paramToReturn = null) {
        this.modalContent = modalContent;
        this.modalTitle = modalTitle;
        this.paramToReturn = paramToReturn;
        this.confirmModal.show();
    }

    onConfirmButton() {
        const event = new CustomEvent("on-confirm", { detail: this.paramToReturn });

        this.dispatchEvent(event);
    }

    onCancelButton() {
        const event = new CustomEvent("on-cancel", {});

        this.dispatchEvent(event);
    }
}
customElements.define('confirm-modal-component', ConfirmModalComponent);