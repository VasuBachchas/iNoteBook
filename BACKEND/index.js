const connecttoMongo=require('./db');


const express = require('express');
var cors=require('cors');
connecttoMongo();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());//to use json in body

app.use('/api/auth',require('./Routes/auth'));
app.use('/api/notes',require('./Routes/notes'));
app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port ${port}`)
})