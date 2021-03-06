const express = require('express');
const path = require('path');
const CheckoutsService = require('./checkouts-service');
const checkoutsRouter = express.Router();
const jsonBodyParser = express.json();

checkoutsRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const myBasketArrOfObjs = req.body;

    // check if the user exists in the database
    CheckoutsService.checkUserExists(
      req.app.get('db'),
      myBasketArrOfObjs[0].user_id
    )
      .then(userExists => {
        if(!userExists)
          return res.status(400).json({ error: `User does not exist, please create an account.`})
      // insert tool_ids and user_ids into the checkouts table
          return CheckoutsService.checkoutTools(
            req.app.get('db'),
            myBasketArrOfObjs
          )
      // return the checked out tools in an array
            .then(tool => {
              const toolArray = [];
              for(var i =0;i < tool.length; i++){
                toolArray.push(tool[i].tool_id);
              }
              res
                .status(201)
                // .location("http://localhost:3000/mytools")
                .location(req.originalUrl)
                .send(toolArray)
            }) 
        }
      )
      .catch(next);
  })

  module.exports = checkoutsRouter;