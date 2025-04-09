import { AbstractComponent } from '../framework/view/abstract-component.js';

const createEmptyListTemplate = (status) => {
    return `
        <li class="task-empty">
            Список пуст
        </li>
    `;
};

export default class EmptyListComponent extends AbstractComponent {
    #status = null;

    constructor(status) {
        super();
        this.#status = status;
    }

    get template() {
        return createEmptyListTemplate(this.#status);
    }
}