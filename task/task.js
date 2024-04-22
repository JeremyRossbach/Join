
let categorys = [
    'Technical Task', 'User Story'
]
let taskcontacts = []
 let currentContact;



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
    if( selectionBox.getAttribute('src') == selection_box_unclicked){
        selectionBox.setAttribute('src',selection_box_clicked)
        ContactBTN.setAttribute('style',clicked_background)
        //taskcontacts.push(chosenContact['name'])
    }else{
        selectionBox.src = selection_box_unclicked;
        ContactBTN.style = unclicked_background;
        //taskcontacts.splice(i,1);
    }
    chosenContactsPush(i, selection_box_clicked )
    
}
//function chosenContactsPush(i, selection_box_clicked){
    //let index = taskcontacts.indexOf(chosenContact);
  //  let selectionBox = document.getElementById(`selectionBox${i}`)
   // let chosenContact = contactData[i];
   // if (selectionBox.getAttribute('src') == selection_box_clicked){
    //    taskcontacts.push(chosenContact['name'])
    //}else{
    //    taskcontacts.splice(i, 1);
    //}

    //console.log(taskcontacts)
//}
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
    showchosenInitials()
    console.log(taskcontacts);
}
function showchosenInitials(){
    let chosenInitals = document.getElementById('chosenInitals');
    chosenInitals.innerHTML = ""
    for (let index = 0; index < taskcontacts.length; index++) {
        const taskcontact = taskcontacts[index];
        let backgroundColor = colorPool[index % colorPool.length];
        chosenInitals.innerHTML = /*html*/`
            <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(taskcontact)}</div>
        `
    }
}
