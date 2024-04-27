"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from bcrypt import gensalt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.json
    if data.get("name") is None or data.get("email") is None or data.get("password") is None:
        return jsonify({
            "error": "Campos inválidos, complete los datos de name, email y password"
        }), 400
    # Generate hashed password
    salt = str(gensalt())
    password_hash = generate_password_hash(data['password'] + salt)
    # Instantiate new user
    new_user = User()
    new_user.email = data['email']
    new_user.name = data['name']
    new_user.hashed_password = password_hash
    new_user.salt = salt
    # Add / Commit to DB
    db.session.add(new_user)
    db.session.commit()
    return jsonify(data), 201


@api.route('/login', methods=['POST'])
def handle_login():
    data = request.json
    # Email validation
    user = User.query.filter_by(email=data['email']).one_or_none()
    if user is None:
        return jsonify({
            "error": "Datos incorrectos"
        }), 400
    # Hash password validation
    correct_password = check_password_hash(
        user.hashed_password, data['password'] + user.salt)
    if not correct_password:
        return jsonify({
            "error": "Datos incorrectos"
        }), 400
    if correct_password:
        jwt_token = create_access_token(identity=user.id)
        return jsonify({
            "jwt_token": jwt_token
        }), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        "user": user.serialize()
    }), 200
