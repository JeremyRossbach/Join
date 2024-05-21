function openAddTask() {
    let addTask = document.getElementById('addTask');
    document.body.style.overflow = 'hidden';
    document.getElementById('addTaskBackground').style.display = 'flex';
    addTask.innerHTML = /* html */`
        <div class="addTaskContent" id="addTaskContent">
            <div class="h1AndClose">
                <H1 class="H1">Add Task</H1>
                <img onclick="addTaskSlideOut()" class="closeImage" src="./img/close.svg">
            </div>
            <div class="innerContent">
                <div class="leftside gap_16">
                    <div class="container-title">
                        <span class="input-title-text">Title<span class="redStar">*</span></span>
                        <input id="titleInput" class="input-field" placeholder="Enter a title" type="text"
                            oninput="createBtnEnable(),alarmInput()">
                        <div class="danger-text" style="display: none;">This field is required</div>
                    </div>
                    <div class="container-description">
                        <span class="input-title-text">Description</span>
                        <textarea id="descriptionInput" class="input-field input-field-description"
                            placeholder="Enter a Description"></textarea>
                    </div>
                    <div class="container-assigned contactPosition">
                        <span class="input-title-text">Assigned to</span>
                        <div id="dropdownContent" class="dropdown">
                            <button class="input-field input-field-button dropbtn" onclick="dropDownContacts()"><input
                                    oninput="searchContacts()" id="filterContatcsInput" type="text" class="noDisplay"><span
                                    id="selectSpan">Select
                                    contacts to assign </span><img id="arrow" src="img_addTask/arrow down.svg" alt=""></button>
                            <div id="contacts_dropdown" class="contactsDropdown scroll-style">
                                <div id="availableContacts"></div>
        
                            </div>
                            <div class="chosenInitals" id="chosenInitals"></div>
                        </div>
                    </div>
                </div>
                <div class="roomdivider"></div>
        
                <div class="rightside gap_16">
                    <div class="container-input-date" class="datepicker">
                        <span class="input-title-text">Due date<span class="redStar">*</span></span>
                        <input type="date" id="date" class="input-field input-field-date" name="date"
                            onchange="inputDateColorChange()" oninput="createBtnEnable(),alarmInput()">
                        <div class="danger-text" style="display: none; margin-top: 8px;">This field is required
                        </div>
                    </div>
                    <div class="container-input-prio" class="prio">
                        <span class="input-title-text">Prio</span>
                        <div class="priobtns">
                            <div id="urgentbtn" onclick="prioUrgent()" class="priobtn">Urgent <img id="highicon"
                                    src="img_addTask/Prio high icon.svg" alt=""></div>
                            <div id="midbtn" onclick="prioMed()" class="priobtn">Medium <img id='midicon'
                                    src="img_addTask/Prio medi icon.svg" alt=""></div>
                            <div id="lowbtn" onclick="prioLow()" class="priobtn">Low <img id="lowicon"
                                    src="img_addTask/Prio low icon.svg" alt=""></div>
                        </div>
                    </div>
                    <div class="container-input-category">
                        <span class="input-title-text">Category<span class="redStar">*</span></span>
                        <div class="dropdown" onclick="dropDownCategory()">
                            <button id="dropBtnCategory" class="dropbtn input-field input-field-category"><span
                                    id="categorySpan">Select
                                    tasks
                                    category</span><img id="arrow_category" src="img_addTask/arrow down.svg" alt=""></button>
                            <div id="dropdown-content" class="dropdown">
                                <div class="availableCategory" id="availableCategory">
                                    <div onclick="technicalTask()" class="choseCategory">Technical Task</div>
                                    <div onclick="userStory()" class="choseCategory">User Story</div>
                                </div>
        
                            </div>
                        </div>
                    </div>
                    <div id="categoryDangerText" class="danger-text" style="display: none; margin-top: 8px;">This
                        field is required
                    </div>
                    <div class="container-input-subtask">
                        <span class="input-title-text">Subtasks</span>
                        <div class="input-field-subtask">
                            <input id="subtask_input" class="input-field" placeholder="Add new subtask" on>
                            <img onclick="pushSubtask()" src="img_addTask/subtaskPlus.svg" alt="">
                        </div>
                        <div id="pushedSubtasks" class="pushedSubtasks scroll-style"></div>
                    </div>
                </div>
            </div>
            <div class="addTaskBottom">
                <div class="field-required"><span class="redStar">*</span>This field is required</div>
                <div class="container-clear-create">
                    <div onclick="clearForm()" class="clearBTN" id="clearBTN">Clear X</div>
                    <button id="alarmBTN" class="createBTN" onclick="alarmInput()">
                        <span>Create Task</span>
                        <img src="img_addTask/createCheck.svg" alt="">
                        <button id="createBTN" class="noDisplay createBTN " onclick="createTask()">
                            <span>Create Task</span>
                            <img src="img_addTask/createCheck.svg" alt="">
                        </button>
                </div>
            </div>
        </div>
    `;
    addTaskSlideIn();
}


function addTaskSlideIn() {
    let addTask = document.getElementById('addTask');
    addTask.classList.add('slideIn');
    setTimeout(() => {
        addTask.classList.remove('slideIn');
    }, 500);

    addTask.style.display = 'flex';
}


function addTaskSlideOut() {
    let addTask = document.getElementById('addTask');
    addTask.classList.add('slideOut');
    setTimeout(() => {
        addTask.classList.remove('slideOut');
        closeAddTask();
    }, 100);
}


function closeAddTask(event) {
    document.body.style.overflow = '';
    document.getElementById('addTask').style.display = 'none';
    document.getElementById('addTaskBackground').style.display = 'none';
    if (event) {
        event.stopPropagation();
    }
    /* location.reload(); */
}