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

        // Hintergrundfarbe basierend auf dem Index des Kontakts
        let backgroundColor = colorPool[i % colorPool.length];

        if (lastChar !== contact.name.charAt(0).toUpperCase()) {
            contactContainer.innerHTML += `<div class="alphabet_div">${contact.name.charAt(0).toUpperCase()}</div><hr>`;
            lastChar = contact.name.charAt(0).toUpperCase();
        }

        contactContainer.innerHTML += `
        <div class="div_contact" id="div_contact_${i}" onclick="selectContact(${i})">
            <div class="contact_initials" style="background-color: ${backgroundColor};">${getInitials(contact.name)}</div>
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
    let contactInfo = document.getElementById(`second_contact_container`);
    let contactList = document.getElementById(`first_contact_container`);
    let second_contact_infos = document.getElementById(`second_contact_infos`);
    clearSelect();

    selectContact.classList.add(`selected`);
    contactInfo.classList.add(`selected`);
    contactList.classList.add(`selected`);
    second_contact_infos.style.display = "flex";

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

    /* document.getElementById(`second_contact_infos`).style.display = "flex"; */
}


function openAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "flex";
    clearInputs();
    document.body.style.overflow = "hidden";
}


function openEditContactWindow() {
    document.getElementById(`edit_contact_container`).style.display = "flex";
    document.body.style.overflow = "hidden";

}


function closeAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "none";
    document.body.style.overflow = "auto";
}


function closeEditContactWindow() {
    document.getElementById(`edit_contact_container`).style.display = "none";
    document.body.style.overflow = "auto";
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
    let second_contact_infos = document.getElementById(`second_contact_infos`);
    contactData.splice(index, 1);

    second_contact_infos.style.display = "none";
    closeEditContactWindow();

    hideMenuEditDeleteContainer();
    closeContactInfo();
    generateContactList();
}


function hideMenuEditDeleteContainer() {
    let menu_edit_delete_container = document.getElementById(`menu_edit_delete_container`);
    menu_edit_delete_container.style.display = "none";
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

    hideMenuEditDeleteContainer();
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


function closeContactInfo() {
    let contactInfo = document.getElementById(`second_contact_container`);
    let contactList = document.getElementById(`first_contact_container`);
    clearSelect();

    contactInfo.classList.remove(`selected`);
    contactList.classList.remove(`selected`);

    hideMenuEditDeleteContainer();
}


function menu_window() {
    let menuContainer = document.getElementById(`menu_edit_delete_container`);

    if (menuContainer.style.display == "none" || menuContainer.style.display == "") {
        menuContainer.style.display = "flex";
    } else {
        menuContainer.style.display = "none";
    }

} 