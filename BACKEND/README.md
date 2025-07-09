# User & Captain Registration/Login Endpoint Documentation
---

## Captain Registration Endpoint
---

## Captain Login Endpoint

### Endpoint

`POST /captain/login`

### Description
Authenticates a captain (driver) with email and password. Returns a JWT token and captain data (excluding the password) if credentials are valid.

### Request Body
The request body must be a JSON object with the following structure:

```
{
  "email": "<captain@example.com>",
  "password": "<password>"
}
```

#### Field Requirements
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Captain logged in successfully",
    "captain": {
      "_id": "<Captain ID>",
      "fullname": {
        "firstname": "<First Name>",
        "lastname": "<Last Name>"
      },
      "email": "<captain@example.com>",
      "vehicle": {
        "vehicleType": "car|bike|auto",
        "color": "<Color>",
        "plate": "<Plate Number>",
        "capacity": <Number>
      }
    },
    "token": "<JWT Token>"
  }
  ```

#### Validation Error
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

#### Invalid Credentials
- **Status Code:** `404 Not Found` or `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password (Captain not found)" // or "Invalid email or password"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Example Request
```
POST /captain/login
Content-Type: application/json

{
  "email": "alice.smith@example.com",
  "password": "securepass123"
}
```

---

## Captain Profile Endpoint

### Endpoint

`GET /captain/profile`

### Description
Returns the authenticated captain's profile information. Requires a valid JWT token (sent as a cookie or in the `Authorization` header as `Bearer <token>`).

### Authentication
- Requires authentication via JWT token (cookie or `Authorization` header).

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<Captain ID>",
    "fullname": {
      "firstname": "<First Name>",
      "lastname": "<Last Name>"
    },
    "email": "<captain@example.com>",
    "vehicle": {
      "vehicleType": "car|bike|auto",
      "color": "<Color>",
      "plate": "<Plate Number>",
      "capacity": <Number>
    }
    // ...other captain fields (excluding password)
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication token is missing" // or "Authentication token is blacklisted" or "Invalid authentication token"
  }
  ```

#### Not Found
- **Status Code:** `404 Not Found`
- **Body:**
  ```json
  {
    "message": "Captain not found"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Example Request
```
GET /captain/profile
Authorization: Bearer <JWT Token>
```

---

## Captain Logout Endpoint

### Endpoint

`GET /captain/logout`

### Description
Logs out the authenticated captain by clearing the authentication cookie and blacklisting the JWT token. Requires a valid JWT token (sent as a cookie or in the `Authorization` header as `Bearer <token>`).

### Authentication
- Requires authentication via JWT token (cookie or `Authorization` header).

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Captain logged out successfully"
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication token is missing" // or "Authentication token is blacklisted" or "Invalid authentication token"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Example Request
```
GET /captain/logout
Authorization: Bearer <JWT Token>
```

### Endpoint

`POST /captain/register`

### Description
Registers a new captain (driver) in the system. Validates input, checks for existing email, hashes the password, creates a new captain with vehicle details, and returns a JWT token along with the captain data (excluding the password).

### Request Body
The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "<First Name>",
    "lastname": "<Last Name>" // Optional
  },
  "email": "<captain@example.com>",
  "password": "<password>",
  "vehicle": {
    "vehicleType": "car|bike|auto",
    "color": "<Color>",
    "plate": "<Plate Number>",
    "capacity": <Number>
  }
}
```

#### Field Requirements
- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.vehicleType` (string, required): Must be one of `car`, `bike`, or `auto`.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Must be greater than 0.

### Responses

#### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "message": "Captain registered successfully",
    "captain": {
      "id": "<Captain ID>",
      "fullname": {
        "firstname": "<First Name>",
        "lastname": "<Last Name>"
      },
      "email": "<captain@example.com>",
      "vehicle": {
        "vehicleType": "car|bike|auto",
        "color": "<Color>",
        "plate": "<Plate Number>",
        "capacity": <Number>
      }
    },
    "token": "<JWT Token>"
  }
  ```

#### Validation Error
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

#### Duplicate Email
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Captain with this email already exists"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Internal server error"
  }
  ```

### Example Request
```
POST /captain/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepass123",
  "vehicle": {
    "vehicleType": "car",
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4
  }
}
```

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


---

## User Login Endpoint

### Endpoint

`POST /user/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user data (excluding the password) if credentials are valid.

### Request Body
The request body must be a JSON object with the following structure:

```
{
  "email": "<user@example.com>",
  "password": "<password>"
}
```

#### Field Requirements
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

#### Success
- **Status Code:** `200 OK`
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

#### Validation Error
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

#### Invalid Credentials
- **Status Code:** `404 Not Found`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "<Error message>"
  }
  ```

### Example Request
```
POST /user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```


---

## User Profile Endpoint

### Endpoint

`GET /user/profile`

### Description
Returns the authenticated user's profile information. Requires a valid JWT token (sent as a cookie or in the `Authorization` header as `Bearer <token>`).

### Authentication
- Requires authentication via JWT token (cookie or `Authorization` header).

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<User ID>",
    "fullname": {
      "firstname": "<First Name>",
      "lastname": "<Last Name>"
    },
    "email": "<user@example.com>"
    // ...other user fields (excluding password)
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication token is missing" // or "Authentication token is blacklisted" or "Invalid authentication token"
  }
  ```

#### Not Found
- **Status Code:** `404 Not Found`
- **Body:**
  ```json
  {
    "message": "User not found"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "<Error message>"
  }
  ```

### Example Request
```
GET /user/profile
Authorization: Bearer <JWT Token>
```

---

## User Logout Endpoint

### Endpoint

`GET /user/logout`

### Description
Logs out the authenticated user by clearing the authentication cookie and blacklisting the JWT token. Requires a valid JWT token (sent as a cookie or in the `Authorization` header as `Bearer <token>`).

### Authentication
- Requires authentication via JWT token (cookie or `Authorization` header).

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication token is missing" // or "Authentication token is blacklisted" or "Invalid authentication token"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "<Error message>"
  }
  ```

### Example Request
```
GET /user/logout
Authorization: Bearer <JWT Token>
```
