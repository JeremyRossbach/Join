let contactData = [
    {
        'name': 'Anton Mayer',
        'email': 'antom@gmail.com',
        'phoneNumber': '+49 1111 111 11 1'
    },
    {
        'name': 'Anja Schulz',
        'email': 'schulz@hotmail.com',
        'phoneNumber': '+49 2222 222 22 2'
    },
    {
        'name': 'Benedikt Ziegler',
        'email': 'benedikt@gmail.com',
        'phoneNumber': '+49 3333 333 33 3'
    },
    {
        'name': 'David Eisenberg',
        'email': 'davidberg@gmail.com',
        'phoneNumber': '+49 4444 444 44 4'
    },
    {
        'name': 'Eva Fischer',
        'email': 'eva@gmail.com',
        'phoneNumber': '+49 5555 555 55 5'
    },
    {
        'name': 'Emmanuel Mauer',
        'email': 'emmanuelma@gmail.com',
        'phoneNumber': '+49 6666 666 66 6'
    },
    {
        'name': 'Marcel Bauer',
        'email': 'bauer@gmail.com',
        'phoneNumber': '+49 7777 777 77 7'
    },
    {
        'name': 'Tatjana Wolf',
        'email': 'wolf@gmail.com',
        'phoneNumber': '+49 8888 888 88 8'
    }
];


let tasks = [
    {
        'title': 'Contact Form & Imprint',
        'description': 'Create a contact form and imprint page...',
        'assignedTo': ['Anja Schulz', 'David Eisenberg', 'Eva Fischer'],
        'dueDate': '01/01/2024',
        'prio': 'Urgent',
        'category': 'User Story',
        'subtask': ['Contact form', 'Imprint page'],
        'numberOfDoneSubtasks': 0,
        'section': 'In progress'
    },
    {
        'title': 'HTML Base Tamplate Creation',
        'description': 'Create reusable HTML base tamplates...',
        'assignedTo': ['David Eisenberg', 'Benedikt Ziegler', 'Anja Schulz'],
        'dueDate': '01/01/2024',
        'prio': 'Low',
        'category': 'Technical Task',
        'subtask': ['Reusable HTML base tamplates'],
        'numberOfDoneSubtasks': 0,
        'section': 'Await Feedback'
    },
    {
        'title': 'Daily Kochwelt Recipe',
        'description': 'Implement daily recipe and portion caltulator...',
        'assignedTo': ['Eva Fischer', 'Anja Schulz', 'Tatjana Wolf'],
        'dueDate': '01/01/2024',
        'prio': 'Medium',
        'category': 'User Story',
        'subtask': ['Daily recipe and portion caltulator'],
        'numberOfDoneSubtasks': 0,
        'section': 'Await Feedback'
    },
    {
        'title': 'Daily Kochwelt Recipe',
        'description': 'Implement daily recipe and portion caltulator...',
        'assignedTo': ['Eva Fischer', 'Anja Schulz', 'Tatjana Wolf'],
        'dueDate': '01/01/2024',
        'prio': 'Medium',
        'category': 'User Story',
        'subtask': ['Daily recipe and portion caltulator'],
        'numberOfDoneSubtasks': 0,
        'section': 'Await Feedback'
    },
    {
        'title': 'CSS Architecture Planning',
        'description': 'Define CSS naming conventions nad structure.',
        'assignedTo': ['Sofia Müller', 'Benedikt Ziegler'],
        'dueDate': '02/09/2023',
        'prio': 'Urgent',
        'category': 'Technical Task',
        'subtask': ['Establish CSS Methodology', 'Setup Base Styles'],
        'numberOfDoneSubtasks': 0,
        'section': 'Done'
    },
    {
        'title': 'Responsivity of all Site',
        'description': 'Define CSS naming conventions nad structure.',
        'assignedTo': ['Eva Fischer', 'David Eisenberg'],
        'dueDate': '05/15/2024',
        'prio': 'Urgent',
        'category': 'Technical Task',
        'subtask': ['Establish CSS Methodology', 'Setup Base Styles'],
        'numberOfDoneSubtasks': 0,
        'section': 'To do'
    }
];


const colorPool = [
    '#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8',
    '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701',
    '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'
];

// speichert alles
function save() {

}


// lädt alles
function load() {

}

// gemeinsames Init
function sharedInit() {
    let loginInitial = document.getElementById(`nav_right_menu`);
    loginInitial.innerHTML = getInitials(`Max Mustermann`);
}


// gibt die ersten Buchstaben von Wörter zurück, z.B: Vorname Nachname -> VN
function getInitials(inputString) {
    const words = inputString.split(` `);
    let initials = "";

    for (const word of words) {

        if (initials.length < 2) {
            initials += word.charAt(0);
        }

    }

    return initials.toUpperCase();
}

// kleine Fenster oben rechts, wo man sich ausloggen kann usw..
function jura_window() {
    let juraContainer = document.getElementById(`jura_container`);

    if (juraContainer.style.display == "none" || juraContainer.style.display == "") {
        juraContainer.style.display = "flex";
    } else {
        juraContainer.style.display = "none";
    }

}   