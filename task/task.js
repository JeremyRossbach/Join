
let categorys;
let taskcontacts = [];
let currentContact;
let prio;
let subtasks = ['test',];
let selectedContackts = [];


function initAddTasks() {
    loadSubtasks();
    renderSubtask();
    //showaAvailableContacts();
}


function dropDownContacts() {
    let dropDown = document.getElementById("myDropdown");
    dropDown.classList.toggle("show");
    arrowChange();
}


function dropDownCategory() {
    document.getElementById('availableCategory').classList.toggle("show");
    arrowChangeCategory();
}


function arrowChange() {
    let arrow = document.getElementById("arrow");
    let arrowDown = "img/arrow down.svg";
    let arrowUp = "img/arrow up.svg";
    if (arrow.getAttribute('src') == arrowDown) {
        arrow.setAttribute('src', arrowUp);
    } else {
        arrow.src = arrowDown
    }
}

function arrowChangeCategory() {
    let arrow = document.getElementById("arrow_category");
    let arrowDown = "img/arrow down.svg";
    let arrowUp = "img/arrow up.svg";
    if (arrow.getAttribute('src') == arrowDown) {
        arrow.setAttribute('src', arrowUp);
    } else {
        arrow.src = arrowDown
    }

}

function showaAvailableContacts() {
    let availableContacts = document.getElementById("availableContacts");
    let contacts = contactData;
    availableContacts.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let currentContact = contacts[i];
        let backgroundColor = colorPool[i % colorPool.length];
        availableContacts.innerHTML +=
        /*html*/`<div id='contactBTN${i}'class="contactBTN" onclick='chosenContacts(${i},currentContact)'>
            <div class="initialsAndContacts">
             <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(currentContact.name)}</div>
            <div id="contacts${i}">${currentContact['name']} </div></div>
            <img id="selectionBox${i}" src="img/selectionbox unclicked.svg" alt="">
        </div>
        `
    }
}


function chosenContacts(i, currentContact) {
    let chosenContact = contactData[i];
    let selectionBox = document.getElementById(`selectionBox${i}`)
    let ContactBTN = document.getElementById(`contactBTN${i}`);
    let unclicked_background = "background-color: rgb(255, 255, 255);";
    let clicked_background = "background-color:rgb(42,54,71);";
    let selection_box_unclicked = "img/selectionbox unclicked.svg";
    let selection_box_clicked = "img/selectionbox clicked.svg";
    if (selectionBox.getAttribute('src') == selection_box_unclicked) {
        selectionBox.setAttribute('src', selection_box_clicked)
        ContactBTN.setAttribute('style', clicked_background)

    } else {
        selectionBox.src = selection_box_unclicked;
        ContactBTN.style = unclicked_background;

    }
    chosenContactsPush(i, selection_box_clicked)
    console.log(taskcontacts);
}

function chosenContactsPush(i, selection_box_clicked) {
    let selectionBox = document.getElementById(`selectionBox${i}`);
    let chosenContact = contactData[i];

    if (selectionBox.getAttribute('src') == selection_box_clicked) {
        if (!taskcontacts.includes(chosenContact['name'])) {
            taskcontacts.push(chosenContact['name']);
        }
    } else {
        let index = taskcontacts.indexOf(chosenContact['name']);
        if (index > -1) {
            taskcontacts.splice(index, 1);
        }
    }
    showchosenInitials(i)
    
}


function showchosenInitials(i) {
    let chosenInitals = document.getElementById('chosenInitals');
    chosenInitals.innerHTML = ""
    for (let index = 0; index < taskcontacts.length; index++) {
        const taskcontact = taskcontacts[index];
        let backgroundColor = colorPool[index % colorPool.length];
        chosenInitals.innerHTML += /*html*/`
            
       
            <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(taskcontact)}</div>
        `
    }
}


function prioUrgent() {
    let highicon = document.getElementById("highicon");
    let urgentbtn = document.getElementById('urgentbtn');
    let clickedhighicon = "img/Prio high icon clicked.svg"
    let unclickedhighicon = "img/Prio high icon.svg"
    if (highicon.getAttribute('src') == unclickedhighicon) {
        highicon.setAttribute('src', clickedhighicon)
        urgentbtn.style.background = 'rgb(255, 61, 0)';
        urgentbtn.style.color = '#FFFFFF';
        prio ='Urgent';
        prioMedSetBack()
        prioLowSetBack()
    } else {
        highicon.src = unclickedhighicon
        urgentbtn.style.background = '#FFFFFF';
        urgentbtn.style.color = 'black';
    }
}


