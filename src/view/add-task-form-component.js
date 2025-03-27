import { createElement } from '../framework/render.js';


function createAddTaskFormComponentTemplate() {
    return (
        `<section class="task-form">
            <h2>Новая задача</h2>
            <form class="input-group">
                <input type="text" placeholder="Название задачи...">
                <button>+ Добавить</button>
            </form>
        </section>`
    );
}


export default class AddTaskFormComponent {
    getTemplate() {
        return createAddTaskFormComponentTemplate();
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
