# Customer Management Rest API
## Introduction
These were specifications made by Webtrekk as a developer challenge.

### Webtrekk specifications
- **Overview page:**
    - Lists all customers
    - Add a new customer
    - Link to edit a customer (‘Customer Detail’ page)
    - Delete a customer
- **Customer Detail page:**
    - Edit & remove profile data
- **Tech specifications**
    - Setup a node server
    - Use persistent data storage (MongoDB, ...)

## Comment
There are some additional functionalities I set up, which I thought could be useful:
- Articles: I thought customers need articles. All CRUD operations work on articles as well. 
- User accounts: So every user account can add customers to the storage.
- Admin label: To set up articles an admin account is needed.
- JSON web token: To deal with sessions I set up JSON web tokens.
- Orders: Customers have an order attribute which is linked to articles. Like this it should be a fully functional customer management backend for a small application.

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

## Discussion: 
There is one inconsistency in the API's responses. Most of the time the server sends back the manipulated document just not in case of a removal. In this case the client will just receive a success message. It wouldn't make sense to send any other data with a delete operation, but this inconsistency needs to be addressed!