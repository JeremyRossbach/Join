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


function init(){
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

    contactContainer.innerHTML = "";

    for (let i = 0; i < contactList.length; i++) {
        const contact = contactList[i];

        contactContainer.innerHTML += `
        <div class="div_contact" id="div_contact_${i}" onclick="selectContact(${i})">
            <div>${contact.Name}</div>
            <div>${contact.Email}</div>
        </div>            
        `;
    }
}


function selectContact(i){
    const contact = contactList[i];    
    let selectContact = document.getElementById(`div_contact_${i}`);
    
    selectContact.classList.add(`selected`);
    /*  */

}


function openAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "flex";
    clearInputs();
}


function closeAddNewContactWindow() {
    document.getElementById(`new_contact_container`).style.display = "none";

}

function clearInputs() {
    let inputname = document.getElementById(`create_name`);
    let inputmail = document.getElementById(`create_mail`);
    let inputphone = document.getElementById(`create_phone`);

    inputname.value = "";
    inputmail.value = "";
    inputphone.value = "";
}