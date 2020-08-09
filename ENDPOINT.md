## /api/auth
  post:   /register - {"username":"Tim","password":"pass","email":"123@123.com","permissions":1}
  post:   /login - {"username":"Tim","password":"pass"}
  get:    /logout

## /api/uom
  post:   / - {"uom": "gal"}
  get:    /
  get:    /:id
  patch:  /:id {"uom":"gal"}
  delete: /:id

## /api/user
  get:    /
  get:    /:id


