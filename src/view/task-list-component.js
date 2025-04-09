import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(status) {
    return `
        <div class="${status}">
            <ul class="task-list">
            
            </ul>
        </div>
    `;
}

export default class TaskListComponent extends AbstractComponent {
    constructor(status) {
        super();
        this.status = status;
    }

    get template() {
        return createTaskListComponentTemplate(this.status);
    }
}
