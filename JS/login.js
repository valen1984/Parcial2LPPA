const form = document.getElementById("form");
const email = document.getElementById("email");
const pass = document.getElementById("pass");


form.addEventListener("submit", function (e){
  e.preventDefault();
  const credentials = {
    email: email.value,
    pass: pass.value,
  };
  validateCredentials(credentials)
    .then(function(successStatus) {
      if (successStatus) {
        saveCredentialsToLocalStorage(credentials)
        window.location.assign('/dashboard.html')
      } else {
        modal.style.display = "block";
      }
    })
    .catch(function(error) {
      console.log(error);
    });
})
;

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


function checkForLoginCredentialsInLocalStorage() {
  return localStorage.getItem("email") && localStorage.getItem("pass");
}

if (checkForLoginCredentialsInLocalStorage()) {
    const credentials = {
      email: localStorage.getItem("email"),
      pass: localStorage.getItem("pass"),
    };

    validateCredentials(credentials)
      .then(function(successStatus) {
        if (successStatus) {
          window.location.assign('/dashboard.html')
        }
      })
      .catch(function(error) {
        console.log(error);
      })
} else {
    if (window.location.origin == '/dashboard.html'){
      window.location.assign('/index.html')
    }
}




// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("submit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
