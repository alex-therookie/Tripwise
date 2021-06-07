from flask import Blueprint, request
from app.models import Activity
from app import db

activity_routes = Blueprint('activities', __name__)

@activity_routes.route("/", methods=["POST"])
def create_activity():

    data = request.json

    activity = Activity(
        name=data['name'],
        date=data['date'],
        description=data['description'],
        photoUrl=data['photoUrl'],
        tripId=data['tripId']
    )

    db.session.add(activity)
    db.session.commit()

    return activity.to_dict()

@activity_routes.route('/<id>')
def get_acitivty(id):
    activity = Activity.query.get(id)
    return activity.to_dict()
