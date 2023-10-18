"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
# JWT Extended Imports 
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Create Flask app (not from JWT)
app = Blueprint('app', __name__)

# /// MY ENDPOINTS


# /// FROM JWT EXTENDED ///

# Create a route to authenticate your users and return JSON Web Tokens (JWTs) to them.
# The 'create_access_token()' func generates the JWT.
@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# here put an endpoint for a private accesspoint (see code below)
@app.route("/private", methods=['GET']) 
# ...
# ...

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# CREATING THE TOKEN 
@app.route('/token', methods=['POST'])
def create_token():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200