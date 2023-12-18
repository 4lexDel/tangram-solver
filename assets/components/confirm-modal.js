class ConfirmModal extends HTMLElement {
    // component attributes
    // static get observedAttributes() {
    //     return ['title', 'text', 'callback'];
    // }

    // // attribute change
    // attributeChangedCallback(property, oldValue, newValue) {
    //     if (oldValue === newValue) return;
    //     this[property] = newValue;
    // }

    connectedCallback() {
        /** SHADOW OPTION */
        this.shadow = this.attachShadow({ mode: 'open' });

        /** START DECLARE HTML */
        const div = document.createElement('div');
        div.innerHTML = `
        <div style="display: none;" class="modal fade" id="confirm-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="confirm-modal-title">ConfirmModal</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="confirm-modal-content"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button id="confirm-modal-delete-button" type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        /** END DECLARE HTML */

        /** START DECLARE STYLE */
        const style = document.createElement('style');
        style.textContent = `
        div{
            background-color: red;
        }

        // modal {
        //     display: none;
        // }
        `;
        /** END DECLARE STYLE */

        this.shadow.appendChild(style);
        this.shadow.appendChild(div);

        this.confirmModal = new bootstrap.Modal(this.shadow.getElementById('confirm-modal')); //this.shadow.querySelector("#confirm-modal");
        this.confirmModalTitle = this.shadow.querySelector("#confirm-modal-title");
        this.confirmModalContent = this.shadow.querySelector("#confirm-modal-content");
        this.confirmModalDeleteButton = this.shadow.querySelector("#confirm-modal-delete-button");
    }

    showModal(text, callback = null, title = "Confirm modal") {
        this.confirmModalTitle.textContent = title;
        this.confirmModalContent.textContent = text;
        this.confirmModal.show();

        if (callback) {
            if (this.lastCallback) this.onfirmModalDeleteButton.removeEventListener("click", this.lastCallback);
            this.lastCallback = callback;

            this.confirmModalDeleteButton.addEventListener("click", callback);
        }
    }
}

customElements.define('confirm-modal', ConfirmModal);