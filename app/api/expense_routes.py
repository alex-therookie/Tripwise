from flask import Blueprint
from app.models import Expense

expense_routes = Blueprint('expenses', __name__)

@expense_routes.route("/")
def get_expenses():
    return {"expenses": []}
