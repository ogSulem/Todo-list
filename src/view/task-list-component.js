import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(status) {
    return `
        <div class="${status}">
            <ul class="task-list"></ul>
        </div>
    `;
}

export default class TaskListComponent extends AbstractComponent {
    constructor(status, onTaskDrop) {
        super();
        this.status = status;
        this.onTaskDrop = onTaskDrop;
        this.#setDropHandler();
    }

    get template() {
        return createTaskListComponentTemplate(this.status);
    }

    #setDropHandler() {
        const container = this.element.querySelector('ul');
        let dropIndicator = null;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();

            if (dropIndicator) {
                dropIndicator.remove();
            }

            dropIndicator = document.createElement('div');
            dropIndicator.className = 'drop-indicator';

            const { position, element } = this.#getDropPosition(container, event.clientY);

            if (position === 'start') {
                container.insertBefore(dropIndicator, container.firstChild);
            }
            else if (position === 'before') {
                container.insertBefore(dropIndicator, element);
            }
            else {
                container.appendChild(dropIndicator);
            }
        });

        container.addEventListener('dragleave', () => {
            if (dropIndicator) {
                dropIndicator.remove();
                dropIndicator = null;
            }
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();

            if (dropIndicator) {
                dropIndicator.remove();
                dropIndicator = null;
            }

            const taskId = event.dataTransfer.getData('text/plain');
            const { position, element } = this.#getDropPosition(container, event.clientY);

            let afterId = null;
            if (position === 'start') {
                afterId = null;
            }
            else if (position === 'before') {
                afterId = element.previousElementSibling?.dataset.id || null;
            }
            else {
                const lastTask = container.lastElementChild;
                afterId = lastTask?.dataset.id || null;
            }

            this.onTaskDrop(taskId, this.status, afterId);
        });
    }

    #getDropPosition(container, y) {
        const tasks = [...container.querySelectorAll('.task:not(.dragging)')];
        const containerRect = container.getBoundingClientRect();

        if (tasks.length > 0) {
            const firstTask = tasks[0];
            const firstTaskRect = firstTask.getBoundingClientRect();
            if (y < firstTaskRect.top + firstTaskRect.height / 4) {
                return { position: 'start' };
            }
        }

        for (const task of tasks) {
            const rect = task.getBoundingClientRect();
            const offset = y - rect.top;

            if (offset > rect.height / 4 && offset < rect.height * 3 / 4) {
                return { position: 'before', element: task };
            }
        }

        return { position: 'end' };
    }
}