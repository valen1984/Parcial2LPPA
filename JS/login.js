const form = document.getElementById("form");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
form.addEventListener("submit", validateCredentialsOnSubmit);

function saveCredentialsToLocalStorage(credentials) {
  localStorage.setItem("email", credentials.email);
  localStorage.setItem("pass", credentials.pass);
}

function validateCredentials(credentials) {
  return fetch("https://basic-server-one.vercel.app/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.pass,
    }),
  })
    .then(function(respuesta) {
      return respuesta.json()
        .then(function (respuestaJSON) {
          // Faltan datos
          if (respuestaJSON.success === false) {
            return false;
          }
          // Datos incorrectos
          if (respuestaJSON.error === false) {
            return true;
          }
          return false;
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(function(error) {
      console.log(error);
    });
}
