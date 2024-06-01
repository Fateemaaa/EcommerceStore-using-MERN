// Signup Form Submission
document.getElementById('signup-form').onsubmit = async (event) => {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();
    if (response.ok) {
        alert('Signup successful!');
        // Redirect to index.html on successful signup
        window.location.href = 'index.html';
    } else {
        alert(result.error || 'Signup failed!');
    }
};

// Login Form Submission
document.getElementById('login-form').onsubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
        alert('Login successful!');
        // Redirect to index.html on successful login
        window.location.href = 'index.html';
    } else {
        alert(result.error || 'Login failed!');
    }
};