// Paste your Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "1:XXXX:web:XXXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Get form + elements
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('status');

// Handle submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill out all fields.";
    return;
  }

  statusEl.textContent = "Sending...";

  try {
    await db.ref("messages").push({
      name,
      email,
      message,
      createdAt: Date.now()
    });
    form.reset();
    statusEl.textContent = "✅ Message sent successfully!";
  } catch (error) {
    statusEl.textContent = "❌ Failed to send message.";
    console.error(error);
  }
});
