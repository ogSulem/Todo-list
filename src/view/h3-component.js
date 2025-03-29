import { createElement } from '../framework/render.js';


function createH3ComponentTemplate(text) {
    return (
        `<h3>${text}</h3>`
    );
}


export default class H3Component {
    constructor(text) {
        this.text = text;
    }

    getTemplate() {
        return createH3ComponentTemplate(this.text);
    }


    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }


    removeElement() {
        this.element = null;
    }
}
