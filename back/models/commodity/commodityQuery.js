const db = require('../../db/dbConfig')

module.exports = {
  commodityAdd,
  commodityFindAll,
  commodityFindById,
  commodityUpdate,
  commodityDelete,
}

// create
async function commodityAdd(jsonData){
  await uom(jsonData)  
  await type(jsonData)
  await location(jsonData)
  await enviro(jsonData)
  await container(jsonData)
  await supplier(jsonData)
  let query = [jsonData]
  const rtn = await db('mtl_commodity').insert(query, ['commodity'])
  const { name }= rtn[0]
  return commodityFindById(name)
}
// update
async function commodityUpdate(name, changes){
  await uom(changes)  
  await type(changes)
  await location(changes)
  await enviro(changes)
  await container(changes)
  await supplier(changes)
  return db('mtl_commodity')
    .where({commodity: name})
    .update(changes)
    .then(() => {
    return commodityFindById(name)
    })
}
// function to convert name to id number
async function uom(jsonData){
  let rtn = await db('mtl_uom').select('id').where('uom', jsonData['uom_id'])
  let {id} = rtn[0]
  jsonData['uom_id'] = id
  return jsonData
}
async function type(jsonData){
  let rtn = await db('mtl_type').select('id').where('type', jsonData['type_id'])
  let {id} = rtn[0]
  jsonData['type_id'] = id
  return jsonData
}
async function location(jsonData){
  let rtn = await db('mtl_location').select('id').where('location', jsonData['location_id'])
  let {id} = rtn[0]
  jsonData['location_id'] = id
  return jsonData
}
async function enviro(jsonData){
  let rtn = await db('mtl_enviro').select('id').where('enviro', jsonData['enviro_id'])
  let {id} = rtn[0]
  jsonData['enviro_id'] = id
  return jsonData
}
async function container(jsonData){
  let rtn = await db('mtl_container').select('id').where('container', jsonData['container_id'])
  let {id} = rtn[0]
  jsonData['container_id'] = id
  return jsonData
}
async function supplier(jsonData){
  let rtn = await db('mtl_supplier').select('id').where('company', jsonData['supplier_id'])
  let {id} = rtn[0]
  jsonData['supplier_id'] = id
  return jsonData
}

// read
function commodityFindById(name) {
  return db('mtl_commodity AS com')
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtl_location AS loc', 'com.location_id', 'loc.id' )
    .join('mtl_enviro as env', 'com.enviro_id', '=', 'env.id')
    .join('mtl_container as con', 'com.enviro_id', '=', 'con.id')
    .join('mtl_supplier as sup', 'com.supplier_id', '=', 'sup.id')
    .select(
      'com.commodity As Commodity',
      'sup.company AS Supplier',
      'typ.type AS Type',
      'con.container AS Container',
      'env.enviro AS Enviromental',
      'loc.location AS Location',
      'uom.uom AS UOM'
    )
  .where({'com.commodity': name})
  .first()
}
function commodityFindAll() {
  return db('mtl_commodity AS com')
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtl_location AS loc', 'com.location_id', 'loc.id' )
    .join('mtl_enviro as env', 'com.enviro_id', '=', 'env.id')
    .join('mtl_container as con', 'com.enviro_id', '=', 'con.id')
    .join('mtl_supplier as sup', 'com.supplier_id', '=', 'sup.id')
    .select(
      'com.commodity As Commodity',
      'sup.company AS Supplier',
      'typ.type AS Type',
      'con.container AS Container',
      'env.enviro AS Enviromental',
      'loc.location AS Location',
      'uom.uom AS UOM'
    )
    .orderBy('commodity', 'asc')
}

// delete
function commodityDelete(name) {
  return db('mtl_commodity')
  .where({commodity: name})
  .del()
}
