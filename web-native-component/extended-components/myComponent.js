function html(strings, ...values) {
    // Your implementation here
    // This could be a simple string concatenation or a more sophisticated templating engine
    // For the sake of example, let's use a simple join
    return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}

class HelloWorld extends HTMLElement {
    constructor() {
            super();
            this._name = 'World';
        }
        // component attributes
    static get observedAttributes() {
        return ['name'];
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;

        console.log(`Attribute changed : old = ${oldValue} ; new = ${newValue}`);
    }

    // connect component
    connectedCallback() {
        this.render();
    }

    render() {
        // create a Shadow DOM if not exists
        if (!this.shadow) this.shadow = this.attachShadow({ mode: 'closed' });
        // add elements to the Shadow DOM
        this.shadow.innerHTML = html `
        <style>
            p {
            text-align: center;
            font-weight: normal;
            padding: 1em;
            margin: 0 0 2em 0;
            background-color: #eee;
            border: 1px solid #666;
            }
        </style>

        <p>Hello <span id="name">${this.name}</span></p>`;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        if (this._name !== newName) {
            this._name = newName;
            if (this.shadow) this.shadow.querySelector("#name").innerHTML = this._name;
        }
    }

    process() {
        this.name += " |";
    }
}

// use HelloWorld class for <hello-world> component
customElements.define('hello-world', HelloWorld);