function editTask(i) {
    cardPopup.style.height = '750px';

    cardPopup.innerHTML = /* html */`
        <div class="scrollableCardPopup">
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
                <div id="closeAndDone${i}" class="closeAndDone">
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