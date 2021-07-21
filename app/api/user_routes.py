from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Expense, Trip
from app import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [{"value":user.id, "label": user.username} for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/<int:id>/trips")
def get_user_trips(id):
    user = User.query.get(id)
    user_dic = user.to_dict()

    return {"trips": user_dic["trips"]}
