const firebaseConfig = {
  apiKey: "AIzaSyApVGEIDpV5q9iHNqFoPdHI600pWdNyPiI",
  authDomain: "project1and2-5b783.firebaseapp.com",
  databaseURL: "https://project1and2-5b783-default-rtdb.firebaseio.com", // <-- add this
  projectId: "project1and2-5b783",
  storageBucket: "project1and2-5b783.appspot.com", // <-- fix domain
  messagingSenderId: "414001733175",
  appId: "1:414001733175:web:a0a487ebddd613cf9f69b2",
  measurementId: "G-XMEY08FBZK"
};

 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


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
  }// after a successful Firebase push:
await emailjs.send('service_contact', 'template_contact', {
  from_name: name,
  from_email: email,
  message,
  submitted_at: new Date().toLocaleString()
});
// if both succeed:
form.reset();
statusEl.textContent = "✅ Message sent & saved!";

});
