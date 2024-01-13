import { LitElement, html, css } from '../lib/lit-core.min.js';

export class AppComponent extends LitElement {
    static styles = css ``;

    static properties = {};

    constructor() {
        super();
    }

    firstUpdated() {
        this.confirmModal = this.shadowRoot.querySelector('#confirm-modal');

        this.confirmModal.addEventListener("on-confirm", () => console.log("Modal confirm!"));
        this.confirmModal.addEventListener("on-cancel", () => console.log("Modal cancel!"));
    }

    render() {
        return html `
            <hello-world-component @on-submit=${this.handlePostEvent}></hello-world-component>
            <!-- <hello-world-component id="test" message="Hello guys"></hello-world-component>
            <hello-world-component message="Hi everybody"></hello-world-component> -->

            <confirm-modal-component id="confirm-modal"></confirm-modal-component>
        `;
    }

    handlePostEvent(event) {
        console.log(event);

        this.confirmModal.show();
    }
}
customElements.define('app-component', AppComponent);