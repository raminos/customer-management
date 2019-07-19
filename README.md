# Customer Management Rest API

## Task requirements
### Specification
- **Overview page:**
    - Lists all customers
    - Add a new customer
    - Link to edit a customer (‘Customer Detail’ page)
    - Delete a customer
- **Customer Detail page:**
    - Edit & remove profile data

### Bonus
- Setup a node server
- Use persistent data storage (MongoDB, ...)
- Host the application (Heroku, ...)
- Continuous Integration & Development (Jenkins & Travis)

## Tech stack
- Node.js with Express.js
- MongoDB with Mongoose
- OpenSSL
- User Authentication with Passport.js
- JSON Web Tokens

## Setting up the project
- add a config.js file with the following variables:
    - *'mongoUrl'* with the path to your mongoDB
    - *'port'* and *'secPort'* for HTTPS support
    - *'secretOrKey'* to sign the JSON Web Tokens
- add *cert.csr*, *certificate.pem* and *private.key* files with OpenSSL in the **bin** folder