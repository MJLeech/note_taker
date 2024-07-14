const app = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('./fsUtils');

// GET Route for retrieving all the feedback
app.get('/notes', async (req, res) =>{
  const data = await readFromFile('./db/db.json')
 res.json(JSON.parse(data))
});

// POST Route for submitting feedback
app.post('/notes', (req, res) => {
  console.log(req.body);
  const { title, text } =req.body
  
  if(req.body) {
    const newNote = {
        title,
        text,
        id: uuidv4()
    }
    readAndAppend(newNote, './db/db.json')
    res.json('Note added')
}    else {
        res.errored("Error, please try again")
    }
});

module.exports = app;
