function html(strings, ...values) {
    // Your implementation here
    // This could be a simple string concatenation or a more sophisticated templating engine
    // For the sake of example, let's use a simple join
    return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}

class TestClass extends HTMLElement {
    constructor() {
        super();
        this.name = ko.observable("Pierre");
        this.age = ko.observable("45");
        this.sexe = ko.observable(true);
        this.color = ko.observable("Rose");
        this.bg_color = ko.observable("lightsalmon");
        this.text_color = ko.observable("black");
    }

    static get observedAttributes() {
        return ["name", "age", "sexe", "bg_color", "text_color"];
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = ko.observable(newValue);
    }

    // connect component
    connectedCallback() {
        let template = this.getTemplate();

        // create a Shadow DOM if not exists
        let shadow = this.attachShadow({ mode: 'closed' });
        // add elements to the Shadow DOM
        shadow.innerHTML = template;

        // set up binding
        let bindData = TestClass.observedAttributes;
        bindData.push("color");

        ko.applyBindings(this, shadow.getElementById('myComponent'));
    }

    getTemplate() {
        return html `
        <style>
            .card{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background-color: ${this.bg_color()};
                color: ${this.text_color()};
                width: max-content;
                margin: 20px;
                padding: 5px 25px;
                border: 3px solid black;
                border-radius: 5px;
            }

            /* .card ul {
                text-align: left;
            } */

            hr{
                width: 100%;
            }
        </style>
        <div id="myComponent">
            <div class="card">
                <h1 data-bind="text: name"></h1>
                <hr>
                <ul>
                    <li>Age : <strong data-bind="text: age"></strong></li>
                    <li>Sexe : <strong data-bind="text: sexe"></strong></li>
                    <li>Couleur : <strong data-bind="text: color"></strong></li>
                </ul>
                <p>Name : <input data-bind="value: name" /></p>
            </div>
        </div>
        `
    }
}
customElements.define('test-class', TestClass);

// testInst = new TestClass();

// // console.log(Object.getPrototypeOf(testInst));

// testInst.name = "Oui oui";
// testInst.age = 25;
// testInst.sexe = true;

// console.log(TestClass.observedAttributes);