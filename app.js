// Initialize Pi SDK
const Pi = window.Pi;
if (Pi) {
  Pi.init({ version: "2.0", sandbox: true });
}

async function authenticatePi() {
  const statusEl = document.getElementById("user-status");
  const btn = document.getElementById("auth-btn");

  if (!Pi) {
    statusEl.innerText = "Please open this app inside the Pi Browser.";
    return;
  }

  try {
    const scopes = ['username', 'payments'];
    function onIncompletePaymentFound(payment) {
      console.log("Incomplete payment found:", payment);
    }

    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    statusEl.innerText = `Welcome, @${auth.user.username}!`;
    btn.style.display = "none";
  } catch (error) {
    console.error("Pi Auth Error:", error);
    statusEl.innerText = "Authentication failed. Make sure you are in Pi Browser.";
  }
}
