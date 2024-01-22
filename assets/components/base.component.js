import { html, css } from '../lib/lit-core.min.js';
import { ExtendedLitElement } from '../js/ExtendedLitElement.js';


export class Base extends ExtendedLitElement {
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
        `;
    }
}
customElements.define('base-component', Base);