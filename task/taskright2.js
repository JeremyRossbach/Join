
function prioUrgent() {
    let highicon = document.getElementById("highicon");
    let urgentbtn = document.getElementById('urgentbtn');
    let clickedhighicon = "img/Prio high icon clicked.svg"
    let unclickedhighicon = "img/Prio high icon.svg"
    if (highicon.getAttribute('src') == unclickedhighicon) {
        highicon.setAttribute('src', clickedhighicon)
        urgentbtn.style.background = 'rgb(255, 61, 0)';
        urgentbtn.style.color = '#FFFFFF';
        urgentbtn.style.boxShadow = 'unset';
        prio = 'Urgent';
        prioMedSetBack()
        prioLowSetBack()
    } else {
        highicon.src = unclickedhighicon
        urgentbtn.style.background = '#FFFFFF';
        urgentbtn.style.color = 'black';
        urgentbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;';
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
        medbtn.style.boxShadow = 'unset';
        prio = 'Medium';
        prioLowSetBack()
        prioUrgentSetBack()
    } else {
        medicon.src = unclickedmidicon
        medbtn.style.background = '#FFFFFF';
        medbtn.style.color = 'black';
        medbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;';
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
        lowbtn.style.boxShadow = 'unset';
        prio = 'Low';
        prioMedSetBack()
        prioUrgentSetBack()
    } else {
        lowicon.src = unclickedlowcon;
        lowbtn.style.background = '#FFFFFF';
        lowbtn.style.color = 'black';
        lowbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;';
    }
}


function prioLowSetBack() {
    let lowbtn = document.getElementById('lowbtn');
    let lowicon = document.getElementById("lowicon");
    let unclickedlowcon = "img/Prio low icon.svg";

    lowicon.src = unclickedlowcon;
    lowbtn.style.background = '#FFFFFF';
    lowbtn.style.color = 'black';
    lowbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;';
}


function prioMedSetBack() {
    let medbtn = document.getElementById('midbtn');
    let medicon = document.getElementById('midicon');
    let unclickedmidicon = 'img/Prio medi icon.svg'

    medicon.src = unclickedmidicon
    medbtn.style.background = '#FFFFFF';
    medbtn.style.color = 'black';
    medbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;'
}


function prioUrgentSetBack() {
    let highicon = document.getElementById("highicon");
    let urgentbtn = document.getElementById('urgentbtn');
    let unclickedhighicon = "img/Prio high icon.svg"

    highicon.src = unclickedhighicon
    urgentbtn.style.background = '#FFFFFF';
    urgentbtn.style.color = 'black';
    urgentbtn.style += 'box-shadow: 0px 4px 4px 0px #00000040;'
}


function technicalTask() {
    let categorySpan = document.getElementById('categorySpan');
    categorySpan.innerHTML = "Technikal Task";
    categorys = "Technikal Task";
    createBtnEnable();
    alarmInput();
}


function userStory() {
    let categorySpan = document.getElementById('categorySpan');
    categorySpan.innerHTML = "User Story";
    categorys = "User Story";
    createBtnEnable();
    alarmInput();
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
