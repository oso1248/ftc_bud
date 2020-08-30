document.getElementById('addForm').style.display="none"
document.getElementById('updateForm').style.display="none"
document.getElementById('list').style.display="none"
const api = '/api/supplier/'


function createNode(element) {
  return document.createElement(element)
};
function append(parent, e1) {
  return parent.appendChild(e1)
};


function add() {
  document.getElementById('updateForm').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('addForm').style.display="grid"
}
function update() {
  document.getElementById('addForm').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('updateForm').style.display="grid"
  
  const suppliers = document.getElementsByName('updateCompany')[0]
  suppliers.innerHTML = `<option value="" disabled selected hidden>Select Company</option>`
  fetch(api)
  .then(res => res.json())
  .then(data => {
    let supplier = data
    return supplier.map(supply => {

      let company = createNode('option')
      company.innerHTML = supply.company
      
      append(suppliers, company)
    })
  })
  .catch(err => {
    res.status(500).json({mgs: 'viewing supplier'})
  }) 
}
function view() {
  document.getElementById('addForm').style.display="none"
  document.getElementById('updateForm').style.display="none"
  

  const suppliers = document.getElementById('viewSuppliers')
  fetch(api)
    .then(res => res.json())
    .then(data => {
      let tableData = data
      var table = new Tabulator("#list", {
        height:"309px",
        layout:"fitDataFill",
        responsiveLayout:"collapse",
        data:tableData,
        columns:[
        {formatter:"responsiveCollapse", width:30, minWidth:30, hozAlign:"center", resizable:false, headerSort:false},
        // {title:"Company", field:"company", width:150, responsive:0},
        // {title:"Contact", field:"contact", hozAlign:"left", sorter:"number", width:125},
        // {title:"Email", field:"email", width:175, responsive:2},
        // {title:"Phone", field:"phone", width:125, responsive:2},
        // {title:"Address", field:"address", width:200, responsive:2},
        // {title:"Note", field:"note", width:200, responsive:2},

        {title:"Company", field:"company", responsive:0},
        {title:"Contact", field:"contact", hozAlign:"left", responsive:2},
        {title:"Email", field:"email", responsive:2},
        {title:"Phone", field:"phone", responsive:2, sorter:"number"},
        {title:"Address", field:"address", responsive:2},
        {title:"Note", field:"note", responsive:2},
        ],
      })
    
    })
    .catch(err => console.log('There was an error.'))
  document.getElementById('list').style.display="block"  
}


function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('addForm').reset();
}
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let fails = await validateAdd()
  
  if(fails.length === 0) {
    let form = document.getElementById('addForm')
    let data = {}
    let i
    
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
  
    fetch('/api/supplier', {
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
      if(response.msg == 'success') {
        alert('Supplier Added')
      } else {
        alert('Error, supplier not added')
      }
    })
    
  } else {
    alert(JSON.stringify(fails))
  }
}
async function validateAdd (ev){
  
  let failures = [];
  
  let company = document.getElementById('company').value
  let contact = document.getElementById('contact').value
  let email = document.getElementById('email').value
  let phone = document.getElementById('phone').value
  let address = document.getElementById('address').value


  let query = api + company
  let res = await fetch(query)
  let body = await res.json()
  let check = body.company
  
  if(check !== 'Empty') {
    failures.push({input:'company', msg:'Taken'})
  } 

  if( company === ""){
      failures.push({input:'company', msg:'Required Field'})
  } 
  if( contact === ""){
      failures.push({input:'contact', msg:'Required Feild'})
  } 
  if( email === ""){
      failures.push({input:'email', msg:'Required Field'})
  }
  if( phone === ""){
      failures.push({input:'phone', msg:'Required Field'})
  }
  if( address === ""){
      failures.push({input:'address', msg:'Required Field'})
  }
  
  return failures
}


function resetUpdate(ev){
  ev.preventDefault();
  document.getElementById('updateForm').reset()
  document.getElementsByName('updateNote')[0].innerHTML = ""
}
async function sendUpdate(ev){
  ev.preventDefault(); 
  ev.stopPropagation();
  
  let fails = await validateUpdate()
  
  if(fails.length === 0){
    let form = document.getElementById('updateForm')
    let data = {}
    let i
    
    for (i = 1; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }

    let company = document.getElementsByName('updateCompany')[0].value
    
    fetch(api + company, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      let response = data
      
      if(response.msg = 'pass') {
        alert('Supplier Updated')
      } else {
        alert('Error')
      }
    })
    .catch(err => console.log(err))
  }else{
    alert(JSON.stringify(fails))
  }
}
function validateUpdate(ev){

  let failures = [];
  
  let contact = document.getElementsByName('updateContact')[0].value
  let email = document.getElementsByName('updateEmail')[0].value
  let phone = document.getElementsByName('updatePhone')[0].value
  let address = document.getElementsByName('updateAddress')[0].value
  
  if( contact === ""){
      failures.push({input:'contact', msg:'Required Feild'})
  } 
  if( email === ""){
      failures.push({input:'email', msg:'Required Field'})
  }
  if( phone === ""){
      failures.push({input:'phone', msg:'Required Field'})
  }
  if( address === ""){
      failures.push({input:'address', msg:'Required Field'})
  }    
  
  return failures
}


document.getElementsByName('updateCompany')[0].oninput = populateUpdate
function populateUpdate() {
  const contact = document.getElementsByName('updateContact')[0]
  const email = document.getElementsByName('updateEmail')[0]
  const phone = document.getElementsByName('updatePhone')[0]
  const address = document.getElementsByName('updateAddress')[0]
  const note = document.getElementsByName('updateNote')[0]

  const company = document.getElementsByName('updateCompany')[0].value
  
  fetch(api + company)
    .then(res => res.json())
    .then(data => {
      let response = data
      
      contact.value = response.contact
      email.value = response.email
      phone.value = response.phone
      address.value = response.address
      note.innerHTML = response.note
      
    })
}


document.getElementById('addClear').addEventListener('click', resetAdd);
document.getElementById('addSubmit').addEventListener('click', sendAdd);

document.getElementById('updateClear').addEventListener('click', resetUpdate);
document.getElementById('updateSubmit').addEventListener('click', sendUpdate);

document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view