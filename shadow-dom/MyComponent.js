class MonComposant extends HTMLElement {
    // component attributes
    static get observedAttributes() {
        return ['name', 'color', 'identifiant'];
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }

    connectedCallback() {
        /** SHADOW OPTION */
        const shadow = this.attachShadow({ mode: 'open' });

        /** START DECLARE HTML */
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="container">
            <p>Contenu du composant</p>
            <button>Bouton</button>
        </div>
        `;
        /** END DECLARE HTML */

        /** START DECLARE STYLE */
        const style = document.createElement('style');
        style.textContent = `
        .container {
          color: ${this.color};
          display: flex;
          gap: 10px;
          background-color: #BBBBBB;
          padding: 5px 20px;
        }

        button{
            background-color: ${this.color};
            padding: 2px 10px;
        }
        `;
        /** END DECLARE STYLE */

        shadow.appendChild(style);
        shadow.appendChild(div);
    }

    method() {
        console.log(`Method log : identifiant = ${this.identifiant}`);
    }
}

customElements.define('my-component', MonComposant);