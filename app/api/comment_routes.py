from flask import Blueprint, request
from app.models import Comment
from app import db

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/", methods=["POST"])
def create_comments():
    data = request.json

    comment = Comment(
        text=data['text'],
        expenseId=data["expenseId"],
        userId=data["userId"],          #Change for current userId
    )

    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()
