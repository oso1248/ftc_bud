document.getElementById('Submit').addEventListener('click', add)

function add(ev) {
  ev.preventDefault() 
  ev.stopPropagation()

  let form = document.getElementById('add')
  let data = {}
  let i 

  for (i = 0; i < form.length - 1; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
    }
  
  data.permissions = parseInt(data.permissions)

  console.log(data)

  fetch('/api/auth/register', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  method: 'POST',
  body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    let response = data
    alert(data.msg)
  })
  .catch(err => alert('There was an error'))


}