/*jshint esversion: 6 */ 
const fs = require("fs");


module.exports = function(app) {
  app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

 
  app.post("/api/notes", function(req, res) {
    let userArray = [];
    let userNote = req.body;
    let id = userNote.id;

    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      userArray = JSON.parse(data);
  
      let id = 1;
      if (userArray.length > 0) {
        const lastId = userArray[userArray.length - 1].id;
        if (lastId) {
          id = lastId + 1;
        }
      }

      userNote.id = id;
      userArray.push(userNote); 

      fs.writeFile("./db/db.json", JSON.stringify(userArray, null, 2), err => {
        if (err) throw err;
      });
    });
      res.json(userNote);
  });

 
  app.delete("/api/notes/:id", (req, res) => {
    let selected = parseInt(req.params.id);

    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      userArray = JSON.parse(data);

      for (let i = 0; i < userArray.length; i++) {
        if (selected === userArray[i].id) {
          res.json(userArray.splice(i, 1));
        }
      }
      fs.writeFile("./db/db.json", JSON.stringify(userArray, null, 2), err => {
        if (err) throw err;
        console.log(`Deleted Note #${selected}`);
      });
    });
  });
};