from flask import Blueprint, request
from app.models import Comment
from flask_login import current_user
from app import db

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/", methods=["POST"])
def create_comments():
    data = request.json
    print("THIS IS DATA ====> ", data)

    comment = Comment(
        text=data['text'],
        expenseId=data["expenseId"],
        userId=current_user.get_id(),          #Change for current userId
    )

    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()

@comment_routes.route("/<id>", methods=['DELETE'])
def delete_comment(id):
    data = request.json
    if str(data["userId"]) == current_user.get_id():
        comment = Comment.query.get(id)
        db.session.delete(comment)
        db.session.commit()
        return {}, 204
    return {}
