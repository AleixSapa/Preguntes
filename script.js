// Usuaris definits dins del codi com un JSON
var users = [
  { username: "Prova", password: "0" },
  { username: "usuari2", password: "contrasenya2" },
  { username: "usuari3", password: "contrasenya3" },
];

// Variables globals
var isRegistering = false; // Estem registrant o iniciant sessió?
var errorMessage = document.getElementById("errorMessage");
var actionButton = document.getElementById("actionButton");
var formTitle = document.getElementById("formTitle");
var switchFormLink = document.getElementById("switchForm");

// Mostrem el formulari de registre
switchFormLink.addEventListener("click", function (event) {
  event.preventDefault();
  isRegistering = !isRegistering;

  if (isRegistering) {
    formTitle.textContent = "Registrar-se";
    actionButton.textContent = "Registrar";
    switchFormLink.textContent = "Ja tens compte? Inicia sessió aquí.";
  } else {
    formTitle.textContent = "Iniciar Sessió";
    actionButton.textContent = "Entrar";
    switchFormLink.textContent = "Vols crear un compte? Registra't aquí.";
  }
});

// Quan s'envia el formulari
document
  .getElementById("authForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (isRegistering) {
      // Registrar un nou usuari
      var existingUser = users.find((u) => u.username === username);

      if (existingUser) {
        errorMessage.textContent = "Aquest usuari ja existeix.";
      } else {
        // Afegir l'usuari al JSON (en una situació real, això es guardaria a un servidor)
        users.push({ username, password });
        alert("Usuari registrat correctament!");
        window.location.href = "Educacio/index.html"; // Redirigeix a la pàgina principal
      }
    } else {
      // Iniciar sessió
      var user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        alert("Sessió iniciada correctament!");
        window.location.href = "Educacio/index.html"; // Redirigeix a la pàgina principal després de l'inici de sessió
      } else {
        errorMessage.textContent = "Usuari o contrasenya incorrectes.";
      }
    }
  });
