// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });
const fs = require("fs")
const Path = require("path");

const express = require('express');
const cors = require('cors');
// get MongoDB driver connection
const dbo = require('./server/db/Connection');

const PORT = process.env.PORT || 5000;
const app = express();

function requireAll(Directory) {
  fs.readdirSync(Directory).forEach(File => {
      const Absolute = Path.join(Directory, File);
      if (fs.statSync(Absolute).isDirectory()) return requireAll(Absolute);
      else app.use(require(Absolute))
  });
}

app.use(cors());
app.use(express.json());
requireAll(process.cwd() + "/server/routes");

// Global error handling
app.use(function (err, _req, res, _next) {
  res.status(500)
  res.send('Invalid Path.');
});

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
