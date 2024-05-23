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
            <img onclick="checkbox(${i}, ${l})" id="checkBoxButton${l}" class="checkboxImage" src="./img/checkbox.svg">
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
        checkbox.src = './img/checkbox_clicked.svg';
    } else {
        tasks[i]['doneSubtask'][l] = true;
        checkbox.src = './img/checkbox.svg';
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
    /* location.reload(); */
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
    saveTasks(); /* muss noch ersetzt werden */
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

    saveTasks(); /* muss noch ersetzt werden */
    emptyContentSections();
    init();
}


/* function highlight(id) {
    let sectionHighlight = document.getElementById(id + 'Highlight');
    console.log('Highlight: ', sectionHighlight);
    sectionHighlight.style.display = 'flex';
}


function removeHighlight(id) {
    let sectionHighlight = document.getElementById(id + 'Highlight');
    sectionHighlight.style.display = 'none';
} */


function highlight(id) {
    let sectionHighlight = document.getElementById(id + 'Highlight');
    if (sectionHighlight && sectionHighlight.style.display !== 'flex') {
        console.log('Highlight: ', sectionHighlight);
        sectionHighlight.style.display = 'flex';
    }
}


function removeHighlight(id) {
    let sectionHighlight = document.getElementById(id + 'Highlight');
    if (sectionHighlight && sectionHighlight.style.display !== 'none') {
        console.log('Highlight: ', sectionHighlight);
        sectionHighlight.style.display = 'none';
    }
}


/* let dragCounter = 0;


function setupDragAndDrop(id) {
    let dropZone = document.getElementById(id);
    let highlightElement = document.getElementById(id + 'Highlight');

    dropZone.addEventListener('dragenter', (event) => {
        event.preventDefault();
        dragCounter++;
        if (dragCounter === 1) {
            highlightElement.style.display = 'flex';
        }
    });

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault(); // Necessary to allow a drop
    });

    dropZone.addEventListener('dragleave', () => {
        dragCounter--;
        if (dragCounter === 0) {
            highlightElement.style.display = 'none';
        }
    });

    dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
        dragCounter = 0;
        highlightElement.style.display = 'none';
        // Handle the drop action here
    });
}

// Call this function for each drop zone
setupDragAndDrop('toDoSection');
setupDragAndDrop('inProgressSection');
setupDragAndDrop('awaitFeedbackSection');
setupDragAndDrop('doneSection'); */