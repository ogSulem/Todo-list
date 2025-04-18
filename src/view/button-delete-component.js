import { AbstractComponent } from '../framework/view/abstract-component.js';


function createDeleteButtonComponentTemplate() {
    return (
        `<button class="clear-btn" type="submit">
            <span>✖ Очистить</span>
        </button>`
    );
}


export default class DeleteButtonComponent extends AbstractComponent {
    #handleClick = null;

    constructor({ onClick }) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }

    get template() {
        return createDeleteButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}
