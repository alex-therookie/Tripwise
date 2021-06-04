from flask import Blueprint
from app.models import Activity

activity_routes = Blueprint('activities', __name__)

@activity_routes.route("/")
def get_activities():
    return {"activities": []}
