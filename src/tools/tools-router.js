const express = require('express');
const xss = require('xss');
const ToolsRouter = express.Router();
const ToolsService = require('../tools/tools-service')

const serializeTool = tool => ({
  id: tool.id,
  tool_name: xss(tool.tool_name),
  tool_category: tool.tool_category,
  tool_desc: xss(tool.tool_desc),
  tool_img_filename: tool.tool_img_filename,
  tool_img_alt: tool.tool_img_alt,
})

// GET request for all tools
ToolsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    ToolsService.getAllTools(knexInstance)
      .then(tools => {
        res.json(tools);
      })
      .catch(next)
  })

  // GET request for one tool
ToolsRouter
  .route('/:tool_id')
  .all((req, res, next) => {
    const { tool_id } = req.params
    ToolsService.getById(
      req.app.get('db'),
      tool_id
    )
      .then(tool => {
        if (!tool) {
          return res.status(404).json({
            error: { message: `Tool does not exist`}
          })
        }
        res.tool = tool
        next()
      })
      .catch(next)
  })
  .get((req, res) => {
    res.json(serializeTool(res.tool))
  })

module.exports = ToolsRouter;