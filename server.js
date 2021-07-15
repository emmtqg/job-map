const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');

app.use(express.static("public"));
app.use(cors());

app.listen(port, () => console.log(`Listening on port ${port}`));

// GET routes
app.get('/example', (req, res) => {
    res.send({example:"this is an example!"});
});

//create a GET route for serving data.json
app.get('/locations', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "data.json"));
});
