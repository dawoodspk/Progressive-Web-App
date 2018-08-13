console.log("Hello");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',
      registration.scope);
  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

function d() {

  fetch("https://api.github.com/users").then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response);
    var ul = document.getElementById('my');
    for (var i = 0; i < response.length; i++) {


      var li = document.createElement("li");
      ul.appendChild(li);

      li.innerHTML = response[i].login;
    }


  })
}