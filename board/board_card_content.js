const prioImages = {
    'Urgent': './img/urgent.png',
    'Medium': './img/medium.png',
    'Low': './img/low.png'
};


let currentDraggedElement;


function focusOnFindTask() {
    document.getElementById('input').focus();
}


function init() {
    renderContent('To do', 'toDoContent');
    renderContent('In progress', 'inProgressContent');
    renderContent('Await Feedback', 'awaitFeedbackContent');
    renderContent('Done', 'doneContent');
}


/** 
 * This function renders the content of the JSON tasks
 * 
 * @param {string} section - This is the section of each task
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in
 */
function renderContent(section, containerId) {
    for (let i = 0; i < tasks.length; i++) {
        showContent(section, containerId, i);
    }
}


/**
 * This function is responsible for putting the tasks in the right section
 * 
 * @param {string} section - This is the section of each task
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in 
 * @param {number} i - This is the number of each task
 */
function showContent(section, containerId, i) {
    if (tasks[i]['section'] === section) {
        checkContent(containerId, i);
        renderCategoryColor(i);
    }
}


/**
 * 
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in  
 * @param {number} i - This is the number of each task 
 */
function checkContent(containerId, i) {
    checkEmptySection(containerId);
    content(containerId, i);
}


/**
 * This function removes the empty section containers
 * 
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in   
 */
function checkEmptySection(containerId) {
    document.getElementById('empty' + containerId + 'Section').style.display = 'none';
}


/**
 * This function shows the content of the JSON tasks
 * 
 * @param {string} containerId - This is one part of the name (containerId + 'Section') of the container where the taskcards are in   
 * @param {number} i - This is the number of each task
 */
function content(containerId, i) {
    let container = document.getElementById(containerId);

    container.innerHTML += /* html */`
        <div onclick="showCardPopup(${i})" draggable="true" ondragstart="startDragging(${i})" id="card${i}" class="card">
            <div id="category${i}" class="category">${tasks[i]['category']}</div>
            <div class="titleAndDescription">
                <div class="title">${tasks[i]['title']}</div>
                <div class="description">${tasks[i]['description']}</div>
            </div>
            <div id="progressbarAndSubtask${i}" class="progressbarAndSubtask">
                <div id="progressbar${i}" class="progressbar"><div id="progress${i}" class="progress"></div></div>
                <div id="subtasks${i}" class="subtasks"><div id="subtask${i}" class="subtask"></div></div>
            </div>
            <div id="progressComment${i}" class="progressComment">${tasks[i]['numberOfDoneSubtasks']} von ${tasks[i]['subtask'].length} Subtasks erledigt</div>
            <div class="cardBottom">
                <div id="assignedTo${i}" class="assignedTo"></div>
                <div id="prio${i}" class="prio"></div>
            </div>
        </div>
    `;
    renderProgressbar(i);
    renderSubtasks(i);
    renderPrio(i);
    renderAssignedTo(i);
    saveTasks();
}


/**
 * This function checks whether the task has subtasks or not
 * 
 * @param {number} i - This is the number of each task
 */
function renderProgressbar(i) {
    let progressbar = document.getElementById(`progressbar${i}`);
    let progressbarAndSubtask = document.getElementById(`progressbarAndSubtask${i}`);

    if (tasks[i]['subtask'] == null || tasks[i]['subtask'][0] == undefined) {
        progressbar.style.display = 'none';
    } else {
        progressbarAndSubtask.style.marginBottom = '24px';
    }
}


/**
 * This function checks whether the task has subtasks or not, and if it has, it shows the number of subtasks and how many are done
 * 
 * @param {number} i - This is the number of each task 
 */
function renderSubtasks(i) {
    let subtasks = document.getElementById(`subtask${i}`);

    if (tasks[i]['subtask'] == null || tasks[i]['subtask'][0] == undefined) {
        subtasks.style.display = 'none';
    } else {
        subtasks.innerHTML = /* html */`
        <div>${tasks[i]['numberOfDoneSubtasks']}/${tasks[i]['subtask'].length} Subtasks</div>
    `;
        renderProgress(i);
    }
}


/**
 * This function shows the progress of the progressbar
 * 
 * @param {number} i - This is the number of each task  
 */
function renderProgress(i) {
    let progress = document.getElementById(`progress${i}`);

    let width = 128 / `${tasks[i]['subtask'].length}` * tasks[i]['numberOfDoneSubtasks'];

    progress.style.width = width + 'px';
}


