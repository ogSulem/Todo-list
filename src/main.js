import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://68547bfc6a6ef0ed662f36fe.mockapi.io';
const bodyContainer = document.querySelector('.board-app');
const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});

const tasksBoardPresenter = new TaskBoardPresenter({
    boardContainer: bodyContainer,
    tasksModel
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent({ onClick: handleNewTaskButtonClick }), bodyContainer, RenderPosition.BEFOREEND);

function handleNewTaskButtonClick() {
    tasksBoardPresenter.createTask();
}

tasksBoardPresenter.init();