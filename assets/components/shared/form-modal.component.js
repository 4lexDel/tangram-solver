import { html, css } from '../../lib/lit-core.min.js';
import { ExtendedLitElement } from '../../js/utils/extended-lit-element.js';


export class FormModalComponent extends ExtendedLitElement {
    static styles = css `
        #form-modal{
            display: hidden;
        }
    `;

    static properties = {
        modalContent: "",
        modalTitle: "",
        body: { type: String }
    };

    constructor() {
        super();

        this.defaultModalTitle = "Form modal"
        this.modalTitle = this.defaultModalTitle;

        this.body = null;
    }

    firstUpdated() {
        super.loadGlobalCssScope(this.shadowRoot);

        this.formModal = new bootstrap.Modal(this.shadowRoot.getElementById('form-modal')); //this.shadow.querySelector("#confirm-modal");

        // this.shadowRoot.querySelector('.modal-body').innerHTML = this.body;
    }

    render() {
        return html `
            <div class="modal fade" id="form-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">${this.modalTitle}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body"> 
                            <slot name="body"></slot>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click=${this.onCancelButton}>Cancel</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click=${this.onConfirmButton}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    show(modalTitle = this.defaultModalTitle) {
        this.modalTitle = modalTitle;
        this.formModal.show();
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
customElements.define('form-modal-component', FormModalComponent);