function prioMed() {
    let medbtn = document.getElementById('midbtn');
    let medicon = document.getElementById('midicon');
    let unclickedmidicon = 'img/Prio medi icon.svg'
    let clickedmidicon = "img/Prio media icon clicked.svg"
    if (medicon.getAttribute('src') == unclickedmidicon) {
        medicon.setAttribute('src', clickedmidicon)
        medbtn.style.background = 'rgb(255,168,0)';
        medbtn.style.color = '#FFFFFF';
        prio = 'Medium';
        prioLowSetBack()
        prioUrgentSetBack()
    } else {
        medicon.src = unclickedmidicon
        medbtn.style.background = '#FFFFFF';
        medbtn.style.color = 'black';
    }
}


let lowbtn = document.getElementById('lowbtn');
let lowicon = document.getElementById("lowicon");
let unclickedlowcon = "img/Prio low icon.svg";
let clickedlowicon = "img/Prio low icon clicked.svg";


function prioLow() {
    let lowicon = document.getElementById("lowicon");
    let lowbtn = document.getElementById('lowbtn');

    if (lowicon.getAttribute('src') == unclickedlowcon) {
        lowicon.setAttribute('src', clickedlowicon);
        lowbtn.style.background = 'rgb(122,226,41)';
        lowbtn.style.color = '#FFFFFF';
        prio = 'Low';
        prioMedSetBack()
        prioUrgentSetBack()
    } else {
        lowicon.src = unclickedlowcon;
        lowbtn.style.background = '#FFFFFF';
        lowbtn.style.color = 'black';
    }
}


function prioLowSetBack() {
    let lowbtn = document.getElementById('lowbtn');
    let lowicon = document.getElementById("lowicon");
    let unclickedlowcon = "img/Prio low icon.svg";

    lowicon.src = unclickedlowcon;
    lowbtn.style.background = '#FFFFFF';
    lowbtn.style.color = 'black';
}


function prioMedSetBack() {
    let medbtn = document.getElementById('midbtn');
    let medicon = document.getElementById('midicon');
    let unclickedmidicon = 'img/Prio medi icon.svg'

    medicon.src = unclickedmidicon
    medbtn.style.background = '#FFFFFF';
    medbtn.style.color = 'black';
}


function prioUrgentSetBack() {
    let highicon = document.getElementById("highicon");
    let urgentbtn = document.getElementById('urgentbtn');
    let unclickedhighicon = "img/Prio high icon.svg"

    highicon.src = unclickedhighicon
    urgentbtn.style.background = '#FFFFFF';
    urgentbtn.style.color = 'black';
}


function technicalTask() {
    let categorySpan = document.getElementById('categorySpan');
    categorySpan.innerHTML = "Technikal Task";
    categorys = "Technikal Task";
}


function userStory() {
    let categorySpan = document.getElementById('categorySpan');
    categorySpan.innerHTML = "User Story";
    categorys = "User Story";
}

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

    // Erstelle ein Objekt für die neue Aufgabe
    let newTask = {
        'title': titleInput,
        'description': descriptionInput,
        'assignedTo': taskcontacts, // Annahme: selectedContackts enthält die ausgewählten Kontakte
        'dueDate': date,
        'prio': prio,
        'category': categorys,
        'subtask': subtasks,
        'doneSubtask': subtasks.map(() => false), // Annahme: keine der Teilaufgaben ist erledigt
        'numberOfDoneSubtasks': 0,
        'section': 'To do' // Annahme: neue Aufgaben werden der Sektion "To do" hinzugefügt
    };

    // Füge die neue Aufgabe dem tasks-Array hinzu
    testtask.push(newTask);

    // Leere die Eingabefelder
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('date').value = '';

    // Leere die Arrays subtasks und taskcontacts
    subtasks = [];
    taskcontacts = [];

    // Setze prio und category zurück
    prio = null; // oder den ursprünglichen Standardwert
    categorys = null; // oder den ursprünglichen Standardwert
    renderSubtask();
    showaAvailableContacts();
    showchosenInitials();
    prioUrgentSetBack();
    prioMedSetBack();
    prioLowSetBack();
}