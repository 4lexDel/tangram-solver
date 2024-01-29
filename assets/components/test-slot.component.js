import { html, css } from '../lib/lit-core.min.js';
import { ExtendedLitElement } from '../js/utils/extended-lit-element.js';


export class TestSlotComponent extends ExtendedLitElement {
    static styles = css `
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
        <h1>TEST SLOT H1</h1>
        <slot name="secondary"></slot>
        <slot name="content"></slot>
        `;
    }
}
customElements.define('test-slot-component', TestSlotComponent);