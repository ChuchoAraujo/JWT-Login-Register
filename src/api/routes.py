"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)


@api.route('/user/register', methods=['POST'])
def user_register():
    body = request.get_json()
    hashed = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt(14)) #Encriptar entrada

    print(hashed) 

    new_user = User(body['email'], hashed.decode()) #Encriptar salida
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201


@api.route('/user/login', methods=['POST'])
def login():
    body = request.get_json()
    # user = User.query.filter_by(email = body['email']).one()
    user = db.session.query(User).filter(User.email == body['email']).one()
    if bcrypt.checkpw(body['password'].encode(), user.password.encode()):
        create_token = create_access_token(identity=user.serialize())
        return jsonify(create_token), 200
    else:
        return jsonify('Cant login'), 403
    