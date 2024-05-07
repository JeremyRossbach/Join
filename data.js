const STORAGE_TOKEN = 'L36LJE4QYVS3F3IFAYY2A67B3Y4OV7AEIMVM6A8K';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


let contactData = [
    {
        'name': 'Anton Mayer',
        'email': 'a.mayer@gmail.com',
        'phoneNumber': '+49 1111 111 11 1'
    },
    {
        'name': 'Anja Schulz',
        'email': 'a.schulz@hotmail.com',
        'phoneNumber': '+49 2222 222 22 2'
    },
    {
        'name': 'Benedikt Ziegler',
        'email': 'b.ziegler@gmail.com',
        'phoneNumber': '+49 3333 333 33 3'
    },
    {
        'name': 'David Eisenberg',
        'email': 'd.eisenberg@gmail.com',
        'phoneNumber': '+49 4444 444 44 4'
    },
    {
        'name': 'Eva Fischer',
        'email': 'e.fischer@gmail.com',
        'phoneNumber': '+49 5555 555 55 5'
    },
    {
        'name': 'Emmanuel Mauer',
        'email': 'e.mauer@gmail.com',
        'phoneNumber': '+49 6666 666 66 6'
    },
    {
        'name': 'Marcel Bauer',
        'email': 'm.bauer@gmail.com',
        'phoneNumber': '+49 7777 777 77 7'
    },
    {
        'name': 'Tatjana Wolf',
        'email': 't.wolf@gmail.com',
        'phoneNumber': '+49 8888 888 88 8'
    },
    {
        'name': 'Felix Schneider',
        'email': 'f.schneider@gmail.com',
        'phoneNumber': '+49 9999 999 99 9'
    },
    {
        'name': 'Hannah Werner',
        'email': 'h.werner@gmail.com',
        'phoneNumber': '+49 1010 101 10 1'
    },
    {
        'name': 'Lena Hofmann',
        'email': 'l.hofmann@gmail.com',
        'phoneNumber': '+49 1212 121 12 1'
    },
    {
        'name': 'Simon Koch',
        'email': 's.koch@gmail.com',
        'phoneNumber': '+49 1313 131 13 1'
    },
    {
        'name': 'Sophie Schmitt',
        'email': 's.schmitt@gmail.com',
        'phoneNumber': '+49 1414 141 14 1'
    },
    {
        'name': 'Julian Becker',
        'email': 'j.becker@gmail.com',
        'phoneNumber': '+49 1515 151 15 1'
    },
    {
        'name': 'Laura Mayer',
        'email': 'l.mayer@gmail.com',
        'phoneNumber': '+49 1616 161 16 1'
    },
    {
        'name': 'Maximilian Wagner',
        'email': 'm.wagner@gmail.com',
        'phoneNumber': '+49 1717 171 17 1'
    },
    {
        'name': 'Paula Huber',
        'email': 'p.huber@gmail.com',
        'phoneNumber': '+49 1818 181 18 1'
    },
    {
        'name': 'Tim Müller',
        'email': 't.muller@gmail.com',
        'phoneNumber': '+49 1919 191 19 1'
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
        'doneSubtask': [true, true],
        'numberOfDoneSubtasks': 0,
        'section': 'In progress'
    },
    {
        'title': 'Contact Design',
        'description': 'Work on contact design...',
        'assignedTo': ['Anja Schulz', 'David Eisenberg'],
        'dueDate': '01/01/2024',
        'prio': 'Low',
        'category': 'User Story',
        'subtask': [],
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
        'doneSubtask': [true],
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
        'doneSubtask': [true],
        'numberOfDoneSubtasks': 0,
        'section': 'Await Feedback'
    },
    {
        'title': 'Daily Kochwelt Header',
        'description': 'Edit header design...',
        'assignedTo': ['Anja Schulz', 'Tatjana Wolf'],
        'dueDate': '01/01/2024',
        'prio': 'Urgent',
        'category': 'User Story',
        'subtask': [],
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
        'doneSubtask': [true, true],
        'numberOfDoneSubtasks': 0,
        'section': 'Done'
    },
    {
        'title': 'Responsivity of all Site',
        'description': 'Define CSS naming conventions and structure.',
        'assignedTo': ['Eva Fischer', 'David Eisenberg'],
        'dueDate': '05/15/2024',
        'prio': 'Urgent',
        'category': 'Technical Task',
        'subtask': ['Establish CSS Methodology', 'Setup Base Styles'],
        'doneSubtask': [true, true],
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
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

// lädt alles
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
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

// Zurück auf die vorherige Seite wechseln / einfach die Funktion per onclick Event nutzen. 
function goBack() {
    // window.location.href = document.referrer;
    window.location.href = '/summary';
}

function goBackLogin() {
    window.location.href = '/';
}