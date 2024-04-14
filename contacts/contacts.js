let currentContact;

let contactList = [
    {
        Name: "Max Mustermann",
        Email: "max.mustermann@example.com",
        Phone: "017611111111",

    },
    {
        Name: "Anna Schmidt",
        Email: "anna.schmidt@example.com",
        Phone: "017622222222",
    },
];


function init() {
    generateContactList();
}


function createContact() {

    let inputname = document.getElementById(`create_name`);
    let inputmail = document.getElementById(`create_mail`);
    let inputphone = document.getElementById(`create_phone`);

    let contact = {
        Name: inputname.value,
        Email: inputmail.value,
        Phone: inputphone.value,
    };

    contactList.push(contact);
    generateContactList();
    closeAddNewContactWindow();
}


function generateContactList() {

    let contactContainer = document.getElementById(`first_contact_under_container`);
    let lastChar = "";

    contactContainer.innerHTML = "";

    contactList.sort((a, b) => (a.Name.toUpperCase() > b.Name.toUpperCase()) ? 1 : -1);


    for (let i = 0; i < contactList.length; i++) {
        const contact = contactList[i];

        if (lastChar != contact.Name.charAt(0).toUpperCase()) {
            contactContainer.innerHTML += `<div>${contact.Name.charAt(0).toUpperCase()}</div><hr>`;
            lastChar = contact.Name.charAt(0).toUpperCase();
        }

        contactContainer.innerHTML += `
        <div class="div_contact" id="div_contact_${i}" onclick="selectContact(${i})">
            <div class="contact_initials">${getInitials(contact.Name)}</div>
            <div class="name_email_div">    
                <div class="contact_name">${contact.Name}</div>
                <div class="contact_email">${contact.Email}</div>
            </div>
        </div>            
        `;
    }
}


function selectContact(i) {
    currentContact = contactList[i];
    let selectContact = document.getElementById(`div_contact_${i}`);

    clearSelect();

    selectContact.classList.add(`selected`);

    setContactInfo(currentContact);
}


function clearSelect() {
    let list = document.getElementsByClassName(`div_contact`);

    for (let i = 0; i < list.length; i++) {
        const element = list[i];

        element.classList.remove(`selected`);
    }
}


function setContactInfo(contact) {
    let nameDiv = document.getElementById(`name_div_big`);
    let emailDiv = document.getElementById(`email_optionen`);
    let phoneDiv = document.getElementById(`phone_optionen`);
    let initialDiv = document.getElementById(`name_div_small`);

    nameDiv.innerHTML = contact.Name;
    emailDiv.innerHTML = contact.Email;
    phoneDiv.innerHTML = contact.Phone;
    initialDiv.innerHTML = getInitials(contact.Name);

    document.getElementById(`second_contact_infos`).style.display = "flex";
}


function openAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "flex";
    clearInputs();
}

function openEditContactWindow() {
    document.getElementById(`edit_contact_container`).style.display = "flex";

}


function closeAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "none";

}
function closeEditContactWindow() {
    document.getElementById(`edit_contact_container`).style.display = "none";

}


function clearInputs() {
    let inputname = document.getElementById(`create_name`);
    let inputmail = document.getElementById(`create_mail`);
    let inputphone = document.getElementById(`create_phone`);

    inputname.value = "";
    inputmail.value = "";
    inputphone.value = "";
}


function deleteContact() {

    let index = contactList.findIndex(contact => contact.Name == currentContact.Name);

    contactList.splice(index, 1);

    document.getElementById(`second_contact_infos`).style.display = "none";

    generateContactList();
}

function editContact() {
    let nameDiv = document.getElementById(`edit_name`);
    let emailDiv = document.getElementById(`edit_mail`);
    let phoneDiv = document.getElementById(`edit_phone`);
    let initialDiv = document.getElementById(`profil_name_initialen`);

    nameDiv.value = currentContact.Name;
    emailDiv.value = currentContact.Email;
    phoneDiv.value = currentContact.Phone;
    initialDiv.innerHTML = getInitials(currentContact.Name);

    openEditContactWindow();
}

function updateContact() {

    let name = document.getElementById(`edit_name`).value;
    let email = document.getElementById(`edit_mail`).value;
    let phone = document.getElementById(`edit_phone`).value;

    currentContact.Name = name;
    currentContact.Email = email;
    currentContact.Phone = phone;

    setContactInfo(currentContact);

    generateContactList();
}