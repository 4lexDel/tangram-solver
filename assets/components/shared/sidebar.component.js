import { html, css } from '../../lib/lit-core.min.js';
import { ExtendedLitElement } from '../../js/utils/extended-lit-element.js';


export class SidebarComponent extends ExtendedLitElement {
    static styles = css `
    #sidebar-collapse {
        overflow-y: auto;
    }

    #sidebar-collapse.my-collapse {
        display: none;
    }
    `;

    static properties = {};

    constructor() {
        super();
    }

    firstUpdated() {
        super.loadGlobalCssScope(this.shadowRoot);
    }

    render() {
        return html `
            <button class="mt-2 btn btn-link text-white w-100" @click=${this.collapseSidebar}>
                <i class="bi bi-arrow-left-right fs-5"></i>
            </button>

            <div id="sidebar-collapse" class="p-3 text-white">
                <div class="d-flex flex-column">
                    <span class="fs-4 text-lg-nowrap">Tangram solver</span>
                    <hr>
                    <span class="fs-5">Pieces</span>
                    <hr>
                    <ul class="nav nav-pills flex-column mb-auto gap-3">
                        <li class="nav-item">
                            <button type="button" class="btn btn-primary w-100 d-flex justify-content-around p-2" @click=${this.handleUpdateButton} data-bs-toggle="modal" data-bs-target="#update-piece"><i class="bi bi-plus-slash-minus"></i>Update</button>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="btn btn-warning w-100 d-flex justify-content-around p-2" @click=${this.handleResetButton}><i class="bi bi-x-octagon"></i>Reset</button>
                        </li>
                    </ul>
                    <br>
                    <hr>
                    <span class="fs-5">Simulation</span>
                    <hr>
                    <ul class="nav nav-pills flex-column mb-auto gap-3">
                        <li class="nav-item">
                            <button type="button" class="btn btn-secondary w-100 d-flex justify-content-around p-2" @click=${this.handleSettingsButton}><i class="bi bi-info-circle"></i>Settings</button>
                        </li>
                        <li>
                            <button type="button" class="btn btn-success w-100 d-flex justify-content-around p-2 text-nowrap"><i class="bi bi-play"></i>Solve Tangram</button>
                        </li>
                    </ul>
                    <hr>
                </div>
            </div>

            <confirm-modal-component @on-confirm=${this.resetPieceList} id="confirm-modal" colorTheme="warning"></confirm-modal-component>
        `;
    }

    collapseSidebar() {
        this.shadowRoot.querySelector('#sidebar-collapse').classList.toggle("my-collapse");
    }

    handleUpdateButton() {
        const event = new CustomEvent("on-update-button", {
            detail: {}
        });

        this.dispatchEvent(event);
    }

    handleResetButton() {
        this.shadowRoot.querySelector('#confirm-modal').show('Are you sure you want to reset all settings?');
    }

    resetPieceList() {
        const event = new CustomEvent("on-reset-button", {
            detail: {}
        });

        this.dispatchEvent(event);
    }

    handleSettingsButton() {
        const event = new CustomEvent("on-settings-button", {
            detail: {}
        });

        this.dispatchEvent(event);
    }
}
customElements.define('sidebar-component', SidebarComponent);