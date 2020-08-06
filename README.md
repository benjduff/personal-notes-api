# Personal note taker - API
A RESTful API created to provide a backend service to [Personal note taker - Frontend](https://github.com/benjduff/personal-notes-frontend). This API can be used to GET, POST or DELETE data relating to Users, Blog Posts and User Sessions/Authentication.

### Usage
This API uses [mongoose](https://www.npmjs.com/package/mongoose) to create non relational model schemas for use with [MongoDb](https://www.mongodb.com/). To update the db path and JsonWebToken secret key navigate to ```config/database.js```.

##### Structure
To maintain organisation and avoid confusion, files are organised using a 'Model/Controller/Route' structure.
* Models: Mongoose model schema and database queries.
* Controllers: Business logic, database query callbacks and request/response handling.
* Routes: Define accepted HTTP request methods and expressjs router parameters.

### Dependencies
* bcryptjs
* body-parser
* cors
* express
* jsonwebtoken
* moment
* mongoose

### API Documentation

API Endpoints | HTTP Method | Description
--------------|--------|---------
/ | GET | Get all available blog posts
/createpost | POST | Create a new blog post
/delpost/:postId | DELETE | Delete blog post using postId 
/getpost/:postId | GET | Get blog post using postId
/editpost/:postId | POST | Update blog post using postId
/session/:token | GET | Validate user auth token
/register | POST | Register a new user
/login | POST | Authenticate existing user

### Contributions
If you would like to add a feature/endpoint, please feel free to submit a pull request.

### License
[MIT](https://github.com/benjduff/blog-template-api/blob/master/LICENSE)
