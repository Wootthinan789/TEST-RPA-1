var express = require('express');
var bodyParser = require('body-parser');
var iClaim = require('./routes/iClaim');
var bodyParser = require('body-parser')
var app = express()
app.use(express.json({limit:'1000MB'}));
var port =443
var cors=require('cors')
app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/iClaim',iClaim );


const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

