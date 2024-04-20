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

    totalCounter.innerHTML = tasks.length;

    // tasks wird nach status gefiltert und die Anzahl wird ausgegeben
    todoCounter.innerHTML = tasks.filter(task => task.section == `To do`).length;
    doneCounter.innerHTML = tasks.filter(task => task.section == `Done`).length;
    inprogressCounter.innerHTML = tasks.filter(task => task.section == `In progress`).length;
    awaitCounter.innerHTML = tasks.filter(task => task.section == `Await Feedback`).length;
    // tasks wird nach prio gefiltert und die Anzahl wird ausgegeben
    urgentCounter.innerHTML = tasks.filter(task => task.prio == `Urgent`).length;

    let nextDateTasks = tasks.filter(task => task.section != `Done`).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    date.innerHTML = new Date(nextDateTasks[0].dueDate).toLocaleDateString('de-DE');
}


/* function displayGreeting() {
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
} */

function displayGreeting(buttonType) {
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

    if (buttonType === 'user') {
        const userName = prompt("Please enter your name:");
        if (userName) {
            greeting += ` ${userName}`;
        }
    }

    document.getElementById("greet_info").textContent = greeting;
}
