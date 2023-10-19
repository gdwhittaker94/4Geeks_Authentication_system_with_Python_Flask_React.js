"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
# JWT Extended Imports 
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

# Environment?
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__) # Creating of app
app.url_map.strict_slashes = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET") 
jwt = JWTManager(app)

# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints from the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

# ///////////////////////////////////
# /// MY ENDPOINTS + JWT EXTENDED ///
# ///////////////////////////////////

# *** ENDPOINT '/signup' ***
@app.route('/signup', methods=['POST'])
def signup():
    body = request.get_json(silent=True)
    # Handle Errors
    if body is None: 
        return jsonify({'msg': 'You must include a body in the request'}), 400
    if 'email' not in body: 
        return jsonify({'msg': 'You need to add an email address'})
    if 'password' not in body: 
        return jsonify({'msg': 'You need to add an password'})

     # Check: email must be unique 
    if User.query.filter_by(email=body['email']).first() is not None:
        return jsonify({'error': 'This email address already exists'}), 400

    new_user = User()
    new_user.email = body['email']
    new_user.password = body['password']
    new_user.is_active = True
    
    db.session.add(new_user) # adds new user to db
    db.session.commit() # like git commit, saves changes

    # Frontend Response 
    return jsonify ({'msg': 'User successfully created'}), 200

# *** ENDPOINT '/login' ***
# Authenticating that user already exists and returning JSON Web Tokens (JWTs) to them.
@app.route("/login", methods=['POST'])
def login():
    body = request.get_json(silent=True)
    # Handle Errors
    if body is None: 
        return jsonify({'msg': 'You must include a body in the request'}), 400
    if 'email' not in body: 
        return jsonify({'msg': 'You need to add an email address'}), 400
    if 'password' not in body: 
        return jsonify({'msg': 'You need to add an password'}), 400
    
    # Otherwise, check provide credentials against data in db (i.e. does user already exist or not?) 
    user = User.query.filter_by(email=body['email']).first() # .first() = not to produce a list, only first item 
    # if user with this email doesn't exist
    if user is None or user.password != body['password']:
         return jsonify({'error': 'Incorrect user credentials'}), 400

    # if all good  
    access_token = create_access_token(identity=user.email) # this func generates the JWT
    # response to frontend -> user receives JWT
    return jsonify({'access_token': access_token}) 

    # TEST CODE
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)
   

# ENDPOINT '/private' 
@app.route("/private", methods=['GET']) 
@jwt_required() # requires a JWT to get to this endpoint, protecting the route and ignoring unauthorised requests 
def private():
    # return jsonify({'msg': 'Private Method'}) TEST LINE 
    email = get_jwt_identity() # connects user with created JWT
    return jsonify({'msg': 'Successfully accessed private route for this user', 'user': email}), 200



# /// END OF FILE ///
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
