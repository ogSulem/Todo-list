import { createElement } from '../framework/render.js';

function createTaskBoardComponentTemplate() {
    return `
        <section class="task-board">
            <div class="backlog">
                <h3>Бэклог</h3>
            </div>
            <div class="progress">
                <h3>В процессе</h3>
            </div>
            <div class="done">
                <h3>Готово</h3>
            </div>
            <div class="trash">
                <h3>Корзина</h3>
                <button class="clear-btn">✖ Очистить</button>
            </div>
        </section>
    `;
}

export default class TaskBoardComponent {
    getTemplate() {
        return createTaskBoardComponentTemplate();
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