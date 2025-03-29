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

export { Status, StatusLabel };