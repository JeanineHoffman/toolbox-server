const ToolsService = {
  getAllTools(knex) {
    return knex.select('*').from('tools')
  },
  getById(knex,id) {
    return knex
    .select('*')
    .from('tools')
    .where('id', id)
    .first()
  },
 }
 
 module.exports = ToolsService;