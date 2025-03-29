import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(status) {
    return `
        <div class="${status}">
            <ul class="task-list">
            
            </ul>
        </div>
    `;
}

export default class TaskListComponent {
    #status = null;
    #element = null;

    constructor(status) {
        this.#status = status;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.#status);
    }

    getElement() {
        if (!this.#element) {
            this.#element = createElement(this.getTemplate());
        }
        return this.#element;
    }

    removeElement() {
        this.#element = null;
    }
}
