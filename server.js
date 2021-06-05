

const port = process.env.PORT || 3000;
const express = require('express');
const app = express();


app.use('/static', express.static('static'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/index.html");
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

