function createNode(element) {
  return document.createElement(element)
}
function append(parent, el) {
  return parent.appendChild(el)
}
function createList(api, parent, title) {
  // fetch(api)
  axios.get(api)
  .then(res => {
    let list = res.data
    list.forEach((elem) => {
    let listItem = elem[title]
    let option = createNode('option')
    option.innerHTML = listItem
    append(parent, option)
    });
  })
  .catch(err => {
    console.error(err)
  })
}


window.addEventListener('load', populateLists())


// Populate Drop Downs
function populateLists() {
  supplier()
  locations()
  types()
  containers()
  environmentals()
  uoms()
}
function supplier(){
  const api = 'http://localhost:5000/api/supplier'
  const dropDown = document.getElementById('mtlSupplier')
  let title = 'company'
  createList(api, dropDown, title)
}
function locations(){
  const api = 'http://localhost:5000/api/location'
  const dropDown = document.getElementById('mtlLocation')
  let title = 'location'
  createList(api, dropDown, title)
}
function types(){
  const api = 'http://localhost:5000/api/type'
  const dropDown = document.getElementById('mtlType')
  let title = 'type'
  createList(api, dropDown, title)
}
function containers(){
  const api = 'http://localhost:5000/api/container'
  const dropDown = document.getElementById('mtlContainer')
  let title = 'container'
  createList(api, dropDown, title)
}
function environmentals(){
  const api = 'http://localhost:5000/api/enviro'
  const dropDown = document.getElementById('mtlEnvironmental')
  let title = 'enviro'
  createList(api, dropDown, title)
}
function uoms(){
  const api = 'http://localhost:5000/api/uom'
  const dropDown = document.getElementById('mtlUOM')
  let title = 'uom'
  createList(api, dropDown, title)
}


// function addCommodity(event) {
//   event.preventDefault()
//   let commodity = {
//     "commodity": document.getElementById('mtlCommodity').value,
//     "company": document.getElementById('mtlSupplier').value,
//     "location": document.getElementById('mtlLocation').value,
//     "location": document.getElementById('mtlInventory').value,
//     "type": document.getElementById('mtlType').value,
//     "container": document.getElementById('mtlContainer').value,
//     "enviro": document.getElementById('mtlEnvironmental').value,
//     "sap": document.getElementById('mtlSAP').value,
//     "per_pallet": document.getElementById('mtlPerPallet').value,
//     "unit_total": document.getElementById('mtlUnitTotal').value,
//     "uom": document.getElementById('mtlUOM').value,
//     "active": document.getElementById('mtlActive').value,
//     "threshold": document.getElementById('mtlThreshold').value,
//     "note": document.getElementById('mtlNote').value
//   }
//   console.log(commodity)
// }

// document.getElementById('mtlSubmit').addEventListener('click', addCommodity())