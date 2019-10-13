const ToolsService = {
  getAllTools(knex) {
    return knex
      .select([
        'tools.id',
        'tools.tool_name',
        'tools.tool_category',
        'tools.tool_desc',
        'tools.tool_img_filename',
        'tools.tool_img_alt',
        'checkouts.return_date'
      ])
      .from('tools')
      .leftJoin('checkouts', 'tools.id', '=', 'checkouts.tool_id')
      .orderBy('tools.tool_name', 'desc')
  },
  getById(knex,id) {
    return knex
    .select('*')
    .from('tools')
    .where('id', id)
    .first()
  },
  getUserTools(db, user_id){ 
    return db
    .select(['tool_id'])
    .from('checkouts')
    .where('user_id', user_id)
  },
 }
 
 module.exports = ToolsService;