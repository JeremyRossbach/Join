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
    let cardPopup = document.getElementById('cardPopup');
    cardPopup.style.display = 'flex';

    cardPopup.innerHTML = /* html */`
        <div class="popupCategoryAndClose">
            <div id="popupCategory${i}" class="popupCategory">${tasks[i]['category']}</div>
            <img onclick="closePopup()" class="closeImage" src="./img/close.png">
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


function editTask(i) {
    cardPopup.style.height = '750px';

    cardPopup.innerHTML = /* html */`
        <div class="overflow-y">
            <div class="editTaskCloseImage">
                <img onclick="closePopup()" class="closeImage" src="./img/close.png">
            </div>
            <div class="editTextAndInput">
                <p class="titleText">Title</p>
                <input id="editTitle${i}" class="editTitleInput editInputs" placeholder="Enter a title" type="text">
            </div>
            <div class="editDescriptionAndTextarea">
                <p class="descriptionText">Description</p>
                <textarea id="editDescription${i}" class="editDescriptionTextarea editInputs" placeholder="Enter a description" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="editDueDateAndInput">
                <p class="dueDateText">Due Date</p>
                <input id="editDueDate${i}" class="editDueDateInput editInputs" placeholder="dd/mm/yyyy" type="text" dateFormat onfocus="(this.type='date')" onblur="(this.type='text')">
            </div>
            <div class="editPriorityAndButtons">
                <p class="priorityText">Priority</p>
                <div class="priorityButtons">
                    <button onclick="editPrioButtonUrgent(${i})" id="urgentButton${i}" class="priorityButtonUrgent priorityButton">Urgent <img id="urgentImage${i}" src="./img/urgent.png"></button>
                    <button onclick="editPrioButtonMedium(${i})" id="mediumButton${i}" class="priorityButtonMedium priorityButton">Medium <img id="mediumImage${i}" src="./img/medium.png"></button>
                    <button onclick="editPrioButtonLow(${i})" id="lowButton${i}" class="priorityButtonLow priorityButton">Low <img id="lowImage${i}" src="./img/low.png"></button> 
                </div>
            </div>
            <div class="editAssignedToAndInput">
                <p class="editAssignedToText">Assigned To</p>
                <div class="editAssignedToInputAndArrow">
                    <input oninput="findContact(${i})" id="editAssignedTo" class="editAssignedToInput editInputs" placeholder="Select contacts to assign" type="text">
                    <img onclick="openDropdownMenu()" id="arrow" class="dropdownArrow" src="./img/dropdownArrow.png">
                </div>
                <div id="dropdownMenu"></div>
                <div id="editInitials${i}"></div>
            </div>
            <div class="editSubtasksAndInput">
                <p class="editSubtasksText">Subtasks</p>
                <div class="editSubtasksInputAndPlus">
                    <input onclick="focusOnNewSubtask(${i})" id="editSubtasks${i}" class="editSubtasksInput editInputs" placeholder="Add new subtask" type="text">
                    <img onclick="focusOnNewSubtask(${i})" id="plus" class="plus" src="./img/plus.png">
                    <div id="closeAndDone${i} closeAndDone" class="closeAndDone">
                        <img onclick="emptyInput(${i})" class="close" src="./img/close.png">
                        <div class="subtasksImageSpacer"></div>
                        <img onclick="createNewSubtask(${i})" class="done" src="./img/done.png">
                    </div>
                </div>
                <div id="editSubtasksList${i}"></div>
            </div>
        </div>
        <div class="editTaskOkButton">
            <button onclick="ok(${i})" id="okButton">Ok <img class="checkImage" src="./img/check.png"></button>
        </div>
    `;
    renderInputValues(i);
    renderValues(i);
    renderEditAssignedTo(i);
    renderEditSubtasksList(i);
    dropdownMenu(i);
}


function renderInputValues(i) {
    document.getElementById(`editTitle${i}`).value = `${tasks[i]['title']}`;
    document.getElementById(`editDescription${i}`).value = `${tasks[i]['description']}`;
    document.getElementById(`editDueDate${i}`).value = `${tasks[i]['dueDate']}`;
}


function renderValues(i) {
    let urgentButton = document.getElementById(`urgentButton${i}`);
    let urgentImage = document.getElementById(`urgentImage${i}`);
    let mediumButton = document.getElementById(`mediumButton${i}`);
    let mediumImage = document.getElementById(`mediumImage${i}`);
    let lowButton = document.getElementById(`lowButton${i}`);
    let lowImage = document.getElementById(`lowImage${i}`);

    if (tasks[i]['prio'] === 'Urgent') {
        urgentButton.style.backgroundColor = '#FF3D00';
        urgentButton.style.color = 'white';
        urgentImage.src = './img/urgentWhite.png';
    }
    if (tasks[i]['prio'] === 'Medium') {
        mediumButton.style.backgroundColor = '#FFA800';
        mediumButton.style.color = 'white';
        mediumImage.src = './img/mediumWhite.png';
    }
    if (tasks[i]['prio'] === 'Low') {
        lowButton.style.backgroundColor = '#7AE228';
        lowButton.style.color = 'white';
        lowImage.src = './img/lowWhite.png';
    }
}


function renderEditAssignedTo(i) {
    for (let o = 0; o < tasks[i]['assignedTo'].length; o++) {
        let name = tasks[i]['assignedTo'];
        let initials = name[o].split(' ')[0].charAt(0) + name[o].split(' ')[1].charAt(0);
        showEditAssignedTo(initials, i, o);
    }
}


function showEditAssignedTo(initials, i, o) {
    let assignedTo = document.getElementById(`editInitials${i}`);
    assignedTo.style.display = 'flex';
    assignedTo.style.gap = '8px';
    let backgroundColor = colorPool[o % colorPool.length];

    assignedTo.innerHTML += /* html */`
        <div class="editInitials">
            <div id="initals${o}" class="popupInitials" style="background-color: ${backgroundColor};">${initials}</div>
        </div>
    `;
}


function renderEditSubtasksList(i) {
    for (let p = 0; p < tasks[i]['subtask'].length; p++) {
        showEditSubtasksList(i, p);
    }
}


function showEditSubtasksList(i, p) {
    let subtasks = document.getElementById(`editSubtasksList${i}`);

    subtasks.innerHTML += /* html */`
        <div id="subtasksContent${p}" class="subtasksContent">
            <li>${tasks[i]['subtask'][p]}</li>
            <div class="deleteAndEdit">
                <img onclick="editSubtask(${p}, ${i})" class="editImage" src="./img/edit.png">
                <div class="subtasksImageSpacer"></div>
                <img onclick="deleteSubtask(${p}, ${i})" src="./img/delete.png">
            </div>
        </div>
    `;
}


function editPrioButtonUrgent(i) {
    let prio = 'Urgent';
    let urgentButton = document.getElementById(`urgentButton${i}`);
    let urgentImage = document.getElementById(`urgentImage${i}`);

    urgentButton.style.backgroundColor = '#FF3D00';
    urgentButton.style.color = 'white';
    urgentImage.src = './img/urgentWhite.png';

    disableMediumButton(i);
    disableLowButton(i);
    deleteAndPushPrio(i, prio);
}


function editPrioButtonMedium(i) {
    let prio = 'Medium';
    let mediumButton = document.getElementById(`mediumButton${i}`);
    let mediumImage = document.getElementById(`mediumImage${i}`);

    mediumButton.style.backgroundColor = '#FFA800';
    mediumButton.style.color = 'white';
    mediumImage.src = './img/mediumWhite.png';

    disableUrgentButton(i);
    disableLowButton(i);
    deleteAndPushPrio(i, prio);
}


function editPrioButtonLow(i) {
    let prio = 'Low';
    let lowButton = document.getElementById(`lowButton${i}`);
    let lowImage = document.getElementById(`lowImage${i}`);

    lowButton.style.backgroundColor = '#7AE228';
    lowButton.style.color = 'white';
    lowImage.src = './img/lowWhite.png';

    disableUrgentButton(i);
    disableMediumButton(i);
    deleteAndPushPrio(i, prio);
}


function disableUrgentButton(i) {
    let urgentButton = document.getElementById(`urgentButton${i}`);
    let urgentImage = document.getElementById(`urgentImage${i}`);
    let mediumImage = document.getElementById(`mediumImage${i}`);
    let lowImage = document.getElementById(`lowImage${i}`);

    if (mediumImage.src.includes('/img/mediumWhite.png') || lowImage.src.includes('/img/lowWhite.png')) {
        setUrgentButtonStyle(urgentButton, urgentImage);
    }
}


function setUrgentButtonStyle(button, image) {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
    image.src = './img/urgent.png';
}


function disableMediumButton(i) {
    let mediumButton = document.getElementById(`mediumButton${i}`);
    let mediumImage = document.getElementById(`mediumImage${i}`);
    let urgentImage = document.getElementById(`urgentImage${i}`);
    let lowImage = document.getElementById(`lowImage${i}`);

    if (urgentImage.src.includes('/img/urgentWhite.png') || lowImage.src.includes('/img/lowWhite.png')) {
        setMediumButtonStyle(mediumButton, mediumImage);
    }
}


function setMediumButtonStyle(button, image) {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
    image.src = './img/medium.png';
}


function disableLowButton(i) {
    let lowButton = document.getElementById(`lowButton${i}`);
    let lowImage = document.getElementById(`lowImage${i}`);
    let urgentImage = document.getElementById(`urgentImage${i}`);
    let mediumImage = document.getElementById(`mediumImage${i}`);

    if (urgentImage.src.includes('/img/urgentWhite.png') || mediumImage.src.includes('/img/mediumWhite.png')) {
        setLowButtonStyle(lowButton, lowImage);
    }
}


function setLowButtonStyle(button, image) {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
    image.src = './img/low.png';
}


function deleteAndPushPrio(i, prio) {
    tasks[i]['prio'] = null;
    tasks[i]['prio'] = prio;

    saveTasks();
}


function findContact(i) {
    document.getElementById('dropdownMenu').innerHTML = '';

    let search = document.getElementById('editAssignedTo').value;
    search = search.toLowerCase();

    for (let n = 0; n < contactData.length; n++) {
        renderContact(search, n, i);
    }
}


function renderContact(search, n, i) {
    if (contactData[n]['name'].toLowerCase().includes(search)) {
        showContact(n, i);
    }
}


function showContact(n, i) {
    let arrow = document.getElementById('arrow');
    let dropdownContainer = document.getElementById('dropdownMenu');
    dropdownContainer.style.display = 'flex';

    if (arrow.src.includes("/img/dropdownArrow.png")) {
        arrow.src = "./img/liftupArrow.png";
    }

    showDropdownMenu(n, i);
}


function dropdownMenu(i) {
    renderDropdownMenu(i);
}


function renderDropdownMenu(i) {
    for (let n = 0; n < contactData.length; n++) {
        showDropdownMenu(n, i);
    }
}


function showDropdownMenu(n, i) {
    let dropdownContainer = document.getElementById('dropdownMenu');

    dropdownContainer.innerHTML += /* html */`
        <div onclick="renderSelectedContact(${i}, ${n})" id="contact${n}" class="dropdownContent">
            <div class="dropdownInitialsAndName">
                <div id="dropdownInitials${n}"></div>
                <div class="dropdownContact">${contactData[n]['name']}</div>
            </div>
            <img id="dropdownCheckbox${n}" class="dropdownCheckbox" src="./img/checkbox.png">
        </div>
    `;
    renderDropdownInitials(n);
    renderAlreadySelectedContacts(n, i);
}


function renderDropdownInitials(n) {
    let name = contactData[n]['name'];
    let initials = name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0);
    showDropDownInitials(initials, n);
}


function showDropDownInitials(initials, n) {
    let assignedTo = document.getElementById(`dropdownInitials${n}`);
    let backgroundColor = colorPool[n % colorPool.length];

    assignedTo.innerHTML += /* html */`
        <div class="editInitials">
            <div id="initals${n}" class="popupInitials" style="background-color: ${backgroundColor};">${initials}</div>
        </div>
    `;
}


function renderAlreadySelectedContacts(n, i) {
    for (let o = 0; o < tasks[i]['assignedTo'].length; o++) {
        const contact = tasks[i]['assignedTo'][o];
        showAleardySelectedContact(contact, n);
    }
}


function showAleardySelectedContact(contact, n) {
    if (contact == contactData[n]['name']) {
        alreadySelectedContact(n);
    }
}


function alreadySelectedContact(n) {
    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = '#2B3647';
    contact.style.color = 'white'
    checkImage.src = './img/checkboxClickedWhite.png';
}


function renderSelectedContact(i, n) {
    if (!tasks[i]['assignedTo'].includes(contactData[n]['name'])) {
        selectedContact(i, n);
    } else {
        unselectContact(i, n);
    }
    document.getElementById(`editInitials${i}`).innerHTML = '';
    renderEditAssignedTo(i);
}


function selectedContact(i, n) {
    tasks[i]['assignedTo'].push(contactData[n]['name']);

    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = '#2B3647';
    contact.style.color = 'white'
    checkImage.src = './img/checkboxClickedWhite.png';

    saveTasks();
}


function unselectContact(i, n) {
    tasks[i]['assignedTo'].splice(n, 1); /* splice selected name not n */

    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = 'white';
    contact.style.color = 'black'
    checkImage.src = './img/checkbox.png';

    saveTasks();
}


function openDropdownMenu() {
    document.getElementById('dropdownMenu').style.display = 'flex';
    let arrow = document.getElementById('arrow');

    if (arrow.src.includes("/img/dropdownArrow.png")) {
        arrow.src = "./img/liftupArrow.png";
    } else {
        arrow.src = "./img/dropdownArrow.png";
        document.getElementById('dropdownMenu').style.display = 'none';
        document.getElementById('editAssignedTo').value = '';
    }
}


function editSubtask(p, i) {
    let subtasks = document.getElementById(`subtasksContent${p}`);
    subtasks.style.backgroundColor = 'white';

    subtasks.innerHTML = /* html */`
        <input required id="subtasksInputContent${p}" class="subtasksEditInput">
            <div class="deleteAndDone">
                <img onclick="doneEditSubtask(${p}, ${i})" src="./img/done.png">
                <div class="subtasksImageSpacer"></div>
                <img onclick="deleteSubtask(${p}, ${i})" src="./img/delete.png">
            </div>
        </div>
    `;
    document.getElementById(`subtasksInputContent${p}`).value = `${tasks[i]['subtask'][p]}`;
}


function deleteSubtask(p, i) {
    tasks[i]['subtask'].splice(p, 1);

    document.getElementById(`editSubtasksList${i}`).innerHTML = '';
    renderEditSubtasksList(i);

    saveTasks();
    emptyContentSections();
    init();
}


function doneEditSubtask(p, i) {
    let subtask = document.getElementById(`subtasksInputContent${p}`).value;

    tasks[i]['subtask'][p] = subtask;

    saveTasks();
    document.getElementById(`editSubtasksList${i}`).innerHTML = '';
    renderEditSubtasksList(i);
}


function createNewSubtask(i) {
    let inputValue = document.getElementById(`editSubtasks${i}`).value;

    if (!inputValue == '') {
        tasks[i]['subtask'].push(inputValue);
        document.getElementById(`editSubtasks${i}`).value = '';

        document.getElementById(`editSubtasksList${i}`).innerHTML = '';
        renderEditSubtasksList(i);

        noFocusOnNewSubtask(i);
    }
}


function focusOnNewSubtask(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.focus();

    document.getElementById(`closeAndDone${i}`).style.display = 'flex';
    document.getElementById('plus').style.display = 'none';
}


function noFocusOnNewSubtask(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.blur();
    document.getElementById(`closeAndDone${i}`).style.display = 'none';
    document.getElementById('plus').style.display = 'flex';

}


function emptyInput(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.focus();
    document.getElementById(`editSubtasks${i}`).value = '';
    noFocusOnNewSubtask(i);
}


function ok(i) {
    updateTitle(i);
    updateDescription(i);
    updateDueDate(i);
    saveTasks();
    emptyContentSections();
    init();
    document.getElementById('cardPopup').innerHTML = '';
    showCardPopup(i);
}


function updateTitle(i) {
    let title = document.getElementById(`editTitle${i}`).value;
    tasks[i]['title'] = null;
    tasks[i]['title'] = title;
}


function updateDescription(i) {
    let description = document.getElementById(`editDescription${i}`).value;
    tasks[i]['description'] = null;
    tasks[i]['description'] = description;
}


function updateDueDate(i) {
    let dueDate = document.getElementById(`editDueDate${i}`).value;
    tasks[i]['dueDate'] = null;
    tasks[i]['dueDate'] = dueDate;
}


function clickeddropdownCheckbox(l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);
    checkbox.src = "./img/checkbox_clicked.png";
}


function checkbox(i, l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);

    if (tasks[i]['doneSubtask'][l] == true) {
        tasks[i]['doneSubtask'][l] = false;
        tasks[i]['numberOfDoneSubtasks']++;
        clickedCheckbox(l);
    } else {
        tasks[i]['doneSubtask'][l] = true
        tasks[i]['numberOfDoneSubtasks']--;
        checkbox.src = "./img/checkbox.png"
    }
    saveTasks();
    renderSubtasks(i);
}


function clickedCheckbox(l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);
    checkbox.src = "./img/checkbox_clicked.png";
}


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