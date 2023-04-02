const express = require('express');
const port = 5000;

const app = express();

const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to the RandomIdeas API' });
});

//Get all ideas
app.get('/api/ideas', (request, response) => {
  response.json({ success: true, data: ideas });
});
//the :id will get
app.get('/api/ideas/:id', (request, response) => {
  //higher order array method find() will loop through ideas with a function and find the idea with the same id as the id being searched for in the request
  const idea = ideas.find((idea) => idea.id === +request.params.id);

  //this runs if there is no matching id
  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: 'Resources not found' });
  }

  //this responds with the idea
  response.json({ success: true, data: idea });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
