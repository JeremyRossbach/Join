
let categorys = [
    'Technical Task', 'User Story'
]




function dropDownContacts() {
    document.getElementById("myDropdown").classList.toggle("show");
    arrowChange()
}
function dropDownCategory() {
    document.getElementById("drop_down_category").classList.toggle("show");
    arrowChangeCategory()
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
    let contacts = contactData
    availableContacts.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let backgroundColor = colorPool[i % colorPool.length];
        availableContacts.innerHTML +=
        /*html*/`<div id='contactBTN${i}'class="contactBTN" onclick='chosenContacts(${i})'>
            <div class="initialsAndContacts">
             <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(contact.name)}</div>
            <div id="contacts${i}">${contact['name']} </div></div>
            <img id="selectionBox${i}" src="img/selectionbox unclicked.svg" alt="">
        </div>
        `
    }
}
function chosenContacts(i) {
    let contact = contacts[i];
    let backgroundColor = colorPool[i % colorPool.length];
    let chosenInitals = document.getElementById("chosenInitals");
    let selectionBox = document.getElementById(`selectionBox${i}`)
    let clickedContactBTN = document.getElementById(`contactBTN${i}`);
    clickedContactBTN.style = "background-color:rgb(42,54,71);";
    selectionBox.src = "img/selectionbox clicked.svg"
    chosenInitals.innerHTML =/*html*/`aso
<div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(contact.name)}</div>
    
`}