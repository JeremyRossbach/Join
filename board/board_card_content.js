const prioImages = {
    'Urgent': './img/urgent.png',
    'Medium': './img/medium.png',
    'Low': './img/low.png'
};


function focusOnFindTask() {
    document.getElementById('input').focus();
}


function init() {
    renderContent('To do', 'toDoContent');
    renderContent('In progress', 'inProgressContent');
    renderContent('Await Feedback', 'awaitFeedbackContent');
    renderContent('Done', 'doneContent');
}


function renderContent(section, containerId) {
    for (let i = 0; i < tasks.length; i++) {
        showContent(section, containerId, i);
    }
}


function showContent(section, containerId, i) {
    if (tasks[i]['section'] === section) {
        checkContent(containerId, i);
        renderCategoryColor(i);
    }
}


function checkContent(containerId, i) {
    checkEmptySection(containerId);
    content(containerId, i);
}


function checkEmptySection(containerId) {
    document.getElementById('empty' + containerId + 'Section').style.display = 'none';
}


function content(containerId, i) {
    let container = document.getElementById(containerId);

    container.innerHTML += /* html */`
        <div onclick="showCardPopup(${i})" id="card${i}" class="card">
            <div id="category${i}" class="category">${tasks[i]['category']}</div>
            <div class="titleAndDescription">
                <div class="title">${tasks[i]['title']}</div>
                <div class="description">${tasks[i]['description']}</div>
            </div>
            <div id="progressbarAndSubtask${i}" class="progressbarAndSubtask">
                <div id="progressbar${i}" class="progressbar"><div id="progress${i}" class="progress"></div></div>
                <div id="subtasks${i}" class="subtasks"><div id="subtask${i}" class="subtask"></div></div>
            </div>
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


function renderProgressbar(i) {
    let progressbar = document.getElementById(`progressbar${i}`);
    let progressbarAndSubtask = document.getElementById(`progressbarAndSubtask${i}`);

    if (tasks[i]['subtask'] == null || tasks[i]['subtask'][0] == undefined) {
        progressbar.style.display = 'none';
    } else {
        progressbarAndSubtask.style.marginBottom = '24px';
    }
}


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


function renderProgress(i) {
    let progress = document.getElementById(`progress${i}`);

    let width = 128 / `${tasks[i]['subtask'].length}` * tasks[i]['numberOfDoneSubtasks'];

    progress.style.width = width + 'px';
}


function renderPrio(i) {
    let prio = document.getElementById(`prio${i}`);

    if (prioImages.hasOwnProperty(tasks[i]['prio'])) {
        prio.innerHTML += `<img class="prioImage" src="${prioImages[tasks[i]['prio']]}">`;
    }
}


function renderAssignedTo(i) {
    for (let j = 0; j < tasks[i]['assignedTo'].length; j++) {
        let name = tasks[i]['assignedTo'];
        let initials = name[j].split(' ')[0].charAt(0) + name[j].split(' ')[1].charAt(0);
        showAssignedTo(initials, i, j);
    }
}


function showAssignedTo(initials, i, j) { /* solution for random colors missing ! */
    let assignedTo = document.getElementById(`assignedTo${i}`);
    let backgroundColor = colorPool[j % colorPool.length];
    assignedTo.innerHTML += /* html */`
            <div id="initals${j}" class="initials" style="background-color: ${backgroundColor};">${initials}</div>
        `;
}


function renderCategoryColor(i) {
    let content = document.getElementById(`category${i}`);
    if (tasks[i]['category'] === 'Technical Task') {
        content.style.backgroundColor = '#1FD7C1';
    } else {
        content.style.backgroundColor = '#0038FF';
    }
}


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


function renderPopupCategoryColor(i) {
    let content = document.getElementById(`popupCategory${i}`);
    if (tasks[i]['category'] === 'Technical Task') {
        content.style.backgroundColor = '#1FD7C1';
    } else {
        content.style.backgroundColor = '#0038FF';
    }
}


function renderPopupPrio(i) {
    let prio = document.getElementById(`popupPrio${i}`);

    if (prioImages.hasOwnProperty(tasks[i]['prio'])) {
        prio.innerHTML += `<img src="${prioImages[tasks[i]['prio']]}">`;
    }
}


function renderPopupAssignedTo(i) {
    for (let k = 0; k < tasks[i]['assignedTo'].length; k++) {
        let name = tasks[i]['assignedTo'];
        let initials = name[k].split(' ')[0].charAt(0) + name[k].split(' ')[1].charAt(0);
        showPopupAssignedTo(initials, i, k);
    }
}


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


function renderCheckboxImage(i, l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);

    if (tasks[i]['doneSubtask'][l] == false) {
        checkbox.src = './img/checkbox_clicked.png';
    } else {
        tasks[i]['doneSubtask'][l] = true;
        checkbox.src = './img/checkbox.png';
    }
}


function closePopup() {
    document.body.style.overflow = '';
    cardPopup.style.height = '';
    document.getElementById('cardPopup').style.display = 'none';
    document.getElementById('background').style.display = 'none';
    event.stopPropagation();
}


function dontClosePopup(event) {
    event.stopPropagation();
}


function deleteTask(i) {
    tasks.splice(i, 1);
    closePopup();
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
    }, 500);
    closePopup();
}