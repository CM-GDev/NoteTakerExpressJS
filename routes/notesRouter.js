//
const express = require("express");
const router = express.Router();

const { readFromFile, readAndAppend, deleteID } = require('../helpers/fsUtils');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
  
  // POST Route for a new note
router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const {title, text} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
});

// GET Route for retrieving all the notes
router.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for notes`);

    const id = req.url;
    const cleanID = id.slice(1);
        
    // console.log(id);
    console.log(cleanID);

    if(req.body) { 
        deleteID(cleanID,'./db/db.json');
        res.json(`Note successfully deleted`);
    } else {
      res.error('Error in deleting note');
    }
});

module.exports = router

