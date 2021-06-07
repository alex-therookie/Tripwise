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

    expense_user = ExpenseUser(
        balance=data['expense_users'][0]['balance'],
        userId=2,
        expenseId=expense.id,
    )

    db.session.add(expense_user)
    db.session.commit()

    return {}
