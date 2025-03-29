import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import DeleteButtonComponent from './view/button-delete-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, bodyContainer, RenderPosition.BEFOREEND);

for (let i = 0; i < 4; i++) {
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, taskBoardComponent, RenderPosition.BEFOREEND);

    for (let j = 0; j < 4; j++) render(new TaskComponent(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
}
