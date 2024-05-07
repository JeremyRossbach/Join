function emptyContentSections() {
    document.getElementById('toDoContent').innerHTML = '';
    document.getElementById('inProgressContent').innerHTML = '';
    document.getElementById('awaitFeedbackContent').innerHTML = '';
    document.getElementById('doneContent').innerHTML = '';
    document.getElementById('emptytoDoContentSection').style.display = 'flex';
    document.getElementById('emptyinProgressContentSection').style.display = 'flex';
    document.getElementById('emptyawaitFeedbackContentSection').style.display = 'flex';
    document.getElementById('emptydoneContentSection').style.display = 'flex';
}


function saveTasks() {
    let tasksAsString = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksAsString);
}


function loadData() {
    let tasksAsString = localStorage.getItem('tasks');
    tasks = JSON.parse(tasksAsString);
}


function findTask() {
    let search = document.getElementById('input').value;
    search = search.toLowerCase();

    emptyContentSections();

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task['title'].toLowerCase().includes(search)) {
            renderTask(i);
        }
    }
}


function renderTask(i) {
    showTask('To do', 'toDoContent', i);
    showTask('In progress', 'inProgressContent', i);
    showTask('Await Feedback', 'awaitFeedbackContent', i);
    showTask('Done', 'doneContent', i);
}


function showTask(section, containerId, i) {
    if (tasks[i]['section'] === section) {
        checkContent(containerId, i);
        renderCategoryColor(i);
    }
}