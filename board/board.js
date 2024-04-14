function init() {
    renderContent('To do', 'toDoContent');
    renderContent('In progress', 'inProgressContent');
    renderContent('Await Feedback', 'awaitFeedbackContent');
    renderContent('Done', 'doneContent');
}


function renderContent(section, containerId) {
    for (let i = 0; i < tasks.length; i++) {
        showContent(section, containerId, i);
    }
}


function showContent(section, containerId, i) {
    if (tasks[i]['section'] === section) {
        content(containerId, i);
        renderCategoryColor(i);
    }
}


function content(containerId, i) {
    let container = document.getElementById(containerId);

    container.innerHTML += /* html */`
            <div onclick="" id="card${i}" class="card">
                <div id="category${i}" class="category">${tasks[i]['category']}</div>
                <div class="titleAndDescription">
                    <div class="title">${tasks[i]['title']}</div>
                    <div class="description">${tasks[i]['description']}</div>
                </div>
                <!-- details missisng ! -->
                <div class="subtasks">Subtasks</div>
                <div class="cardBottom">  
                    <div class="assignedTo">assignedTo</div>
                    <div class="prio">prio</div>
                </div>
            </div>
        `;
}


function renderCategoryColor(i) {
    let content = document.getElementById(`category${i}`);
    if (tasks[i]['category'] === 'Technical Task') {
        content.style.backgroundColor = '#1FD7C1';
    } else {
        content.style.backgroundColor = '#0038FF';
    }
}