# Authentication System with Python, Flask, Reactjs

This project taught us about how to increase the security of our applications through the use of security tokens and password encryption when users create an account in our app and/or login to it. 

*How authentication systems work* 

<img src="https://github.com/breatheco-de/content/blob/master/src/assets/images/authentication-diagram.png?raw=true" alt="Autentication workflow" height="300px" width="500px"/>

Security tokens allows us to identify who wants access to our website or webpage and decide whether that user should be allowed access or not, or what kind of access they should be allowed to have within our app. For this project we used JWT (JSON WEB TOKEN), a popular standard for security tokens which do not get saved onto a database and contain all the necessary information needed for authentication within the token. You can learn more about [here](https://jwt.io/introduction), and we used Python and the Flask library to do integrate this functionality into our app.

### JWT Structure
<img src="https://github.com/breatheco-de/content/blob/master/src/assets/images/jwt-token-structure.png?raw=true" alt="Autentication workflow" height="150px" width="550px"/>

HEADER: Stores the type of token and the encryption algorithm
PAYLOAD: Has the data that identifies the user: it can be its ID, user name, etc.
SIGNATURE: Digital signature, which is generated with the previous two sections, and it allows you to verify if the content has been modified.

Password encryption ensures that a user's password is hidden from view, even to the creators or the application, enhancing the level of security and protection from people wanting to acquire people's passwords for malicious reasons. For this project we used the Flask extension [Bcrypt](https://flask-bcrypt.readthedocs.io/en/latest/) which provides bcrypt hashing utilities for an application.

The frontend of this app was built with Reactjs. 

See the [live version](https://4-geeks-authentication-system-with-python-flask-react-js.vercel.app/) of the project or watch the demo below.

[authentication.webm](https://github.com/gdwhittaker94/4Geeks_Authentication_system_with_Python_Flask_React.js/assets/105855731/38e88a1c-48ac-4295-a426-7a9a78147621)




