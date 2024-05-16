let testtask = [];

function createTask() {
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

    testtask.push(newTask);
    clearForm();
    console.log(testtask)
    putData("tasks", tasks)
        .then(response => console.log(response))
        .catch(error => console.error(error));
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

function toggleInputFieldDanger(inputElement, dangerTextElement, showError) {
    if (showError) {
        inputElement.classList.add('input-field-danger');
        dangerTextElement.style.display = '';
    } else {
        inputElement.classList.remove('input-field-danger');
        dangerTextElement.style.display = 'none';
    }
}

function validateTitleInput() {
    let titleInput = document.getElementById('titleInput');
    let dangerTexts = document.getElementsByClassName('danger-text');
    toggleInputFieldDanger(titleInput, dangerTexts[0], !titleInput.value);
}

function validateDateInput() {
    let dateInput = document.getElementById('date');
    let dangerTexts = document.getElementsByClassName('danger-text');
    toggleInputFieldDanger(dateInput, dangerTexts[1], !dateInput.value);
}

function validateCategoryInput() {
    let dropBtnCategory = document.getElementById("dropBtnCategory");
    let categoryDangerText = document.getElementById("categoryDangerText");
    toggleInputFieldDanger(categorys === null || categorys === undefined, categoryDangerText, true);
}

function alarmInput() {
    validateTitleInput();
    validateDateInput();
    validateCategoryInput();
}