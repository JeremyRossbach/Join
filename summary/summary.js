let taskList = [
    {
        Title: "",
        Description: "",
        Due: "",
        Prio: "",
        Assigned: [

        ],
        Category: "",
        Subtasks: [

        ]
    }
];

function init() {
    showBoardInfos();
    displayGreeting();
}

function showBoardInfos() {
    let todoCounter = document.getElementById(`todo`);
    let doneCounter = document.getElementById(`done`);
    let urgentCounter = document.getElementById(`urgent`);
    let inprogressCounter = document.getElementById(`number_in_progress`);
    let totalCounter = document.getElementById(`number_in_board`);
    let awaitCounter = document.getElementById(`number_awaiting_feedback`);
    let date = document.getElementById(`date`);

    taskList.length;

    todoCounter.innerHTML = 1;
    doneCounter.innerHTML = 3;
    urgentCounter.innerHTML = 4;
    inprogressCounter.innerHTML = 1;
    totalCounter.innerHTML = taskList.length;
    awaitCounter.innerHTML = 2;
    date.innerHTML = new Date().toLocaleDateString('de-DE');   
}


function displayGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting = "";
    if (currentHour < 12) {
        greeting = "Good morning,";
    } else if (currentHour < 18) {
        greeting = "Good afternoon,";
    } else {
        greeting = "Good evening,";
    }
    
    const greetingDiv = document.getElementById("greet_info");
    greetingDiv.textContent = greeting;
}

