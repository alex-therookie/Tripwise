from flask import Blueprint
from app.models import Trip

trip_routes = Blueprint('trips', __name__)

@trip_routes.route("/")
def get_trips():
    return {"trips": []}
