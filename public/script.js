let baseUrl = "";
let authKey = "";

function connect() {
  const ip = document.getElementById("ip").value.trim();
  const key = document.getElementById("key").value.trim();
  baseUrl = `http://${ip}:3000`;

  fetch(`${baseUrl}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Hatalı key");
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        authKey = key;
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("controlPage").style.display = "block";
      } else {
        document.getElementById("loginStatus").innerText = "Hatalı şifre.";
      }
    })
    .catch(() => {
      document.getElementById("loginStatus").innerText = "Bağlantı kurulamadı.";
    });
}

function sendCommand(command) {
  fetch(`${baseUrl}/command`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: authKey, command }),
  }).then(() => alert("Komut gönderildi"));
}

function disconnect() {
  document.getElementById("controlPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("loginStatus").innerText = "Bağlantı kesildi.";
}
    