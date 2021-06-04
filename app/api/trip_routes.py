from flask import Blueprint, request
from app.models import Trip
from app import db

trip_routes = Blueprint('trips', __name__)

@trip_routes.route("/")
def get_trips():
    return {"trips": []}

@trip_routes.route("/", methods=["POST"])
def create_trip():
    data = request.json

    trip = Trip(
        name=data["name"],
        userId=1
    )

    db.session.add(trip)
    db.session.commit()

    return trip.to_dict()
