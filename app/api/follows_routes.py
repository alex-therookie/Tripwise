from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
from app import db

follows_routes = Blueprint('follows', __name__)


@follows_routes.route('/', methods=['POST'])
def follow():
    data = request.json
    user_email = data["email"]
    user_name = data["username"]
    curr_user = User.query.get(7)
    followedUser = User.query.filter((User.email == user_email) | (User.username == user_name)).first()
    followedUser.followers.append(curr_user)

    db.session.add(followedUser)
    # db.session.add(curr_user)
    db.session.commit()

    return curr_user.to_dict()
