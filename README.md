# Document Management System API
[![Code Climate](https://codeclimate.com/github/andela-tisrael/checkpoint-document-management/badges/gpa.svg)](https://codeclimate.com/github/andela-tisrael/checkpoint-document-management)
[![Coverage Status](https://coveralls.io/repos/github/andela-tisrael/checkpoint-document-management/badge.svg?branch=chore%2F139349607%2Fsetup-api-tests)](https://coveralls.io/github/andela-tisrael/checkpoint-document-management?branch=chore%2F139349607%2Fsetup-api-tests)
[![Build Status](https://travis-ci.org/andela-tisrael/checkpoint-document-management.svg?branch=development)](https://travis-ci.org/andela-tisrael/checkpoint-document-management)

### About Document Management Systems
This a Javascript implemented document management api with access levels, roles and priviledges.
Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.
Users are categorized by roles.

#### Postman Collection
Run the App on `POSTMAN`.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7b9cef8351c59f45c874)
#### *Features*

#### *Features*

1. **Authentication**
- It uses JWT for authentication.  
- It generates a token and returns to the client.  
- It verifies the token on every request to authenticated endpoints.

2. **Users**
- It allows users to be created.  
- It sets a newly created user's role to `regular` by default.   
- It allows only the created user to edit, and update its information.   
- All registered users can be retrieved by the admin user.

3. **Roles**
- It ensures that users have a role.   
- It ensures users roles could be `admin` or `regular`.   
- It ensures new roles can be created, updated and deleted by an admin user.   
- It returns all roles to an admin user.

4. **Documents**
- It allows new documents to be created/saved by users.  
- It ensures all documents have an access defined (default access is `public`).  
- It allows only admin users to retrieve all documents regardless of the document access.  
- It ensures ONLY private and public access documents to be retrieved by its owners, along with documents with role access of the user.     
- It ensures only authenticated users can delete, edit and update documents they own.   
- It allows admin to delete any document regardless of the document access level.   

#### *API Endpoints*
| **HTTP Verb** | **Endpoint** | **Functionality**|
|------|-------|-----------------|
| **POST** | /users/login | Logs a user in and returns a token which should be subsequently used to access authenticated endpoints |
| **POST** | /users/logout | Logs a user out |
| **POST** | /users/ | Creates a new user. Required attributes are `firstName`, `lastName`, `email`, `password`. If a `role` is not specified, a defualt role of `regular` created |
| **GET** | /users/ | Fetch all registered users (`admin` privilege required) |
| **GET** | /users/:id | Fetch a user by specific id (`admin` privilege required) |
| **PUT** | /users/:id | Update a specific user (by id) attributes|
| **DELETE** | /users/:id |Delete a specific user by id. (`admin` privilege required |
| **POST** | /documents/ | Creates a new document instance. Required attributes are `title` and `content`. If an `access` is NOT specified, the document is marked  _public_ |
| **GET** | /documents/ | Fetch all documents (returns all documents based on each document access right and the requesters role) |
| **GET** | /documents/:id | Fectch a specific document by it's id |
| **PUT** | /documents/:id | Update specific document attributes by it's id |
| **DELETE** | /documents/:id | Delete a specific document by it's id |
| **GET** | /users/:id/documents | Find all documents belonging to the specified user |
| **POST** | /roles/ | Create a new role (`admin` privilege required) |
| **GET** | /roles/ | Fetches all roles (`admin privilege required`) |
| **GET** | /roles/:id | Find a role by id (`admin privilege required`) |
| **PUT** | /roles/:id | Update role attributes (`admin privilege required`) |
| **DELETE** | /delete/:id | Delete role (`admin privilege required`) |

#### *Contributing*
1. Fork this repository to your GitHub account
2. Clone the forked repository
3. Create your feature branch
4. Commit your changes
5. Push to the remote branch
6. Open a Pull Request

#### *Technologies*
Technologies Used in the development of this api include the following
* [node.js] - evented I/O for the backend
* [babel-cli] - Babel Command line interface 
* [babel-core] - Babel Core for javascript transpiling
* [babel-loader] - Adds Babel support to Webpack
* [babel-preset-es2015] - Babel preset for ES2015
* [babel-preset-react] - Add JSX support to Babel
* [babel-preset-react-hmre] - Hot reloading preset for Babel
* [babel-register] - Register Babel to transpile our Mocha tests]
* [eslint] - Lints JavaScript
* [expect] - Assertion library for use with Mocha
* [express] - Serves development and production builds]
* [mocha] - JavaScript testing library
* [npm-run-all] - Display results of multiple commands on single command line
* [webpack] - Bundler with plugin system and integrated development server
* [webpack-dev-middleware] - Adds middleware support to webpack
* [webpack-hot-middleware] - Adds hot reloading to webpack


   [mocha]: <https://mochajs.org>
   [node.js]: <http://nodejs.org>
   [Gulp]: <http://gulpjs.com>
   [babel-cli]: <https://babeljs.io/>
   [babel-core]: <https://babeljs.io/>
   [babel-loader]: <https://babeljs.io/>
   [babel-preset-es2015]: <https://babeljs.io/>
   [babel-preset-react]: <https://babeljs.io/>
   [babel-preset-react-hmre]: <https://babeljs.io/>
   [babel-register]: <https://babeljs.io/>
   [eslint]: <http://eslint.org/>
   [expect]: <http://chaijs.com/api/bdd/>
   [express]: <http://expressjs.com/>
   [mocha]: <https://mochajs.org/>
   [npm-run-all]: <https://www.npmjs.com/package/npm-run-all>
   [webpack]: <https://webpack.github.io/>
   [webpack-dev-middleware]: <https://webpack.github.io/>
   [webpack-hot-middleware]: <https://webpack.github.io/>

# LICENSE
 © `Tomilayo Israel`