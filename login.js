document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.login-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Fetch user data from the API endpoint
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(users => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                let found = false;
                const data = users.find(user => user.username === username);
                
                if (!data) {
                    displayMessage('Invalid username or password');
                    return;
                }

                console.log(data.name)
                for (let i = 0; i < users.length; i++) {
                    console.log(users[i])
                    if (users[i].name === data.name && users[i].email === password) {
                        found = true; // Return true if username and password match
                        displayMessage('Login successful!');
                        break
                    }
                }

                if (!found) {
                    displayMessage('Invalid username or password');
                }
            })
            .catch(error => {
                displayMessage('error', error.message);
            });
    });

    function displayMessage(message) {
        const messageBox = document.getElementById('message-box');
        messageBox.innerHTML = '<p>' + message + '</p>';
        messageBox.style.display = 'block';
    }
});