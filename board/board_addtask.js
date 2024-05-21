function openAddTask() {
    let addTask = document.getElementById('addTask');
    addTask.style.display = 'flex';
    document.getElementById('addTaskBackground').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    addTaskSlideIn();
}


function addTaskSlideIn() {
    let addTask = document.getElementById('addTask');
    addTask.classList.add('slideIn');
    setTimeout(() => {
        addTask.classList.remove('slideIn');
    }, 500);

    addTask.style.display = 'flex';
}


function addTaskSlideOut() {
    let addTask = document.getElementById('addTask');
    addTask.classList.add('slideOut');
    setTimeout(() => {
        addTask.classList.remove('slideOut');
        closeAddTask();
    }, 100);
}


function closeAddTask(event) {
    document.body.style.overflow = '';
    document.getElementById('addTask').style.display = 'none';
    document.getElementById('addTaskBackground').style.display = 'none';
    if (event) {
        event.stopPropagation();
    }
    /* location.reload(); */
}