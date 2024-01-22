import { LitElement } from '../../lib/lit-core.min.js';

export class ExtendedLitElement extends LitElement {
    static _globalCssStylesheets = null;

    constructor() {
        super();
    }

    loadGlobalCssScope(shadowDom, force = false) {
        if (!ExtendedLitElement._globalCssStylesheets || force) {
            ExtendedLitElement._globalCssStylesheets = [];

            let styleSheetsToCopy = Array.from(document.styleSheets);

            styleSheetsToCopy.forEach((stylesheet) => {
                try {
                    const newStyleSheet = this.copyStylesheetRules(stylesheet);
                    ExtendedLitElement._globalCssStylesheets.push(newStyleSheet);
                } catch (error) {
                    console.error(`Failed to copy rules from stylesheet: ${stylesheet.href}`, error);
                }
            });
        }
        if (ExtendedLitElement._globalCssStylesheets.length)
            shadowDom.adoptedStyleSheets = [...ExtendedLitElement._globalCssStylesheets, ...shadowDom.adoptedStyleSheets];
    }

    copyStylesheetRules(stylesheet) {
        const newStyleSheet = new CSSStyleSheet();

        // Copy rules from the original stylesheet while maintaining order
        for (let i = 0; i < stylesheet.cssRules.length; i++) {
            const rule = stylesheet.cssRules[i];
            newStyleSheet.insertRule(rule.cssText, i);
        }

        return newStyleSheet;
    }
}