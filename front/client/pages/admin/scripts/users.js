document.getElementById('frmAdd').style.display="none"
document.getElementById('frmUpdate').style.display="none"
document.getElementById('list').style.display="none"
const api = '/api/user/'


function createNode(element) {
  return document.createElement(element)
};
function append(parent, e1) {
  return parent.appendChild(e1)
};


// Views
function add() {
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmAdd').style.display="grid"
  let breweries = document.getElementById('brewery_id')
  breweries.innerHTML = `<option value="" id="updateBrewery" disabled selected hidden>Select Brewery</option>`
  fetch('/api/brewery')
    .then(res => res.json())
    .then(data => {
      let response = data
      return response.map(elements => {

        let option = createNode('option')
        option.innerHTML = elements.brewery
        
        append(breweries, option)
      })
    })
  
}
function update() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmUpdate').style.display="grid"
  
  const users = document.getElementsByName('updateUsers')[0]
  users.innerHTML = `<option value="" disabled selected hidden>Select User</option>`
  fetch(api)
  .then(res => res.json())
  .then(data => {
    let user = data
    
    return user.map(listItem => {

      let username = createNode('option')
      username.innerHTML = listItem.username
      
      append(users, username)
    })
  })
  .catch(err => console.log(err))

  const breweries = document.getElementsByName('updateBreweries')[0]
  breweries.innerHTML = `<option value="" disabled selected hidden>Select Brewery</option>`
  fetch('/api/brewery')
  .then(res => res.json())
  .then(data => {
    let brewery = data
    
    return brewery.map(listItem => {

      let breweryName = createNode('option')
      breweryName.innerHTML = listItem.brewery
      
      append(breweries, breweryName)
    })
  })
  .catch(err => console.log(err))
}
function view() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  // document.getElementById('list').style.display="grid"
  
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
        {title:"Name", field:"username", width:200, responsive:0},
        {title:"Email", field:"email", hozAlign:"right", sorter:"number", width:150},
        {title:"Permissions", field:"permissions", width:150, responsive:2},
        {title:"Brewery", field:"brewery", width:150, responsive:2},
        ],
      });
      
    })
    .catch(err => console.log('There was an error.'))
  document.getElementById('list').style.display="block"
}


// routes add
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
}
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let fails = await validateAdd()
  
  if(fails.length === 0) {
    var form = document.getElementById('frmAdd')
    let data = {}
    let i
    
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    data.permissions = parseInt(data.permissions)
    
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
}
async function validateAdd (ev){
  
  let failures = [];
  
  let username = document.getElementById('username').value
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  let permissions = document.getElementById('permissions').value
  let brewery = document.getElementById('brewery_id').value

  let query = api + username

  let res = await fetch(query)
  let body = await res.json()
  let check = body.username
  
  if(check !== 'Empty') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if( email === ""){
      failures.push({input:'email', msg:'Required Field'})
  } 
  if( password === ""){
      failures.push({input:'password', msg:'Required Feild'})
  } 
  if( permissions === ""){
      failures.push({input:'permissions', msg:'Required Field'})
  }
  if( brewery === ""){
      failures.push({input:'brewery', msg:'Required Field'})
  }
  return failures
}

// routes update
function resetUpdate(ev){
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
}
async function sendUpdate(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let fails = await validateUpdate()

  if(fails.length === 0) {
    let form = document.getElementById('frmUpdate')
    let data = {}
    let i

    for (i = 1; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
    }
    data.permissions = parseInt(data.permissions)
    
    let name = document.getElementsByName('updateUsers')[0].value
    
    fetch(api + name, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(data)
    })

  } else {

    console.log(fails)

  }




    
    
  //   fetch('/api/auth/register', {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //     method: 'POST',
  //     body: JSON.stringify(data)
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     let response = data
  //     console.log(data)
  //     alert(data.msg)
  //   })
  //   .catch(err => alert('There was an error'))
  // }

}
function validateUpdate(ev){
  let failures = [];
  
  let username = document.getElementsByName('updateUsers')[0].value
  let permissions = document.getElementsByName('updatePermissions')[0].value
  let brew = document.getElementsByName('updateBreweries')[0].value
  

  if( username === ""){
      failures.push({input:'username', msg:'Required Field'})
  } 
  if( permissions === ""){
      failures.push({input:'permissions', msg:'Required Feild'})
  } 
  if( brew === ""){
      failures.push({input:'brewery', msg:'Required Field'})
  }

  return failures

}



document.getElementById('btnAddClear').addEventListener('click', resetAdd);
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd);

document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate);
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate);

document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view

