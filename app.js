const express = require('express')
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express()
const port = 3000

app.use(
  bodyParser.raw({
    type: "application/pdf",
    limit: "100mb"
  })
);

const outfile = "./sample-redacted.pdf";

app.post("/redact", (req, res) => {
  try {
    console.log("POST /redact");

    // persist to disk
    fs.writeFileSync(outfile, req.body, "binary");
    console.log(`Persisted to ${outfile}`);
    res.sendStatus(200);

  } catch (e) {
    res.sendStatus(500);
  }
});

app.get('/redacted', function(request, response){ 
  var tempFile="./sample-redacted.pdf";
  fs.readFile(tempFile, function (err,data){
    if (err) {
      response.send("redacted pdf is not ready");
    } else {
      response.contentType("application/pdf");
      response.send(data);
    }

  });
});

app.get("/hello", (req, res) => {
  res.send('hello world!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

