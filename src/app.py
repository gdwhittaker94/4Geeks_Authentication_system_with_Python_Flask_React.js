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
from flask_bcrypt import Bcrypt

# Environment?
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__) # Creating of app
app.url_map.strict_slashes = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET") 
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

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

# *** ENDPOINT '/login' ***
@app.route("/api/login", methods=['POST'])
def login():

    body = request.get_json(silent=True)

    # Handle Errors
    if body is None: 
        return jsonify({'msg': 'You must include a body in the request'}), 400
    if 'email' not in body: 
        return jsonify({'msg': 'You need to add an email address'}), 400
    if 'password' not in body: 
        return jsonify({'msg': 'You need to add an password'}), 400
    
    # Check user already exists   
    user = User.query.filter_by(email=body['email']).first() 
  
    # if not:
    if user is None:
        return jsonify({'error:': 'That user does not exist'})
    
    # check given password against (encrypted) password in db
    if not bcrypt.check_password_hash(user.password, body['password']):
         return jsonify({'error': 'Incorrect user credentials'}), 400
  
    # all good, generate the JWT:
    access_token = create_access_token(identity=user.email) 
    
    # response to frontend -> user receives JWT
    return jsonify({'access_token': access_token})    

# *** ENDPOINT '/signup' ***
@app.route('/api/signup', methods=['POST'])
def signup():

    body = request.get_json(silent=True)

    # Handle Errors
    if body is None: 
        return jsonify({'msg': 'You must include a body in the request'}), 400
    if 'email' not in body: 
        return jsonify({'msg': 'You need to add an email address'})
    if 'password' not in body: 
        return jsonify({'msg': 'You need to add an password'})

    # Check email is unique 
    if User.query.filter_by(email=body['email']).first() is not None: 
        # .first() = not to produce a list, only first item 
        return jsonify({'error': 'This email address already exists'}), 400

    #Encrypt user's password
    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')

    #Create new user
    new_user = User()
    new_user.email = body['email']
    new_user.password = pw_hash
    new_user.is_active = True
    
    # Add to db
    db.session.add(new_user) 
    db.session.commit()

    # Frontend Response 
    return jsonify ({'msg': 'User with email {} successfully created'.format(body['email'])}), 200

# ENDPOINT '/private' 
@app.route("/api/private", methods=['GET']) 
# jwt required to access: protects route, ignores unauthorised requests
@jwt_required() 
def private():
    # connect user with JWT
    email = get_jwt_identity() 
    return jsonify({'msg': 'Accessed private route for this user', 'user': email}), 200
   
    # In Postman use "Authorization -> Bearer Token" for testing


# /// END OF FILE ///
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)