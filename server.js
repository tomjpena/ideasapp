const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectdb = require('./config/db');

connectdb();

const app = express();

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
//This will parse data passed into the body. Usually form data or JSON
//The .use method specifies the use of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS middleware
app.use(
  cors({
    origins: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to the RandomIdeas API' });
});

//imports the express object from ideas.js in the /routes/ folder
const ideasRouter = require('./routes/ideas');
//  This passes the base route to the get/post/delete/put methods as the start of the route into the express object created in the previous line
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
