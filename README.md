# Inventory Tracker RESTful API with expressjs, nodejs, and swagger
The Inventory Tracker App is a web-based application designed to help businesses and organizations manage their inventory effectively. This README provides an overview of the app's features, installation instructions, and usage guidelines.
## Introduction

Welcome to the simple Inventory Tracker app RESTful API website.

## RESTful Principles

The Inventory API adheres to the principles of RESTful design to ensure a standardized and user-friendly experience:

1. **Resources**: The API treats product entities such as tracking and accounts as resources, each accessible through a unique endpoint.

2. **HTTP Methods**: HTTP methods such as GET, POST, PATCH, and DELETE are employed to interact with these resources.

3. **Representation**: Data is exchanged in JSON format, allowing for structured and easy-to-parse information.

<img src="./assets/api.png" alt="Alt text" title="Optional title">

### Key Features
1. User Registration and Authentication  
    - Users can register with a username, password, and role.
    - Authentication is handled using JSON Web Tokens (JWT).
2. Product Management
    - Create, update, and delete products.
    - View a list of all products.
    - Retrieve product details by ID.
3. Authorization
    - Admin :
        * Create Product
        * Get all product
        * Get product by id
        * Update quantity product
        * Delete product
    - User :
        * Get all product
        * Get product by id
        * Update quantity product

### Usage 
1. Account Registration:
    - Register a new user with a unique username, password, and role.
2. Account Authentication:
    - Log in using your registered username and password to obtain a JWT token.
3. Product Management:
    - Create new products with a name and quantity.
    - Update product quantities.
    - Delete products.
    - View a list of all products

### Security 
The Inventory Tracker App uses JWT token-based authentication to secure its endpoints. Ensure that you include a valid JWT token in the authorization header for protected operations.


## Endpoints and Examples
### API Endpoint

[Try me](https://wild-gold-fossa-vest.cyclic.app/api-docs)

**Register New Account (User, Admin)**

```http
POST | https://wild-gold-fossa-vest.cyclic.app/auth/register
```

**Log In User (User, Admin)**

```http
POST | https://wild-gold-fossa-vest.cyclic.app/auth/register
```

**Create new Product**

```http
POST | https://wild-gold-fossa-vest.cyclic.app/product
```

**Get All Product (User, Admin)**

```http
POST | https://wild-gold-fossa-vest.cyclic.app/product
```

**Get Product by Id (User, Admin)**

```http
POST | https://wild-gold-fossa-vest.cyclic.app/product/:id
```

**Patching Product Quantity Status (User, Admin)**

```http
PATCH | https://wild-gold-fossa-vest.cyclic.app/product/:id
```

**Delete Product by ID**

```http
DELETE | https://wild-gold-fossa-vest.cyclic.app/product/:id
```