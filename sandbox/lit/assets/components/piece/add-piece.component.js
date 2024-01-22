import { html, css } from '../../lib/lit-core.min.js';
import { ExtendedLitElement } from '../../js/ExtendedLitElement.js';


export class AddPieceComponent extends ExtendedLitElement {
    static styles = css `
    .piece-card {
        padding: 10px;
        border: 2px dashed #0d6efd;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    #add-piece i {
        font-size: 50px;
        color: #0d6efd;
    }
    
    #add-piece button {
        all: unset;
        cursor: pointer;
    }
    
    #add-piece button:hover i {
        display: block;
        scale: 1.2;
        transition: ease-in-out 0.2s;
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
            <div class="card piece-card">
                <div id="add-piece" class="px-5">
                    <div class="d-flex justify-content-center align-items-center h-100">
                        <button type="button"><i class="bi bi-plus-square"></i></button>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('add-piece-component', AddPieceComponent);