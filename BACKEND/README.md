# User Registration Endpoint Documentation

## Endpoint

`POST /user/register`

## Description
Registers a new user in the system. This endpoint validates the input, hashes the password, creates a new user, and returns a JWT token along with the user data (excluding the password).

## Request Body
The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "<First Name>",
    "lastname": "<Last Name>" // Optional
  },
  "email": "<user@example.com>",
  "password": "<password>"
}
```

### Field Requirements
- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT Token>",
    "user": {
      "_id": "<User ID>",
      "fullname": {
        "firstname": "<First Name>",
        "lastname": "<Last Name>"
      },
      "email": "<user@example.com>"
      // ...other user fields (excluding password)
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "<Validation error message>",
        "param": "<field>",
        "location": "body"
      }
      // ...more errors
    ]
  }
  ```

### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "<Error message>"
  }
  ```

## Example Request
```
POST /user/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Notes
- The password is securely hashed before storage.
- The returned JWT token can be used for authenticated requests.
- The password is never returned in the response.
