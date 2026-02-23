// Helper to get all users from storage
// Function to toggle between Sign Up and Login views
function toggleForm() {
    const signup = document.getElementById('signupSection');
    const login = document.getElementById('loginSection');
    const msg = document.getElementById('message');

    msg.textContent = ""; // Clear messages
    if (signup.style.display === "none") {
        signup.style.display = "block";
        login.style.display = "none";
    } else {
        signup.style.display = "none";
        login.style.display = "block";
    }
}

function getUsers() {
    const users = localStorage.getItem('userList');
    // If no users exist yet, return an empty array
    return users ? JSON.parse(users) : [];
}

// SIGN UP LOGIC
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const user = document.getElementById('newUsername').value;
    const pass = document.getElementById('newPassword').value;
    const allUsers = getUsers();

    // Check if the username is already taken
    const userExists = allUsers.some(u => u.username === user);

    if (userExists) {
        alert("Username already exists. Please choose another.");
    } else {
        // Add new user object to the array
        allUsers.push({ username: user, password: pass });

        // Save the updated array back to localStorage
        localStorage.setItem('userList', JSON.stringify(allUsers));

        alert("Account created! You can now log in.");
        toggleForm();
    }
});

//LOGIN LOGIC
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const userIn = document.getElementById('loginUsername').value;
    const passIn = document.getElementById('loginPassword').value;
    const message = document.getElementById('message');

    const allUsers = getUsers();

    // Use .find() to see if any object in the array matches BOTH inputs
    const matchedUser = allUsers.find(u => u.username === userIn && u.password === passIn);

    if (matchedUser) {
        localStorage.setItem('loggedInUser', userIn);
        window.location.href = "dashboard.html"; 
    } else {
        message.textContent = "Invalid username or password.";
        message.style.color = "red";
    }
});

let events = [];

function addEvent() {
    // 1. Create an event object from input values
    const newEvent = {
        host: document.getElementById('hostName').value,
        title: document.getElementById('eventTitle').value,
        location: document.getElementById('location').value,
        age: document.getElementById('ageRange').value,
        time: document.getElementById('eventTime').value,
        description: document.getElementById('description').value
    };

    // 2. Add to our "database" array
    events.push(newEvent);
    
    // 3. Clear the inputs
    alert("Event added successfully!");
    clearInputs();
}

function searchEvents() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('resultsList');
    resultsDiv.innerHTML = ""; // Clear old results

    if (query === "") return;

    // Filter events by Title or Host
    const filtered = events.filter(ev => 
        ev.title.toLowerCase().includes(query) || 
        ev.host.toLowerCase().includes(query)
    );

    filtered.forEach((ev, index) => {
        const item = document.createElement('div');
        item.className = "search-item";
        item.innerText = `${ev.title} (Hosted by: ${ev.host})`;
        item.onclick = () => showDetails(ev);
        resultsDiv.appendChild(item);
    });
}

function showDetails(ev) {
    const content = document.getElementById('eventDetailContent');
    content.innerHTML = `
        <h3>${ev.title}</h3>
        <p><strong>Host:</strong> ${ev.host}</p>
        <p><strong>Time:</strong> ${ev.time}</p>
        <p><strong>Location:</strong> ${ev.location}</p>
        <p><strong>Age:</strong> ${ev.age}</p>
        <p>${ev.description}</p>
    `;
    document.getElementById('eventModal').style.display = "block";
}

function closeModal() {
    document.getElementById('eventModal').style.display = "none";
}

function clearInputs() {
    document.querySelectorAll('input, textarea').forEach(input => input.value = "");
}

const eventbutton = document.getElementById('eventbutton');
const formgrid = document.getElementById('formgrid');

eventbutton.addEventListener('click', function() {
    // Check the current display style of the content box
    if (formgrid.style.display === 'none') {
        // If hidden, show it
        formgrid.style.display = 'block';
    } else {
        // If visible, hide it
        formgrid.style.display = 'none';
    }
});
