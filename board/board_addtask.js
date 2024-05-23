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
}


function createTaskBoard() {
    let titleInput = document.getElementById('titleInput');
    let descriptionInput = document.getElementById('descriptionInput');
    let date = document.getElementById('date');
    
    let newTask = {
        'title': titleInput.value,
        'description': descriptionInput.value,
        'assignedTo': taskcontacts,
        'dueDate': date.value,
        'prio': prio,
        'category': categorys,
        'subtask': subtasks,
        'doneSubtask': subtasks.map(() => false),
        'numberOfDoneSubtasks': 0,
        'section': 'To do'
    }
    closeAddTask(); /* schließt das addTask Popup */
    emptyContentSections(); /* leert den kompletten Content */
    init(); /* zeigt alle tasks an */
    showCreateTaskMessage('task_successfully_div');
    
    let user = getUser();
    user.tasks.push(newTask);
    saveUser(user);

    clearForm();
    putData("tasks", tasks)
        .catch(error => console.error(error));
}