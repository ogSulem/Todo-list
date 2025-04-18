export function generateID(tasks) {
    if (tasks.length === 0) {
        return "1";
    }

    const maxId = Math.max(...tasks.map(task => parseInt(task.id, 10)));
    return (maxId + 1).toString();
}