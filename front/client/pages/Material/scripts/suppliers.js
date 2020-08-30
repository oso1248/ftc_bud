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
  
  const suppliers = document.getElementById('updateCompany')
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
      console.log(tableData)
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
    var form = document.getElementById('addForm')
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
  document.getElementById('updateForm').reset();
}
function sendUpdate(ev){
  ev.preventDefault(); 
  ev.stopPropagation();
  
  let fails = validate();
  
  if(fails.length === 0){
     
      document.getElementById('form-user').submit();
  }else{
      fails.forEach(function(obj){
          let field = document.getElementById(obj.input);
          field.parentElement.classList.add('error');
          field.parentElement.setAttribute('data-errormsg', obj.msg);
      })
  }
}
function validateUpdate(ev){
  //let valid = true;
  let failures = [];
  //checkbox (or radio buttons grouped by name)
  let chk = document.getElementById('input-alive');
  // .checked .value
  if(!chk.checked){
      //valid = false;
      //chk.parentElement.classList.add('error');
      //chk.parentElement.setAttribute('data-errormsg', 'Must be alive to submit.');
      failures.push({input: 'input-alive', msg: 'Must be alive to submit.'})
  }

  //select
  let select = document.getElementById('input-age');
  // .selectedIndex  .options  .length   .selectedValue  .value
  if( select.selectedIndex === 0 ){
      failures.push({input:'input-age', msg:'Too young'})
  }

  //inputs for text, email, tel, color, number...
  let first = document.getElementById('input-first');
  let password = document.getElementById('input-password');
  let email = document.getElementById('input-email');
  //.value, .defaultValue, length of value
  if( first.value === ""){
      failures.push({input:'input-first', msg:'Required Field'})
  } 
  if( password.value === "" || password.value.length < 8){
      failures.push({input:'input-password', msg:'Must be at least 8 chars'})
  } 
  if( email.value === ""){
      failures.push({input:'input-email', msg:'Required Field'})
  }
  
  //return a boolean || an object with details about the failures
  return failures;
}




document.getElementById('addClear').addEventListener('click', resetAdd);
document.getElementById('addSubmit').addEventListener('click', sendAdd);

document.getElementById('updateClear').addEventListener('click', resetUpdate);
document.getElementById('updateSubmit').addEventListener('click', sendUpdate);

document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view