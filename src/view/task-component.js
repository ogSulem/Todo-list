import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
    return `<li class="task">${task}</li>`;
}

export default class TaskComponent extends AbstractComponent {
    constructor(task) {
        super();
        this.task = task;
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }
}