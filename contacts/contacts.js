let currentContact;

function init() {
    generateContactList();
}


function createContact() {

    let inputname = document.getElementById(`create_name`);
    let inputmail = document.getElementById(`create_mail`);
    let inputphone = document.getElementById(`create_phone`);

    let contact = {
        name: inputname.value,
        email: inputmail.value,
        phoneNumber: inputphone.value,
    };

    contactData.push(contact);
    generateContactList();
    closeAddNewContactWindow();
}


function generateContactList() {

    let contactContainer = document.getElementById(`first_contact_under_container`);
    let lastChar = "";

    contactContainer.innerHTML = "";

    contactData.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);


    for (let i = 0; i < contactData.length; i++) {
        const contact = contactData[i];
        let randomBackgroundColor = colorPool[Math.floor(Math.random() * colorPool.length)];

        if (lastChar != contact.name.charAt(0).toUpperCase()) {
            contactContainer.innerHTML += `<div class="alphabet_div">${contact.name.charAt(0).toUpperCase()}</div><hr>`;
            lastChar = contact.name.charAt(0).toUpperCase();
        }

        contactContainer.innerHTML += `
        <div class="div_contact" id="div_contact_${i}" onclick="selectContact(${i})">
            <div class="contact_initials" style="background-color: ${randomBackgroundColor};">${getInitials(contact.name)}</div>
            <div class="name_email_div">    
                <div class="contact_name">${contact.name}</div>
                <div class="contact_email">${contact.email}</div>
            </div>
        </div>            
        `;
    }
}


function selectContact(i) {
    currentContact = contactData[i];
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

    nameDiv.innerHTML = contact.name;
    emailDiv.innerHTML = contact.email;
    phoneDiv.innerHTML = contact.phoneNumber;
    initialDiv.innerHTML = getInitials(contact.name);

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

    let index = contactData.findIndex(contact => contact.name == currentContact.name);

    contactData.splice(index, 1);

    document.getElementById(`second_contact_infos`).style.display = "none";

    generateContactList();
}


function editContact() {
    let nameDiv = document.getElementById(`edit_name`);
    let emailDiv = document.getElementById(`edit_mail`);
    let phoneDiv = document.getElementById(`edit_phone`);
    let initialDiv = document.getElementById(`profil_name_initialen`);

    nameDiv.value = currentContact.name;
    emailDiv.value = currentContact.email;
    phoneDiv.value = currentContact.phoneNumber;
    initialDiv.innerHTML = getInitials(currentContact.name);

    openEditContactWindow();
}


function updateContact() {

    let name = document.getElementById(`edit_name`).value;
    let email = document.getElementById(`edit_mail`).value;
    let phone = document.getElementById(`edit_phone`).value;

    currentContact.name = name;
    currentContact.email = email;
    currentContact.phoneNumber = phone;

    setContactInfo(currentContact);

    generateContactList();
}