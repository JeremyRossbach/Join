function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
   
}


function showaAvailableContacts() {
    let availableContacts = document.getElementById("availableContacts");
    let contacts = contactData
    availableContacts.innerHTML='';
    for (let i = 0; i < contacts.length; i++) {
        const element = contacts[i];
        availableContacts.innerHTML+= /*html*/`<div class="contactBTN">
            
        
            <div id="contacts${i}">${element['name']} </div>
            <img src="img/selectionbox unclicked.svg" alt="">
        </div>
        `
    }
}