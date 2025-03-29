import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import DeleteButtonComponent from './view/button-delete-component.js';
import TasksModel from './model/tasks-model.js';
import { render, RenderPosition } from './framework/render.js';


const bodyContainer = document.querySelector('.board-app');

const tasksBoardPresenter = new TaskBoardPresenter({ boardContainer: bodyContainer });

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), bodyContainer, RenderPosition.BEFOREEND);

tasksBoardPresenter.init();