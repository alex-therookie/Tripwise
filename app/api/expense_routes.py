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

@expense_routes.route("/")
def get_user_expenses():
    curr_user_id = current_user.get_id()
    expense_ids = [r[0] for r in ExpenseUser.query.filter(ExpenseUser.userId == curr_user_id).values(ExpenseUser.expenseId)]
    expenses = Expense.query.filter(Expense.id.in_(expense_ids)).all()
    return {"userExpenses": [expense.to_dict() for expense in expenses] }

@expense_routes.route("/<int:tripId>")
def get_trip_expenses(tripId):
    expenses = Expense.query.filter(Expense.tripId == tripId).all()
    return {"expenses": [expense.to_dict() for expense in expenses] }

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
        user_expense.balance = total
    db.session.commit()

    return user_expense.to_dict()

@expense_routes.route('/<id>', methods=['DELETE'])
def delete_expense(id):
    if current_user.is_authenticated:
        expense = Expense.query.get(id)
        expense_user_id = str(expense.userId)
        if current_user.get_id() == expense_user_id:
            db.session.delete(expense)
            db.session.commit()
            return expense.to_dict(), 202
        return Response("User is not authorized to Delete this review", 401)
