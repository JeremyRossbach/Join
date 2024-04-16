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
        checkContent(containerId, i);
        renderCategoryColor(i);
    }
}


function checkContent(containerId, i) {
    checkEmptySection(containerId);
    content(containerId, i);
}


function checkEmptySection(containerId) {
    document.getElementById('empty' + containerId + 'Section').style.display = 'none';
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
            <div id="progressbarAndSubtask${i}" class="progressbarAndSubtask">
                <div id="progressbar${i}" class="progressbar"><div id="progress${i}" class="progress"></div></div>
                <div id="subtasks${i}" class="subtasks"><div id="subtask${i}" class="subtask"></div></div>
            </div>
            <div class="cardBottom">
                <div class="assignedTo">assignedTo</div>
                <div class="prio">prio</div>
            </div>
        </div>
    `;
    renderProgressbar(i);
    renderSubtasks(i);
}


function renderProgressbar(i) {
    let progressbar = document.getElementById(`progressbar${i}`);
    let progressbarAndSubtask = document.getElementById(`progressbarAndSubtask${i}`);

    if (tasks[i]['subtask'][i] === '') {
        progressbar.style.display = 'none';
    } else {
        progressbarAndSubtask.style.marginBottom = '24px';
    }
}


function renderSubtasks(i) {
    let subtasks = document.getElementById(`subtask${i}`);

    if (tasks[i]['subtask'][i] === '') {
        subtasks.style.display = 'none';
    } else {
        subtasks.innerHTML += /* html */`
        <div><!-- number of done subtasks -->?/${tasks[i]['subtask'].length} Subtasks</div>
    `;
    renderProgress(i);
    }
}


function renderProgress(i) {
    let progress = document.getElementById(`progress${i}`);

    progress.style.width = `128px / ${tasks[i]['subtask'].length} * /* number of done subtasks */`;
}


function renderCategoryColor(i) {
    let content = document.getElementById(`category${i}`);
    if (tasks[i]['category'] === 'Technical Task') {
        content.style.backgroundColor = '#1FD7C1';
    } else {
        content.style.backgroundColor = '#0038FF';
    }
}