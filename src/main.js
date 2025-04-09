import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';


const bodyContainer = document.querySelector('.board-app');
const tasksModel = new TasksModel();

const tasksBoardPresenter = new TaskBoardPresenter({
    boardContainer: bodyContainer,
    tasksModel
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), bodyContainer, RenderPosition.BEFOREEND);

tasksBoardPresenter.init();