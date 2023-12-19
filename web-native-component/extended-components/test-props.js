function html(strings, ...values) {
    // Your implementation here
    // This could be a simple string concatenation or a more sophisticated templating engine
    // For the sake of example, let's use a simple join
    return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}

class ComponentUtils {
    static getBindTemplate(obj, template) {
        // Utilisation d'une expression régulière pour trouver les motifs
        const motifRegex = /{{\s*([^}\s]+)\s*}}/g;

        // Remplacement des motifs dans la chaîne
        const result = template.replace(motifRegex, (match, contenu) => {
            return `<span id="${contenu}">${obj[contenu]}</span>`;
        });

        return result;
    }

    static defineBinding(obj, inputs, dom) {
        console.log(dom);
        inputs.forEach(input => {
            Object.defineProperty(obj, input, {
                get: function() {
                    return obj[`_${input}`]; // Utilise une propriété privée pour stocker la valeur
                },
                set: function(value) {
                    obj[`_${input}`] = value;
                    console.log(`set ${input} value to ${value}`);
                    dom.querySelector(`#${input}`).innerHTML = value;
                },
                enumerable: true, // La propriété sera énumérable
                configurable: true, // La propriété peut être modifiée ou supprimée ultérieurement
            });
        });
    }
}

class TestClass extends HTMLElement {
    constructor() {
        super();
        this.name = "Pierre";
        this.age = "45";
        this.sexe = true;
        this.color = "Rose";

        this.bg_color = "lightsalmon";
        this.text_color = "black";
    }

    static get observedAttributes() {
        return ["name", "age", "sexe", "bg_color", "text_color"];
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        console.log("[ATTR] " + property);
        if (oldValue === newValue) return;
        this[property] = newValue;

        console.log(`Attribute changed : old = ${oldValue} ; new = ${newValue}`);
    }

    // connect component
    connectedCallback() {
        let template = this.getTemplate();
        let bindingTemplate = ComponentUtils.getBindTemplate(this, template);

        // create a Shadow DOM if not exists
        let shadow = this.attachShadow({ mode: 'closed' });
        // add elements to the Shadow DOM
        shadow.innerHTML = bindingTemplate;

        // set up binding
        let bindData = TestClass.observedAttributes;
        bindData.push("color");
        ComponentUtils.defineBinding(this, bindData, shadow);
    }

    getTemplate() {
        return html `
        <style>
            .card{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background-color: ${this.bg_color};
                color: ${this.text_color};
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

        <div class="card">
            <h1>{{ name }}</h1>
            <hr>
            <ul>
                <li>Age : {{ age }}</li>
                <li>Sexe : {{ sexe }}</li>
                <li>Couleur : {{ color }}</li>
            </ul>
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