const Status = {
    BACKLOG: 'backlog',
    PROCESS: 'process',
    DONE: 'done',
    TRASH: 'trash',
};

const StatusLabel = {
    [Status.BACKLOG]: 'Бэклог',
    [Status.PROCESS]: 'В процессе',
    [Status.DONE]: 'Готово',
    [Status.TRASH]: 'Корзина',
};

const UserAction = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK: "ADD_TASK",
    DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT: 'INIT',
};

export { Status, StatusLabel, UserAction, UpdateType };