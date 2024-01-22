import { html, css } from '../lib/lit-core.min.js';
import { ExtendedLitElement } from '../js/utils/extended-lit-element.js';

export class AppComponent extends ExtendedLitElement {
    static styles = css `
    sidebar-component {
        background-color: #212529 !important;
        height: 100vh;
    }
    `;

    static properties = {};

    constructor() {
        super();
    }

    firstUpdated() {
        super.loadGlobalCssScope(this.shadowRoot);

        this.confirmModal = this.shadowRoot.querySelector('#confirm-modal');
        this.settingsModal = this.shadowRoot.querySelector('#simulation-settings-modal');
        this.updatePiecesModal = this.shadowRoot.querySelector('#update-piece-modal');

        this.confirmModal.addEventListener("on-confirm", () => console.log("Modal confirm!"));
        this.confirmModal.addEventListener("on-cancel", () => console.log("Modal cancel!"));
    }

    render() {
        return html `
            <div class="w-100 main d-flex gap-0 m-0 p-0">
                <div class="content" style="flex: 1 0">
                    <tangram-component></tangram-component>
                </div>

                <sidebar-component class="justify-content-center" style="flex: 0 15" 
                    @on-update-button=${this.openUpdateModal}
                    @on-settings-button=${this.openSettingsModal}
                    @on-reset-button=${this.resetPieceList}>
                </sidebar-component>
            </div>

            <form-modal-component id="update-piece-modal" 
            body='
            <piece-list-component></piece-list-component>
            '>
            </form-modal-component>

            <form-modal-component id="simulation-settings-modal"
            .body='
            <div>
                <piece-component title="TEST"></piece-component>
            </div>
            '>
            </form-modal-component>

            <confirm-modal-component id="confirm-modal"></confirm-modal-component>
        `;
    }

    openUpdateModal() {
        this.updatePiecesModal.show("Update piece list");
    }

    openSettingsModal() {
        this.settingsModal.show();
    }

    resetPieceList() {
        let element = this.shadowRoot.querySelector('#update-piece-modal').shadowRoot;
        console.log(element);
    }

    handlePostEvent(event) {
        console.log(event);

        this.confirmModal.show();
    }
}
customElements.define('app-component', AppComponent);