/**
 * This function renders and shows the priority of each task
 * 
 * @param {number} i - This is the number of each task
 */
function renderPrio(i) {
    let prio = document.getElementById(`prio${i}`);

    if (prioImages.hasOwnProperty(tasks[i]['prio'])) {
        prio.innerHTML += `<img class="prioImage" src="${prioImages[tasks[i]['prio']]}">`;
    }
}


/**
 * This function renders the initials of each person who is assigned to each task
 * 
 * @param {number} i - This is the number of each task
 */
function renderAssignedTo(i) {
    for (let j = 0; j < tasks[i]['assignedTo'].length; j++) {
        let name = tasks[i]['assignedTo'];
        let initials = name[j].split(' ')[0].charAt(0) + name[j].split(' ')[1].charAt(0);
        showAssignedTo(initials, i, j);
    }
}


/**
 * This function shows the initials of each person how is assigned to each task
 * 
 * @param {string} initials - These are the initials of each person who is assigned to a task
 * @param {number} i - This is the number of each task 
 * @param {number} j - This is the number of each person who is assigned to a task
 */
function showAssignedTo(initials, i, j) { /* solution for random colors missing ! */
    let assignedTo = document.getElementById(`assignedTo${i}`);
    let backgroundColor = colorPool[j % colorPool.length];
    assignedTo.innerHTML += /* html */`
            <div id="initals${j}" class="initials" style="background-color: ${backgroundColor};">${initials}</div>
        `;
}


/**
 * This function renders the color of the category of each task
 * 
 * @param {number} i - This is the number of each task  
 */
function renderCategoryColor(i) {
    let content = document.getElementById(`category${i}`);
    if (tasks[i]['category'] === 'Technical Task') {
        content.style.backgroundColor = '#1FD7C1';
    } else {
        content.style.backgroundColor = '#0038FF';
    }
}


/**
 * This function shows the card popup of each card
 * 
 * @param {number} i - This is the number of each task   
 */
function showCardPopup(i) {
    document.body.style.overflow = 'hidden';
    document.getElementById('background').style.display = 'flex';

    cardPopup.innerHTML = /* html */`
        <div class="popupCategoryAndClose">
            <div id="popupCategory${i}" class="popupCategory">${tasks[i]['category']}</div>
            <img onclick="slideOut()" class="closeImage" src="./img/close.png">
        </div>
        <div class="popupTitle">${tasks[i]['title']}</div>
        <div class="popupDescription">${tasks[i]['description']}</div>
        <div class="popupDueDate">
            <p class="dueDate">Due date:</p>
            <div class="date">${tasks[i]['dueDate']}</div>
        </div>
        <div class="popupPriority">
            <p class="priority">Priority:</p>
            <div class="priorityAndImage">
                <div>${tasks[i]['prio']}</div>
                <div id="popupPrio${i}"></div>
            </div>
        </div>
        <div class="popupAssignedTo">
            <p class="assignedToText">Assigned To:</p>
            <div id="popupAssignedTo${i}" class="popupAssignedToContent"></div>
        </div>
        <div id="popupSubtasks${i}" class="popupSubtasks">
            <p id="popupSubtasksText${i}" class="popupSubtasksText">Subtasks</p>
            <div  id="popupSubtasks${i}" class="popupSubtasksContent"></div>
        </div>
        <div class="popupBottom">
            <button onclick="deleteTask(${i})" class="deleteButtonImage"></button>
            <div class="buttonSpacer"></div>
            <button onclick="editTask(${i})" class="editButtonImage"></button>
        </div>
    `;
    renderPopupCategoryColor(i);
    renderPopupPrio(i);
    renderPopupAssignedTo(i);
    renderPopupSubtasks(i);
    slideIn();
}


/**
 * This function renders and shows the color of the category of a specific task
 * 
 * @param {number} i - This is the number of each task  
 */
function renderPopupCategoryColor(i) {
    let content = document.getElementById(`popupCategory${i}`);
    if (tasks[i]['category'] === 'Technical Task') {
        content.style.backgroundColor = '#1FD7C1';
    } else {
        content.style.backgroundColor = '#0038FF';
    }
}


/**
 * This function renders and shows the priority of a specific task
 * 
 * @param {number} i - This is the number of each task 
 */
function renderPopupPrio(i) {
    let prio = document.getElementById(`popupPrio${i}`);

    if (prioImages.hasOwnProperty(tasks[i]['prio'])) {
        prio.innerHTML += `<img src="${prioImages[tasks[i]['prio']]}">`;
    }
}


