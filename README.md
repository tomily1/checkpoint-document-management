# Document Management System API
[![Code Climate](https://codeclimate.com/github/andela-tisrael/checkpoint-document-management/badges/gpa.svg)](https://codeclimate.com/github/andela-tisrael/checkpoint-document-management)
[![Coverage Status](https://coveralls.io/repos/github/andela-tisrael/checkpoint-document-management/badge.svg?branch=development)](https://coveralls.io/github/andela-tisrael/checkpoint-document-management?branch=chore%2F139349607%2Fsetup-api-tests)
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
| **POST** | /users/login | Logs a user in and returns a token which should be subsequently used to access authenticated endpoints. request parameters include `email` and `password`|
| **POST** | /users/logout | Logs a user out |
| **POST** | /users/ | Creates a new user. Required attributes are `firstName`, `lastName`, `email`, `password`. If a `role` is not specified, a defualt role of `regular` is created |
| **GET** | /users/ | Fetch all registered users (`admin` privilege required) |
| **GET** | /users/:id | Fetch a user by specific id (`admin` privilege required). parameter: `id` of the particular user as url query |
| **PUT** | /users/:id | Update a specific user (by id) attributes.  parameter: `id` of the particular user as url query|
| **DELETE** | /users/:id |Delete a specific user by id. (`admin` privilege required).  parameter: `id` of the particular user as url query |
| **POST** | /documents/ | Creates a new document instance. Required attributes are `title`, `content` and `access`. If an `access` is NOT specified, the document is marked  _public_ by default |
| **GET** | /documents/ | Fetch all documents (returns all documents based on each document access right and the requesters role) |
| **GET** | /documents/:id | Fectch a specific document by it's id. parameter: `id` of the particular document as url query|
| **PUT** | /documents/:id | Update specific document attributes by it's id. parameter: `id` of the particular document as url query |
| **DELETE** | /documents/:id | Delete a specific document by it's id. parameter: `id` of the particular document as url query |
| **GET** | /users/:id/documents | Find all documents belonging to the specified user.  parameter: `id` of the particular user as url query to get the correponding documents belonging to that user |
| **POST** | /roles/ | Create a new role (`admin` privilege required) |
| **GET** | /roles/ | Fetches all roles (`admin privilege required`) |
| **GET** | /roles/:id | Find a role by id (`admin privilege required`).  parameter: `id` of the particular role as url query |
| **PUT** | /roles/:id | Update role attributes (`admin privilege required`).  parameter: `id` of the particular role as url query |
| **DELETE** | /delete/:id | Delete role (`admin privilege required`).  parameter: `id` of the particular role as url query |

## Sample Requests and Responses
### Roles
Endpoints for role API
- [Get Roles](#get-roles)
- [Create Role](#create-roles)
- [Delete Role](#delete-role)

#### Get Roles
#### Request
- Endpoint: GET: `/roles`
- Requires: Authentication and Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "admin",
    "createdAt": "2017-03-03T13:28:22.003Z",
    "updatedAt": "2017-03-03T13:28:22.003Z"
  }
  {
    "id": 3,
    "title": "regular",
    "createdAt": "2017-03-03T13:28:22.003Z",
    "updatedAt": "2017-03-03T13:28:22.003Z"
  }
]
```

### Create Role
#### Request
- Endpoint: POST: `/roles`
- Requires: Authentication and Admin Access Level
- Body `(application/json)`
```json
{ "title": "supervisor" }
```
#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
  "role": {
    "id": 3,
    "title": "supervisor",
    "updatedAt": "2017-03-07T15:57:29.019Z",
    "createdAt": "2017-03-07T15:57:29.019Z"
  }
```

### Delete Role

#### Request
- Endpoint: DELETE: `/roles/:id`
- Requires: Authentication and Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "Role Successfully deleted from database"
}
```


### Users
Endpoint for Users API.
  - [Create user](#create-user)
  - [Get all users](#get-users)
  - [Get single user](#get-single-user)
  - [Edit user](#edit-user)
  - [Delete user](#delete-user)
  - [Login](#login)
  - [Logout](#logout)

### Create User

#### Request
- Endpoint: POST: `/users`
- Body `(application/json)`
```json
{
  "username": "uniqueuser",
  "firstname": "First Name",
  "lastname": "Last Name",
  "email": "uniqueuser@unique.com",
  "password": "password"
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "User successfully signed up",
  "RoleId": 2,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCsdfdfdI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZmlyc3RuYW1lIjoiRGFyaXVzIiwibGFzdG5hbWUiOiJKYXN0IiwiZW1haWwiOiJvcmViYW40dUB5YWhvby5jby51ayIsImRlcGFydG1lbnRJZCI6MSwiaWF0IjoxNDg4OTA4ODczLCJleHAiOjE0ODg5MTYwNzN9.ou0fzsufXyPNojT1shLa4N2zEuV9rvtPKcrs_amlYrQ",
  "expiresIn": "86400"
}
```

### Get Users

#### Request
- Endpoint: GET: `/users`
- Requires: Authentication and Admin access.

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
  [
    {
      "id": 1,
      "username": "super",
      "firstname": "Sydnie",
      "lastname": "Mitchell"
    },
    {
      "id": 2,
      "username": "cook",
      "firstname": "Louisa",
      "lastname": "Murazik"
    }
  ]
```

### Get Single User

#### Request
- Endpoint: GET: `/users/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "username": "super",
  "firstname": "Sydnie",
  "lastname": "Mitchell"
}
```

### Edit User

#### Request
- Endpoint: PUT: `/users/:id`
- Requires: Authentication and Admin/Owner Access Level
- Body `(application/json)`
```json
{
  "username": "editeduser",
  "firstname": "Edited User",
  "lastname": "Edited User",
  "email": "editeduser@unique.com",
  "password": "password"
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
    "id": 9,
    "username": "edited",
    "firstname": "editeduser",
    "lastname": "user",
    "email": "editeduser@admin.com",
    "createdAt": "2017-03-07T16:56:09.880Z",
    "updatedAt": "2017-03-07T17:30:07.385Z"
    }
```

### Delete User

#### Request
- Endpoint: DELETE: `/user/:id`
- Requires: Authentication and Super Admin Access Level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "User Successfully deleted from database"
}
```

### Login

#### Request
- Endpoint: POST: `users/login`
- Requires: Authentication of User or Admin to gain token for access.
- Body `(application/json)`
```json
{
  "email": "test@test.com",
  "password": "test"
}
```

#### Response
- Status `200: OK`
- Body `(application/json)`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCsdfdfdI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdXBlcmFkbWluIiwiZmlyc3RuYW1lIjoiRGFyaXVzIiwibGFzdG5hbWUiOiJKYXN0IiwiZW1haWwiOiJvcmViYW40dUB5YWhvby5jby51ayIsImRlcGFydG1lbnRJZCI6MSwiaWF0IjoxNDg4OTA4ODczLCJleHAiOjE0ODg5MTYwNzN9.ou0fzsufXyPNojT1shLa4N2zEuV9rvtPKcrs_amlYrQ",
  "expiresIn": "86400"
}
```

### Logout

#### Request
- Endpoint: POST: `users/logout`
- Requires: Authentication of User or Admin to delete token from localStorage.
- Body `(application/json)`

#### Response
- Status `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
 "message": "User logged out successfully"
}
```

## Documents
Endpoint for Documents.
  - [Create document](#create-document)
  - [Get all documents](#get-all-documents)
  - [Get single document](#get-single-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)
  - [Search Documents](#search-documents)
  - [Find User Documents](#user-documents)

### Create Document

#### Request
- Endpoint: POST: `/documents`
- Body `(application/json)`
```json
{
  "title": "readmi",
  "content": "this is a demo dare to ask for the impossible.",
  "access": "public",
  "OwnerId": 2
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "Document successfully created",
  "document": {
    "id": 8,
    "title": "readmi",
    "content": "this is a demo dare to ask for the impossible.",
    "access": "public",
    "OwnerId": 2,
    "updatedAt": "2017-03-07T18:20:20.929Z",
    "createdAt": "2017-03-07T18:20:20.929Z"
  }
}
```

### Get Documents

#### Request
- Endpoint: GET: `/documents`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "results": [
    {
      "id": 1,
      "title": "Integrated regional info-mediaries",
      "content": "Voluptas et nostrum assumenda ea velit facere molestiae reprehenderit atque. Optio laboriosam harum. Aut ut nemo tenetur. Architecto praesentium aut at. Corrupti totam quo.",
      "OwnerId": 3,
      "access": "public",
      "createdAt": "2017-03-06T12:02:27.902Z"
    },
    {
      "id": 2,
      "title": "we worship forever",
      "content": "Reiciendis voluptate error voluptatem possimus dolores provident neque aut nemo. Ab in quia ut quos ipsum veritatis consequatur alias. Quae aut facilis.",
      "OwnerId": 5,
      "access": "public",
      "createdAt": "2017-03-06T12:02:27.902Z"
    }
  ]
}
```

### Get Single Document

#### Request
- Endpoint: GET: `/documents/:id`
- Requires: Authentication, Admin or user Access for public documents, Admin/Owner access for private documents, admin/role access for role documents

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "Document found",
  "document": {
    "id": 6,
    "title": "Enhanced client-driven focus group",
    "content": "Placeat aspernatur dolores corporis. Ipsum similique maiores quisquam ratione vel.",
    "OwnerId": 3,
    "access": "public",
    "createdAt": "2017-03-06T12:02:27.902Z",
    "updatedAt": "2017-03-06T12:02:27.902Z"
  }
}
```

### Edit Document

#### Request
- Endpoint: PUT: `/documents/:id`
- Requires: Authentication and Super Admin/Owner Access Level
- Body `(application/json)`
```json
{
  "title": "readmi",
  "content": "this is a demo dareasdfasdfsfaf to ask for the impossible.",
  "access": "private"
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 6,
  "title": "readmi",
  "content": "this is a demo dareasdfasdfsfaf to ask for the impossible.",
  "access": "private",
  "OwnerId": 3,
  "createdAt": "2017-03-06T12:02:27.902Z",
  "updatedAt": "2017-03-07T18:40:19.108Z"
}
```

### Delete Document

#### Request
- Endpoint: DELETE: `/documents/:id`
- Requires: Authentication and Admin Access Level or Owner access level

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "message": "Document has been successfully deleted"
}
```

### Search Documents

#### Request
- Endpoint: GET: `/documents/?query=searchQuery`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "success": true,
  "results": [{
      "id": 1,
      "title": "Integrated regional info-mediaries",
      "content": "Voluptas et nostrum assumenda ea velit facere molestiae reprehenderit atque. Optio laboriosam harum. Aut ut nemo tenetur. Architecto praesentium aut at. Corrupti totam quo.",
      "OwnerId": 3,
      "access": "public",
      "createdAt": "2017-03-06T12:02:27.902Z"
    },
    {
      "id": 2,
      "title": "we worship forever",
      "content": "Reiciendis voluptate error voluptatem possimus dolores provident neque aut nemo. Ab in quia ut quos ipsum veritatis consequatur alias. Quae aut facilis.",
      "OwnerId": 7,
      "access": "public",
      "createdAt": "2017-03-06T12:02:27.902Z"
    }]
}
```

### Get User Documents

#### Request
- Endpoint: GET: `/users/:UserId/documents/`. e.g `/users/2/documents`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "Integrated regional info-mediaries",
    "content": "Voluptas et nostrum assumenda ea velit facere molestiae reprehenderit atque. Optio laboriosam harum. Aut ut nemo tenetur. Architecto praesentium aut at. Corrupti totam quo.",
    "OwnerId": 2,
    "access": "public",
    "createdAt": "2017-03-06T12:02:27.902Z"
  },
  {
    "id": 2,
    "title": "we worship forever",
    "content": "Reiciendis voluptate error voluptatem possimus dolores provident neque aut nemo. Ab in quia ut quos ipsum veritatis consequatur alias. Quae aut facilis.",
    "OwnerId": 2,
    "access": "public",
    "createdAt": "2017-03-06T12:02:27.902Z"
  }
]
```

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