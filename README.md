# Authentication System with Python, Flask, Reactjs

This project taught us about how to increase the security of our applications through the use of security tokens and password encryption when users create an account in our app and/or login to it. 

*How authentication systems work* 

<img src="https://github.com/breatheco-de/content/blob/master/src/assets/images/authentication-diagram.png?raw=true" alt="Autentication workflow" height="300px" width="500px"/>

### Security Tokens
Security tokens allow us to identify who is trying to access our app, permit or deny that person access to our app and, if permitted, can control what the person is or isn't allowed to do once in our app. For this project we used JWT (JSON WEB TOKEN), a popular standard for security tokens as they do not get saved onto a database and contain all the necessary information needed for authentication within the token. You can learn more about them [here](https://jwt.io/introduction), and we used Python and the Flask library to integrate this functionality into our app.

### JWT Structure
<img src="https://github.com/breatheco-de/content/blob/master/src/assets/images/jwt-token-structure.png?raw=true" alt="Autentication workflow" height="150px" width="550px"/>

HEADER: Stores the type of token and the encryption algorithm

PAYLOAD: Has the data that identifies the user: it can be its ID, user name, etc.

SIGNATURE: Digital signature, which is generated with the previous two sections, and it allows you to verify if the content has been modified.

### Password Encryption 
Password encryption ensures that a user's password is hidden from view, even to the creators of the application, enhancing the level of security and protection from those wanting to acquire people's passwords for malicious reasons. For this project we used the Flask extension [Bcrypt](https://flask-bcrypt.readthedocs.io/en/latest/) which provides bcrypt hashing utilities for an application.

The frontend of this app was built with Reactjs. 

### View Project 
See the [live version](https://4-geeks-authentication-system-with-python-flask-react-js.vercel.app/) of the project or watch the demo below.

[authentication.webm](https://github.com/gdwhittaker94/4Geeks_Authentication_system_with_Python_Flask_React.js/assets/105855731/38e88a1c-48ac-4295-a426-7a9a78147621)




