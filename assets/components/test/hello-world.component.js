import { html, css } from '../../lib/lit-core.min.js';
import { ExtendedLitElement } from '../../js/ExtendedLitElement.js';


export class HelloWorldComponent extends ExtendedLitElement {
    static styles = css `
        .box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            width: 200px;

            margin: 20px;
            padding: 10px 25px;

            border: 3px solid black;
            border-radius: 5px;
        }

        h1 {
            color: darkblue;
            font-size: larger;
        }

        p {
            margin: 2px;
        }

        .box * {
            width: 100%;
        }

        input {
            padding: 5px 0;
        }

        label {
            display: flex;
            font-style: italic;
            user-select: none;
            gap: 20px;
        }

        .max-content {
            width: max-content;
        }

        .action {
            text-align: center;
            background: lightgreen;
            padding: 5px;
            font-weight: bold;
        }
    `;

    static properties = {
        message: {},
        like: false,
        lockMessage: false
    };

    constructor() {
        super();
        this.message = 'Hello world';
        this.like = false;

        this.lockMessage = true;
    }

    firstUpdated() {
        super.loadGlobalCssScope(this.shadowRoot);
    }

    render() {
        return html `
            <div class="box">
                <h1>Message : ${this.message}</h1>
                <p ?hidden=${!this.like} class="action">Like action !</p>
                <label>Lock editing <input class="max-content" type="checkbox" @change=${this.setChecked} ?checked=${this.lockMessage}></label>
                <input ?disabled=${this.lockMessage} @input=${this.changeMessage} placeholder="Enter your message" .value=${this.message}>
                <button class="btn ${this.like ? 'btn-danger' : 'btn-success'}" @click=${this.handleClick}>${this.like ? 'Unlike :(' : 'Like ;)'}</button>
                <button class="btn btn-dark" @click=${this.postAction}>Post</button>
            </div>
        `;
    }

    handleClick(event) {
        this.like = !this.like;
    }

    setChecked(event) {
        this.lockMessage = event.target.checked;
    }

    changeMessage(event) {
        const input = event.target;
        this.message = input.value;
    }

    postAction() {
        const event = new CustomEvent("on-submit", {
            detail: {
                message: this.message,
                like: this.like
            }
        });

        this.dispatchEvent(event);
    }
}
customElements.define('hello-world-component', HelloWorldComponent);