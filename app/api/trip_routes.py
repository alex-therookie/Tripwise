from flask import Blueprint, request
from app.models import Trip, Activity, User
from app import db
from flask_login import current_user

trip_routes = Blueprint('trips', __name__)

@trip_routes.route("/")
def get_trips():
    trips = Trip.query.all()
    return {"trips": [trip.to_dict() for trip in trips] }

@trip_routes.route('/<int:id>')
def get_trip(id):
    trip = Trip.query.get(id)
    return trip.to_dict_detail()

@trip_routes.route("/", methods=["POST"])
def create_trip():
    data = request.json
    curr_user = current_user.to_dict()

    users = User.query.filter(User.id.in_(data["users"])).all()

    trip = Trip(
        name=data["name"],
        userId=curr_user["id"],
        users=users
    )

    db.session.add(trip)
    db.session.commit()

    return trip.to_dict_detail()
