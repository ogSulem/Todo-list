import { AbstractComponent } from '../framework/view/abstract-component.js';


function createH3ComponentTemplate(text) {
    return (
        `<h3>${text}</h3>`
    );
}


export default class H3Component extends AbstractComponent {
    constructor(text) {
        super();
        this.text = text;
    }

    get template() {
        return createH3ComponentTemplate(this.text);
    }
}
