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