/**
 * This function renders the initials of each person for a spacific task 
 * 
 * @param {number} i - This is the number of each task 
 */
function renderPopupAssignedTo(i) {
    for (let k = 0; k < tasks[i]['assignedTo'].length; k++) {
        let name = tasks[i]['assignedTo'];
        let initials = name[k].split(' ')[0].charAt(0) + name[k].split(' ')[1].charAt(0);
        showPopupAssignedTo(initials, i, k);
    }
}


/**
 * 
 * 
 * @param {string} initials - These are the initials of each person who is assigned to a task
 * @param {number} i - This is the number of each task 
 * @param {number} k - This is the number of each person who is assigned to a task
 */
function showPopupAssignedTo(initials, i, k) {
    let assignedTo = document.getElementById(`popupAssignedTo${i}`);
    let backgroundColor = colorPool[k % colorPool.length];

    assignedTo.innerHTML += /* html */`
        <div class="initialsAndName">
            <div id="initals${k}" class="popupInitials" style="background-color: ${backgroundColor};">${initials}</div>
            <div class="name">${tasks[i]['assignedTo'][k]}</div>
        </div>
    `;
}


/**
 * This function renders the subtasks of a specific task
 * 
 * @param {number} i - This is the number of each task 
 */
function renderPopupSubtasks(i) {
    if (tasks[i]['subtask'][0]) {
        for (let l = 0; l < tasks[i]['subtask'].length; l++) {
            showPopupSubtasks(i, l)
        }
    } else {
        document.getElementById(`popupSubtasks${i}`).style.display = 'none';
        document.getElementById(`popupSubtasksText${i}`).style.display = 'none';
    }
}


/**
 * 
 * 
 * @param {number} i - This is the number of each task 
 * @param {number} l - This is the number of each subtask of a specific task
 */
function showPopupSubtasks(i, l) {
    let subtasks = document.getElementById(`popupSubtasks${i}`);

    subtasks.innerHTML += /* html */`
        <div class="imageAndText">
            <img onclick="checkbox(${i}, ${l})" id="checkBoxButton${l}" class="checkboxImage" src="./img/checkbox.png">
            <div class="popupSubtaskText">${tasks[i]['subtask'][l]}</div>
        </div>
    `;
    renderCheckboxImage(i, l);
}


/**
 * This function renders and shows whether the checkbox is clicked or not
 * 
 * @param {number} i - This is the number of each task 
 * @param {number} l - This is the number of each subtask of a specific task
 */
function renderCheckboxImage(i, l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);

    if (tasks[i]['doneSubtask'][l] == false) {
        checkbox.src = './img/checkbox_clicked.png';
    } else {
        tasks[i]['doneSubtask'][l] = true;
        checkbox.src = './img/checkbox.png';
    }
}


/**
 * This function closes the card popup
 * 
 * @param {*} event - ???
 */
function closePopup(event) {
    document.body.style.overflow = '';
    cardPopup.style.height = '';
    document.getElementById('cardPopup').style.display = 'none';
    document.getElementById('background').style.display = 'none';
    if (event) {
        event.stopPropagation();
    }
    location.reload();
}


function dontClosePopup(event) {
    event.stopPropagation();
}


/**
 * This function deletes a task
 * 
 * @param {number} i - This is the number of each task 
 * @param {*} event - ???
 */
function deleteTask(i, event) {
    tasks.splice(i, 1);
    closePopup(event);
    saveTasks();
    emptyContentSections();
    init();
}


function slideIn() {
    let cardPopup = document.getElementById('cardPopup');
    cardPopup.classList.add('slideIn');
    setTimeout(() => {
        cardPopup.classList.remove('slideIn');
    }, 500);
    
    cardPopup.style.display = 'flex';
}


function slideOut() {
    let cardPopup = document.getElementById('cardPopup');
    cardPopup.classList.add('slideOut');
    setTimeout(() => {
        cardPopup.classList.remove('slideOut');
        closePopup();
    }, 100);
}


function startDragging(i) {
    currentDraggedElement = i;
}


function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * This function changes the section when a task is dragged into another section
 * 
 * @param {string} section - This is the section of each task 
 */
function moveTo(section) {
    tasks[currentDraggedElement]['section'] = section;

    saveTasks();
    emptyContentSections();
    init();
}


function highlight(id) {
    document.getElementById(id + 'Section').classList.add('drag-area-highlight');
}


function removeHighlight(id) {
    document.getElementById(id + 'Section').classList.remove('drag-area-highlight');
}