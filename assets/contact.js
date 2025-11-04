// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyApVGEIDpV5q9iHNqFoPdHI600pWdNyPiI",
  authDomain: "project1and2-5b783.firebaseapp.com",
  databaseURL: "https://project1and2-5b783-default-rtdb.firebaseio.com",
  projectId: "project1and2-5b783",
  storageBucket: "project1and2-5b783.appspot.com",
  messagingSenderId: "414001733175",
  appId: "1:414001733175:web:a0a487ebddd613cf9f69b2",
  measurementId: "G-XMEY08FBZK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Form elements
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("status");

const getVal = (id) => document.getElementById(id)?.value?.trim() ?? "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = getVal("name");
  const email = getVal("email");
  const subject = getVal("subject");
  const message = getVal("message");

  if (!name || !email || !subject || !message) {
    statusEl.textContent = "⚠️ Please fill out all fields.";
    statusEl.className = "err";
    return;
  }

  statusEl.textContent = "Sending…";
  statusEl.className = "";

  try {
    // ✅ 1. Save to Firebase Realtime DB
    await db.ref("messages").push({
      name,
      email,
      subject,
      message,
      createdAt: Date.now(),
      ua: navigator.userAgent,
    });

    // ✅ 2. Send Email using EmailJS
    await emailjs.send(
      "service_mh80c98",        // your service ID
      "YOUR_TEMPLATE_ID_HERE",  // replace with your EmailJS template ID
      {
        from_name: name,
        from_email: email,
        subject,
        message,
        submitted_at: new Date().toLocaleString(),
      }
    );

    form.reset();
    statusEl.textContent = "✅ Message sent & saved!";
    statusEl.className = "ok";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Failed to send. Please try again later.";
    statusEl.className = "err";
  }
});
