const express = require('express');
const path = require('path');
const CheckoutsService = require('./checkouts-service');
const checkoutsRouter = express.Router();
const jsonBodyParser = express.json();

checkoutsRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { checkoutsObj } = req.body;
    
    // check if the user exists in the database
    CheckoutsService.checkUserExists(
      req.app.get('db'),
      user_id
    )
      .then(userExists => {
        if(!userExists)
          return res.status(400).json({ error: `User does not exist, please create an account.`})
      // insert tool_ids and user_ids into the checkouts table
          return CheckoutsService.checkoutTools(
            req.app.get('db'),
            checkoutsObj
          )
      // return the checked out tools in an array
            .then(tool => {
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${user_id}`))
                .json(tool)
            }) 
        }
      )
      .catch(next);
  })

  module.exports = checkoutsRouter;