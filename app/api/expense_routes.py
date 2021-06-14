from flask import Blueprint, request, Response
from app.models import Expense, ExpenseUser
from flask_login import current_user
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
        userId=data["userId"],
        )

    db.session.add(expense)
    db.session.commit()

    for userId, balance in data["expense_users"].items():
        expense_user = ExpenseUser(
            balance=balance,
            userId=userId,
            expenseId=expense.id,
        )
        db.session.add(expense_user)

    db.session.commit()

    return expense.to_dict()

@expense_routes.route("/<int:tripId>")
def get_expenses(tripId):
    expenses = Expense.query.filter(Expense.tripId == tripId).all()
    return {"expenses": [expense.to_dict() for expense in expenses] }

    return {}, 204
#TODO Chnage this to expense_user route
@expense_routes.route("/<int:expId>", methods=['PUT'])
def update_expense_user(expId):
    data = request.json
    curr_user = current_user.to_dict()
    user_expense = ExpenseUser.query.filter(ExpenseUser.userId == curr_user["id"], ExpenseUser.expenseId == expId).first()
    total = float(user_expense.balance) + float(data["payment"])
    if total >= 0:
        user_expense.balance = 0
    else:
        print("NOT BIGER ZERO =====> ", total)
        user_expense.balance = total
    db.session.commit()

    return user_expense.to_dict()

@expense_routes.route('/<id>', methods=['DELETE'])
def delete_expense(id):
    if current_user.is_authenticated:
        expense = Expense.query.get(id)
        print("THIS IS TRIP =====> ", expense)
        expense_user = str(expense.userId)
        if current_user.get_id() == expense_user:
            db.session.delete(expense)
            db.session.commit()
            return expense.to_dict(), 202
        return Response("User is not authorized to Delete this review", 401)
