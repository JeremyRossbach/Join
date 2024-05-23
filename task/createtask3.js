function createTask() {
    let titleInput = document.getElementById('titleInput');
    let descriptionInput = document.getElementById('descriptionInput');
    let date = document.getElementById('date');
    
    let task = {
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

    let user = getUser();
    user.tasks.push(task);
    saveUser(user);
    
    showCreateTaskMessage('task_successfully_div');
    clearForm();
    // saveTasks();
}


function showCreateTaskMessage(messageID) {
    /**
     * @type {HTMLElement}
     */
    var messageDiv = document.getElementById(messageID);
    messageDiv.style.display = "flex";
    messageDiv.classList.add("animate");

    setTimeout(function () {
        removeClassAnimate(messageDiv);
    }, 5000);
}


/**
 * Removes the "animate" class from a given element.
 * Entfernt die Klasse "animate" von einem bestimmten Element.
 * @param {HTMLElement} messageDiv - The message element to remove the class from.
 */
function removeClassAnimate(messageDiv) {
    messageDiv.style.display = "none";
    messageDiv.classList.remove("animate");
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
    createBtnEnable();
    subtaskOverflowCheck();
}

inputDateColorChange();
function inputDateColorChange() {
    let inputDate = document.getElementById('date');
    if (inputDate.value) {
        inputDate.style.color = 'black';
    } else {
        inputDate.style.color = 'grey';
    }
}

function createBtnEnable() {
    let alarmBTN = document.getElementById("alarmBTN");
    let createBTN = document.getElementById("createBTN");
    let date = document.getElementById('date');
    let titleInput = document.getElementById('titleInput');
    if (titleInput.value && date.value && categorys !== null && categorys !== undefined) {
        createBTN.classList.remove('noDisplay');
        alarmBTN.classList.add('noDisplay');
    } else {
        createBTN.classList.add('noDisplay');
        alarmBTN.classList.remove('noDisplay');
    }
}

function alarmInput() {
    let dropBtnCategory = document.getElementById("dropBtnCategory")
    let titleInput = document.getElementById('titleInput');
    let categoryDangerText = document.getElementById("categoryDangerText");
    let date = document.getElementById('date');
    let dangerTexts = document.getElementsByClassName('danger-text');
    if (!titleInput.value) {
        titleInput.classList.add('input-field-danger');
        dangerTexts[0].style.display = '';
    } else {
        titleInput.classList.remove('input-field-danger');
        dangerTexts[0].style.display = 'none';
    }

    if (!date.value) {
        date.classList.add('input-field-danger');
        dangerTexts[1].style.display = '';
    } else {
        date.classList.remove('input-field-danger');
        dangerTexts[1].style.display = 'none';
    }
    if (categorys !== null && categorys !== undefined) {
        dropBtnCategory.classList.remove('input-field-danger');
        categoryDangerText.style.display = 'none';

    } else {
        dropBtnCategory.classList.add('input-field-danger');
        categoryDangerText.style.display = '';
    }
}