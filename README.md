
## serverChoke (RESTful API Server with Node.js and MongoDB).

The API is deployed here : https://shrouded-harbor-6203.herokuapp.com/

To authenticate, go there : https://shrouded-harbor-6203.herokuapp.com/api/auth/facebook 

To get a list of your events, go there : https://shrouded-harbor-6203.herokuapp.com/api/myevents

To get information about a specific event, go there : https://shrouded-harbor-6203.herokuapp.com/event/:id  with :id replace with an event facebookID (in the URL of the event, most of the time).

To get a list of the attending users of an event, go there : https://shrouded-harbor-6203.herokuapp.com/event/attending/:id

To get a list of the users who declined the event, go there : https://shrouded-harbor-6203.herokuapp.com/event/declined/:id

There are a few other routes, but the idea is the same. You can find them in the api.js file in the routes/ folder.

#### Requirements
* Node JS
* MongoDB

#### Install
* npm install

#### Run
* node server.js

#### Test
* mocha
