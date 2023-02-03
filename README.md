# SocNetAPI

## Description
A full video demo can be seen here: [SocNetAPI-Demo](https://drive.google.com/file/d/1aYNSepfgwBBxxW-pEKQyEaPwcZA46fJU/view)
This application is a Social Network API which uses Express.js, a MongoDB database, Mongoose ODM and Moment.js. Using this application users can share their thoughts and react to their friend's thoughts. Building this application I learned a lot about the flexibility of MongoDB/Mongoose, as well as the importance and value of a well placed `console.log()`. 


## Installation

To use this application the user must first run an `npm install` within the terminal inside the SocNetAPI file to install all required packages. Then, the user should run a `node index.js` in the terminal to fire up the server. After that, navigate to Insomnia and input `http://localhost:3001/api/users` in the address to GET started!

## Usage
Using Insomnia the user can navigate throughout the SocNetAPI as follows:

### Users
1. GET all users `http://localhost:3001/api/users`
2. GET single user `http://localhost:3001/api/users/:userId`
3. CREATE(POST) user `http://localhost:3001/api/users` - additional JSON objects must be input - {"username": "Desired name here", "email": "useremail@example.com"}
4. DELETE user `http://localhost:3001/api/users/:userId` - This will delete both user and all of their thoughts
5. UPDATE(PUT) user `http://localhost:3001/api/users/:userId` - additional JSON objects must be input, either username or email can be changed; {"username": "Updated username"}

### Thoughts
1. GET all thoughts `http://localhost:3001/api/thoughts`
2. GET single thought `http://localhost:3001/api/thoughts/:thoughtId`
3. CREATE(POST) thought `http://localhost:3001/api/thoughts` - additional JSON objects must be input - EX: {
	"username": "Klaus",
	"thoughtText": "Du bist schlau!",
	"userId": "63da04b77e3837a98a1f53a5"
}
4. DELETE thought `http://localhost:3001/api/thoughts/:thoughtId`
5. UPDATE(PUT) thought `http://localhost:3001/api/thoughts/:thoughtId` - additional JSON objects must be input - EX: { "thoughtText": "Wow this is SOOOOO amazing!" }

### Reactions
1. CREATE(POST) reaction `http://localhost:3001/api/thoughts/:thoughtId/reactions` - additional JSON objects must be input - EX: {"reactionBody": "LOL", "username": "Jakey"}
2. DELETE reaction `http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId`

## License

MIT License
