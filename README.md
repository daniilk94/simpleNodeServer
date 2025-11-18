# Simple Node.js + Express server

This project demonstrates basic CRUD operations built with Node.js and Express.

The API is documented using Swagger.

## Installation:

1. Download or clone this repository

2. Open Powershell in the project folder

3. Install required libraries with: **npm install**

4. Start the server with: **node app.js** or **npm start**

5. Open the homepage in your browser: http://localhost:3000/

## Login (JWT Authentication):

Accessing /data requires authentication.

### Login via Swagger:

1. Execute /login endpoint with provided input

2. Copy the given token from the response field "access_token"

3. Click authorize button in top right corner and paste token there

4. You can now test all endpoints requiring authorization

### Login via api.rest:

1. Click the last request in api.rest file

2. Copy the given token from the response field "access_token"

3. Paste that token in the Authorization field after word Bearer

4. You can now test the request

## Testing

- Automated testing is not supported at this point, since accessing /data requires login

- You can use the **api.rest** file to manually send requests to the server (using VS Code REST client extension)

- Endpoints can also be tested directly via **SwaggerUI**

### Other Resources:

**SwaggerUI documentation:** http://localhost:3000/doc
