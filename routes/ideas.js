const express = require('express');
const router = express.Router();

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

//Get all ideas
//this file will be connected to /api/ideas so the get/post/etc will only need '/'
router.get('/', (request, response) => {
  response.json({ success: true, data: ideas });
});

//Get single idea
//the :id will take any request thats baseURLpassedfromserver.js/${id}
router.get('/:id', (request, response) => {
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

//Add an idea
router.post('/', (request, response) => {
  const idea = {
    id: ideas.length + 1,
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  ideas.push(idea);

  response.json({ success: true, data: idea });
});

//Update Idea
router.put('/:id', (request, response) => {
  //higher order array method find() will loop through ideas with a function and find the idea with the same id as the id being searched for in the request
  const idea = ideas.find((idea) => idea.id === +request.params.id);

  //this runs if there is no matching id
  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: 'Resources not found' });
  }

  //These lines will update the exist idea in the 'idea' variable with the data entered into the request idea. If no request idea data is found, that field will stay as it is
  idea.text = request.body.text || idea.text;
  idea.tag = request.body.tag || idea.tag;

  //this responds with the idea
  response.json({ success: true, data: idea });
});

// Delete Idea
router.delete('/:id', (request, response) => {
  //higher order array method find() will loop through ideas with a function and find the idea with the same id as the id being searched for in the request
  const idea = ideas.find((idea) => idea.id === +request.params.id);

  //this runs if there is no matching id
  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: 'Resources not found' });
  }

  //These lines will find the index of the idea to be deleted and splice the ideas array to remove the idea from the array
  const index = ideas.indexOf(idea);
  ideas.splice(index, 1);

  //this responds with the idea
  response.json({ success: true, data: {} });
});

module.exports = router;
