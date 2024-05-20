
/**
 * The URL of the Firebase Realtime Database where data will be stored and retrieved.
 * Die URL der Firebase-Echtzeitdatenbank, in der Daten gespeichert und abgerufen werden.
 */
const STORAGE_URL = "https://join-8aa83-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * An array containing contact data.
 * Ein Array mit Kontaktdaten.
 * 
 * @type {Array<object>}
 */
let contactData = [
    {
        'name': 'Anton Mayer',
        'email': 'a.mayer@gmail.com',
        'phoneNumber': '+49 1111 111 11 1'
    },
    {
        'name': 'Anja Schulz',
        'email': 'a.schulz@gmail.com',
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

/**
 * An array containing task objects.
 * Ein Array mit Aufgabenobjekten.
 * 
 * @type {Array<object>}
 */
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

/**
 * An array containing color codes for UI elements.
 * Ein Array mit Farbcodes für UI-Elemente.
 * 
 * @type {Array<string>}
 */
const colorPool = [
    '#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8',
    '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701',
    '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'
];
/**
 * Saves data to the specified path in the database.
 * Speichert Daten unter dem angegebenen Pfad in der Datenbank.
 * 
 * @param {string} [path=""] - The path where the data should be saved.
 *                              Der Pfad, unter dem die Daten gespeichert werden sollen.
 * @param {object} [data={}] - The data to be saved.
 *                              Die zu speichernden Daten.
 * @returns {Promise<object>} - A promise that resolves to the response JSON data.
 *                              Ein Promise, das zu den Antwort-JSON-Daten auflöst.
 * @throws {Error} - If there is an error during the data sending process.
 *                   Wenn ein Fehler während des Datenübertragungsvorgangs auftritt.
 */
async function putData(path = "", data = {}) {
    try {
        let response = await fetch(STORAGE_URL + path + ".json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Senden der Daten: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Fehler beim Senden der Daten: ${error.message}`);
    }
}

/**
 * Loads data from the specified path in the database.
 * Lädt Daten aus dem angegebenen Pfad in der Datenbank.
 * 
 * @param {string} [path=""] - The path from which the data should be loaded.
 *                              Der Pfad, aus dem die Daten geladen werden sollen.
 * @returns {Promise<object>} - A promise that resolves to the response JSON data.
 *                              Ein Promise, das zu den Antwort-JSON-Daten auflöst.
 */
async function loadData(path = "") {
    let response = await fetch(STORAGE_URL + path + ".json");
    let responseAsJson = await response.json();

    return responseAsJson;
}

function saveData(name, data) {
    putData(name, data)
        .then(response => console.log(response))
        .catch(error => console.error(error));
}

async function loadContacts() {
    // Load contacts
    // Kontakten werden geladen
    contactData = await loadData("/contacts");

    /* console.log(contactData); */
}
function saveContacts() {
    // Load contacts
    // Kontakten werden gespeichert
    saveData("contacts", contactData);

    /* console.log(contactData); */
}

async function loadTasks() {
    // Load tasks
    // Tasks werden geladen
    tasks = await loadData("/tasks");

    /* console.log(tasks); */
}
function saveTasks() {
    // Save tasks
    // Tasks werden gespeichert
    saveData("tasks", tasks);

    /* console.log(tasks); */
}

/**
 * Initializes shared components.
 * Initialisiert gemeinsame Komponenten.
 */
function sharedInit() {
    let loginInitial = document.getElementById(`nav_right_menu`);
    loginInitial.innerHTML = getInitials(`Max Mustermann`);
}


/**
 * Retrieves initials from the input string.
 * Ruft Initialen aus dem Eingabestring ab.
 * 
 * @param {string} inputString - The input string from which to extract initials.
 *                               Der Eingabestring, aus dem die Initialen extrahiert werden sollen.
 * @returns {string} - The extracted initials.
 *                      Die extrahierten Initialen.
 */
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

/**
 * Toggles the display of the "jura_container" element.
 * Schaltet die Anzeige des Elements "jura_container" um.
 */
function jura_window() {
    let juraContainer = document.getElementById(`jura_container`);

    if (juraContainer.style.display == "none" || juraContainer.style.display == "") {
        juraContainer.style.display = "flex";
    } else {
        juraContainer.style.display = "none";
    }

}

/**
 * Redirects to the previous page.
 * Leitet zur vorherigen Seite weiter.
 */
function goBack() {
    // window.location.href = document.referrer;
    window.location.href = '/summary';
}

/**
 * Redirects to the login page.
 * Leitet zur Anmeldeseite weiter.
 */
function goBackLogin() {
    window.location.href = '/';
}