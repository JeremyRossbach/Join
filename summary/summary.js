let taskList = [
    {
        Title: "",
        Description: "",
        Due: "2024-04-17",
        Prio: "",
        Assigned: [

        ],
        Category: "",
        Subtasks: [

        ],
        Status: "",
    },
    {
        Title: "",
        Description: "",
        Due: "2024-03-12",
        Prio: "",
        Assigned: [

        ],
        Category: "",
        Subtasks: [

        ],
        Status: "done",
    },
    {
        Title: "",
        Description: "",
        Due: "2024-04-22",
        Prio: "urgent",
        Assigned: [

        ],
        Category: "",
        Subtasks: [

        ],
        Status: "",
    },
    {
        Title: "",
        Description: "",
        Due: "2024-02-18",
        Prio: "",
        Assigned: [

        ],
        Category: "",
        Subtasks: [

        ],
        Status: "inprogress",
    },

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

    totalCounter.innerHTML = taskList.length;

    // taskList wird nach status gefiltert und die Anzahl wird ausgegeben
    todoCounter.innerHTML = taskList.filter(task => task.Status == `todo`).length;
    doneCounter.innerHTML = taskList.filter(task => task.Status == `done`).length;
    inprogressCounter.innerHTML = taskList.filter(task => task.Status == `inprogress`).length;
    awaitCounter.innerHTML = taskList.filter(task => task.Status == `await`).length;
    // taskList wird nach prio gefiltert und die Anzahl wird ausgegeben
    urgentCounter.innerHTML = taskList.filter(task => task.Prio == `urgent`).length;

    let nextDateTasks = taskList.filter(task => task.Status != `done`).sort((a, b) => new Date(a.Due) - new Date(b.Due));

    date.innerHTML = new Date(nextDateTasks[0].Due).toLocaleDateString('de-DE');
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