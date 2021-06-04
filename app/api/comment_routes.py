from flask import Blueprint
from app.models import Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/")
def get_comments():
    return {"comments": []}
