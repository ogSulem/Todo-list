import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate() {
    return '<div><ul class="task-list"></ul></div>';
}

export default class TaskListComponent {
    getTemplate() {
        return createTaskListComponentTemplate();
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
