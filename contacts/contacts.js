let currentContact;

async function init() {    
    await loadContacts();
    generateContactList();
}


function createContact() {

    let inputname = document.getElementById(`create_name`);
    let inputmail = document.getElementById(`create_mail`);
    let inputphone = document.getElementById(`create_phone`);
    let contactReady = document.getElementById(`new_contact_ready`);
    let index = contactData.findIndex(contact => contact.email == inputmail.value);

    if (index != -1) {
        contactReady.style.display = "flex";

        return;
    }

    let contact = {
        name: inputname.value,
        email: inputmail.value,
        phoneNumber: inputphone.value,
    };

    contactData.push(contact);

    hideCreateContactMessage("new_contact_successfully_div");
    generateContactList();
    saveContact();
    closeAddNewContactWindow();
}


function generateContactList() {
    let contactContainer = document.getElementById(`first_contact_under_container`);
    let lastChar = "";

    contactContainer.innerHTML = "";

    contactData.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1);

    for (let i = 0; i < contactData.length; i++) {
        const contact = contactData[i];
        let select = "";

        if (currentContact) {
            select = contact.name == currentContact.name ? "selected" : "";
        }

        let backgroundColor = colorPool[i % colorPool.length];

        if (lastChar !== contact.name.charAt(0).toUpperCase()) {
            contactContainer.innerHTML += `<div class="alphabet_div">${contact.name.charAt(0).toUpperCase()}</div><hr>`;
            lastChar = contact.name.charAt(0).toUpperCase();
        }

        contactContainer.innerHTML += `
        <div class="div_contact ${select}" id="div_contact_${i}" onclick="selectContact(${i})">
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
}


function openAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "flex";
    clearInputs();
    document.body.style.overflow = "hidden";
    let contactReady = document.getElementById(`new_contact_ready`);
    contactReady.style.display = "none";
}


function openEditContactWindow() {
    document.getElementById(`edit_contact_container`).style.display = "flex";
    document.body.style.overflow = "hidden";

}


function closeAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "none";
    document.body.style.overflow = "auto";
}

function hideCreateContactMessage(messageID) {
    var messageDiv = document.getElementById(messageID);
    messageDiv.style.display = "flex";
    messageDiv.classList.add("animate");

    setTimeout(function () {
        removeClassAnimate(messageDiv);
    }, 5000);
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
    let index = contactData.findIndex(contact => contact.email == currentContact.email);
    let second_contact_infos = document.getElementById(`second_contact_infos`);
    contactData.splice(index, 1);

    second_contact_infos.style.display = "none";
    closeEditContactWindow();

    hideCreateContactMessage("delete_contact_successfully_div");
    hideMenuEditDeleteContainer();
    closeContactInfo();
    saveContact();
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
    let contactReady = document.getElementById(`edit_contact_ready`);

    contactReady.style.display = "none";
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
    let contactReady = document.getElementById(`edit_contact_ready`);
    let index = contactData.findIndex(contact => contact.email == email);

    if (index != -1 && currentContact.email != email) {
        contactReady.style.display = "flex";

        return;
    }

    currentContact.name = name;
    currentContact.email = email;
    currentContact.phoneNumber = phone;

    setContactInfo(currentContact);

    hideCreateContactMessage("edit_contact_successfully_div");
    closeEditContactWindow();
    saveContact();
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

function removeClassAnimate(messageDiv) {
    messageDiv.style.display = "none";
    messageDiv.classList.remove("animate");
}

function saveContact() {
    setItem('allContacts', contactData);
}

async function loadContacts() {
    var response = await getItem('allContacts');
    contactData = JSON.parse(response.data.value);
}