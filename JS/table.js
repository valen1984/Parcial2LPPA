let key = localStorage.getItem("iniciaSesion")

if (key === undefined || key === null || key == 0) {
    window.location.assign('./index.html')
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

if (!checkForLoginCredentialsInLocalStorage()) {
      window.location.assign('./index.html')
}



const logoutUser = document.getElementById('logout');
logoutUser.addEventListener("click", function(){
    localStorage.clear();
    window.location.assign("./index.html");
});

const tabla = (function (respuestaJson){
    const tableContainer = document.getElementById('tableContainer');
    for(let i of respuestaJson['data']){
        tableContainer.innerHTML +=`
        <tr class='table-tr'>
            <td class='table-td'>${i.id}</td>
            <td class='table-td'>${i.name}</td>
            <td class='table-td'>${i.username}</td>
            <td class='table-td'>${i.email}</td>
            <td class='table-td'>${i.address.street}</td>
            <td class='table-td'>${i.address.suite}</td>
            <td class='table-td'>${i.address.city}</td>
            <td class='table-td'>${i.phone}</td>
            <td class='table-td'>${i.company.name}</td>
        </tr>`
    }
});
fetch('https://basic-server-one.vercel.app/users')
.then(function(respuesta){
    return respuesta.json();
})
.then(function(respuestaJson){
    tabla(respuestaJson);;
});
