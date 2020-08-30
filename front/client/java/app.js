function logout() {
  fetch('/api/auth/logout')
  .then(res => res.json())
  .then(data => {
    let { msg } = data
    location.href = '/login.html'
  })
}

document.getElementById('logout').addEventListener('click', logout)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}