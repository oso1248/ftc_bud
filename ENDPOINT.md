## /api/auth
  post:   /register - {"username":"","password":"","email":"","permissions":1  
  post:   /login - {"username":"","password":""}  
  get:    /logout

## /api/user
  get:    /  
  get:    /:id

## /api/uom
  post:   / - {"uom":"","note":""}  
  get:    /  
  get:    /:name  
  patch:  /:name - {"note":""}  
  delete: /:name

## /api/enviro
  post:   / - {"enviro":"","note":""}  
  get:    /  
  get:    /:name  
  patch:  /:name - {"note":""}  
  delete: /:name

## /api/location
  post:   / - {"location":"","note":""}  
  get:    /  
  get:    /:name  
  patch:  /:name - {"note":""}  
  delete: /:name

## /api/container
  post:   / - {"container":"","note":""}  
  get:    /  
  get:    /:name  
  patch:  /:name - {"note":""}  
  delete: /:name

  ## /api/type
  post:   / - {"type":"","note":""}  
  get:    /  
  get:    /:name  
  patch:  /:name - {"note":""}  
  delete: /:name

## /api/supplier
  post:   / - {"company":"","contact":"","email":"","phone":"","address":"","note":""}  
  get:    /  
  get:    /:name  
  patch:  /:name - {"contact":"","email":"","phone":"","address":"","note":""}  
  delete: /:name

## /api/commodity
  post:   / - {"commodity":"","active":"","sap":"","threshold":"","per_pallet":"","unit_total":"","note":"","uom_id":"","type_id":"","location_id":"","enviro_id":"","container_id":"","supplier_id":""}
  get:    /  
  get:    /:name  
  patch:  /:name - {"active":"","sap":"","threshold":"","per_pallet":"","unit_total":"","note":"","uom_id":"","type_id":"","location_id":"","enviro_id":"","container_id":"","supplier_id":""}
  delete: /:name