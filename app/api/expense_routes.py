from flask import Blueprint, request
from app.models import Expense, ExpenseUser
from app import db

expense_routes = Blueprint('expenses', __name__)

@expense_routes.route("/", methods=['POST'])
def create_expenses():
    data = request.json

    expense = Expense(
        description=data['description'],
        photoUrl=data['photoUrl'],
        amount=data['amount'],
        tripId=data["tripId"],
        activityId=data["activityId"],
        )

    db.session.add(expense)
    db.session.commit()

    for user in data["expense_users"]:
        expense_user = ExpenseUser(
            balance=user['balance'],
            userId=user['userId'],
            expenseId=expense.id,
        )
        db.session.add(expense_user)

    db.session.commit()

    return expense.to_dict()

@expense_routes.route("/<id>", methods=['DELETE'])
def delete_expense(id):
    expense = Expense.query.get(id)
    db.session.delete(expense)
    db.session.commit()

    return {}, 204
