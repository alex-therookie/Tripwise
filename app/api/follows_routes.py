from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
from app import db

follows_routes = Blueprint('follows', __name__)


@follows_routes.route('/', methods=['POST'])
def follow():
    data = request.json
    user_email = data["email"]
    curr_user = User.query.get(current_user.get_id())
    followedUser = User.query.filter(User.email == user_email).first()
    followedUser.followers.append(curr_user)

    db.session.add(followedUser)
    db.session.commit()

    return followedUser.to_dict()
