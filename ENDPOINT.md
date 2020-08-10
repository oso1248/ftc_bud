## /api/auth
  post:   /register - {"username":"","password":"","email":"","permissions":1  
  post:   /login - {"username":"","password":""}  
  get:    /logout

## /api/user
  get:    /  
  get:    /:id

## /api/uom
  post:   / - {"uom": ""}  
  get:    /  
  get:    /:id  
  patch:  /:id - {"uom":""}  
  delete: /:id

## /api/enviro
  post:   / - {"enviro": ""}  
  get:    /  
  get:    /:id  
  patch:  /:id - {"enviro":""}  
  delete: /:id

## /api/location
  post:   / - {"location": ""}  
  get:    /  
  get:    /:id  
  patch:  /:id - {"location":""}  
  delete: /:id

## /api/container
  post:   / - {"container": ""}  
  get:    /  
  get:    /:id  
  patch:  /:id - {"container":""}  
  delete: /:id

## /api/supplier
  post:   / - {"company":"","contact":"","email":"","phone":"","address":"","note":""}  
  get:    /  
  get:    /:id  
  patch:  /:id - {"company":"","contact":"","email":"","phone":"","address":"","note":""}  
  delete: /:id

## /api/commodity
  post:   / - {"commodity":"","active":"","sap":"","threshold":"","per_pallet":"","unit_total":"","note":"","uom_id":"","type_id":"","location_id":"","enviro_id":"","container_id":"","supplier_id":""}
  get:    /  
  get:    /:id  
  patch:  /:id - 
  delete: /:id