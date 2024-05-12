
let categorys;
let taskcontacts = [];
let currentContact;
let prio;
let subtasks = ['test',];
let selectedContackts = [];
let currentNames = [];

function initAddTasks() {
    currentNames = contactData;
    loadSubtasks();
    renderSubtask();
    showaAvailableContacts();
}


function dropDownContacts() {
    document.getElementById("contacts_dropdown").classList.toggle("show");
    let selectSpan = document.getElementById('selectSpan');
    arrowChange();
    if (selectSpan.classList.contains('noDisplay')){
       //closeFindInput()
    } else {
        openFindInput()

    }
   
}


function openFindInput() {
    document.getElementById('filterContatcsInput').classList.remove('noDisplay');
    document.getElementById('selectSpan').classList.add('noDisplay');

}

function closeFindInput() {
    let filterContatcsInput = document.getElementById("filterContatcsInput");
    let selectSpan = document.getElementById('selectSpan');


   
        filterContatcsInput.classList.add('noDisplay');
        selectSpan.classList.remove('noDisplay');
  
}


function dropDownCategory() {
    document.getElementById('availableCategory').classList.toggle("show");
    arrowChangeCategory();
}

function closeCategoryDropdowns() {
    var dropdowns = document.getElementsByClassName("availableCategory");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            arrowChangeCategory();
        }
    }
}

// Funktion zum Schließen des Dropdown-Menüs und Ändern des Pfeils für Kontakte
function closeContactsDropdowns() {
    var dropdowns = document.getElementsByClassName("contactsDropdown");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            arrowChange();
            //closeFindInput();
        }
    }
}

// Event-Handler für das Klicken auf das Fenster
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        closeCategoryDropdowns();
        // Überprüfen, ob der Klick innerhalb von #availableContacts war
        var availableContacts = document.getElementById("availableContacts");
        if (availableContacts.contains(event.target)) {
            return; // Keine weiteren Aktionen ausführen
        }
        closeContactsDropdowns();
    }
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
    let contacts = currentNames
    availableContacts.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let currentContact = contacts[i];
        let backgroundColor = colorPool[i % colorPool.length];
        availableContacts.innerHTML +=
        /*html*/`<div id='contactBTN${i}'class="contactBTN" onclick='chosenContacts(${i},currentContact)'>
            <div class="initialsAndContacts">
             <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(currentContact.name)}</div>
            <div id="contacts">${currentContact['name']} </div></div>
            <img id="selectionBox${i}" src="img/selectionbox unclicked.svg" alt="">
        </div>
        `
    }
}


function chosenContacts(i, currentContact) {
    let chosenContact = currentNames[i];
    let selectionBox = document.getElementById(`selectionBox${i}`);
    let ContactBTN = document.getElementById(`contactBTN${i}`);
    let unclicked_background = "white";
    let clicked_background = "#2A3647";
    let selection_box_unclicked = "img/selectionbox unclicked.svg";
    let selection_box_clicked = "img/selectionbox clicked.svg";
    if (selectionBox.getAttribute('src') == selection_box_unclicked) {
        selectionBox.setAttribute('src', selection_box_clicked);
        ContactBTN.style.backgroundColor = clicked_background;
        ContactBTN.classList.add('contact-btn-color');
        ContactBTN.classList.remove('contact-btn-color-hover');
    } else {
        ContactBTN.classList.remove('contact-btn-color');
        selectionBox.src = selection_box_unclicked;
        ContactBTN.style.backgroundColor = unclicked_background;
        ContactBTN.classList.add('contact-btn-color-hover');
    }
    chosenContactsPush(i, selection_box_clicked);
}

function chosenContactsPush(i, selection_box_clicked) {
    let selectionBox = document.getElementById(`selectionBox${i}`);
    let chosenContact = currentNames[i];

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



function findContact() {
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

function findContact() {
    document.getElementsByClassName('contactBTN').innerHTML = '';

    let search = document.getElementById('filterContatcsInput').value;
    search = search.toLowerCase();

    for (let n = 0; n < currentNames.length; n++) {
        renderContact(search, n);
    }
}


function renderContact(search, n) {
    if (currentNames['name'].toLowerCase().includes(search)) {
        showaAvailableContacts(n);
    }
}