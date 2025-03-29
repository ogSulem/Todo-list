import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(className) {
    return `<div class="${className}"><h3>Название блока</h3><ul class="task-list"></ul></div>`;
}

export default class TaskListComponent {
    constructor(className) {
        this.className = className;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.className);
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
