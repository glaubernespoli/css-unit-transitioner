const express = require('express');
var path = require('path');

const port = 5000;
const app = express();
const public = path.resolve(__dirname, '../public');

app.use(
    express.static(public)
).listen(port, () =>
    console.log(`Server up on port ${port}`)
);