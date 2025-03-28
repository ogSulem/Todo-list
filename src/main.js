import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import DeleteButtonComponent from './view/button-delete-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');

const initialTasks = {
    backlog: [
        'Изучить JS',
        'Создать ToDo',
    ],
    progress: [
        'Оптимизировать код',
    ],
    done: [
        'Добавить новые функции',
    ],
    trash: [
        'Погулять'
    ]
};

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, bodyContainer, RenderPosition.BEFOREEND);

Object.entries(initialTasks).forEach(([section, tasks]) => {
    const taskListElement = taskBoardComponent.getElement().querySelector(`.${section}`);
    const taskListComponent = new TaskListComponent();

    render(taskListComponent, taskListElement, RenderPosition.BEFOREEND);

    tasks.forEach(task =>
        render(new TaskComponent(task), taskListComponent.getElement(), RenderPosition.AFTERBEGIN)
    );

    if (section === 'trash') {
        const deleteButton = new DeleteButtonComponent();
        render(deleteButton, taskListComponent.getElement(), RenderPosition.AFTEREND);
    }
});
