function renderSubtask() {
    let pushedSubtasks = document.getElementById("pushedSubtasks");
    pushedSubtasks.innerHTML = '';
    for (let j = 0; j < subtasks.length; j++) {
        let subtask = subtasks[j];
        pushedSubtasks.innerHTML += generateSubtaskHTML(j, subtask);
    }
}

function generateSubtaskHTML(index, subtask) {
    return /*html*/`
        <div class="subtask">
            <div class='subtaskHover'>
                <div class='editableSubtask' id='editableSubtask${index}'>
                    <span id='valueSpan${index}'>· ${subtask}</span>
                    <div id='subtaskHoverIcon${index}' class="subtaskHoverIcon">
                        <img onclick='subtasksEditAndDelete(${index})' src="img/subtaskPencil.svg">
                        <img onclick='deleteSubtask(${index})' src="img/subtaskDelete.svg">
                    </div>
                </div>
            </div>
            <div class='subtaskInputParent noDisplay' id='subtaskInputParent${index}'>
                <input class='subtaskInput noDisplay' id='subtaskEditInput${index}' value='${subtask}'>
                <img onclick='deleteSubtask(${index})' src="img/subtaskDelete.svg">
                <div class='divider'></div>
                <img onclick='pushEditToArray(${index},"${subtask}")' src="img/subtaskCheck.svg">
            </div>
        </div>
    `;
}


function subtasksEditAndDelete(j) {
    let editableSubtask = document.getElementById(`editableSubtask${j}`);
    document.getElementById(`subtaskEditInput${j}`).classList.remove('noDisplay');
    document.getElementById(`subtaskInputParent${j}`).classList.remove('noDisplay');
    document.getElementById(`subtaskEditInput${j}`).focus();
    document.getElementById(`subtaskHoverIcon${j}`).classList.add('noDisplay');
    document.getElementById(`editableSubtask${j}`).classList.add('noDisplay');
    document.getElementById(`valueSpan${j}`).classList.add('noDisplay');
}



function deleteSubtask(j) {
    subtasks.splice(j, 1);
    saveSubtusks();
    renderSubtask();
}


function pushEditToArray(j) {
    let subtaskEdit = document.getElementById(`subtaskEditInput${j}`)

    subtasks.push(subtaskEdit.value)
    subtaskEdit.value = '';
    deleteSubtask(j)


    saveSubtusks();
    loadSubtasks();
    renderSubtask();
}


function saveSubtusks() {
    let subtaskasText = JSON.stringify(subtasks);
    localStorage.setItem('subtasks', subtaskasText);
}


function loadSubtasks() {
    let subtaskasText = localStorage.getItem(subtasks)
    sub_tasks = JSON.parse(subtaskasText);

}
function pushSubtask() {
    let subtaskinput = document.getElementById("subtask_input");
    subtasks.push(subtaskinput.value);
    subtaskinput.value = '';

    renderSubtask()
}

let testtask = [];

function createTask() {
    let titleInput = document.getElementById('titleInput').value;
    let descriptionInput = document.getElementById('descriptionInput').value;
    let date = document.getElementById('date').value;

    let newTask = {
        'title': titleInput,
        'description': descriptionInput,
        'assignedTo': taskcontacts,
        'dueDate': date,
        'prio': prio,
        'category': categorys,
        'subtask': subtasks,
        'doneSubtask': subtasks.map(() => false),
        'numberOfDoneSubtasks': 0,
        'section': 'To do'
    }
    testtask.push(newTask);
    clearForm();
    console.log(testtask)

}
function clearForm() {
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('date').value = '';
    document.getElementById('categorySpan').innerHTML = 'Select tasks category';
    subtasks = [];
    taskcontacts = [];
    prio = '';
    renderSubtask();
    showaAvailableContacts();
    showchosenInitials();
    prioUrgentSetBack();
    prioMedSetBack();
    prioLowSetBack();
} 