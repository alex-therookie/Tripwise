from .db import db


class ExpenseUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Numeric(10, 2), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expenseId = db.Column(db.Integer, db.ForeignKey('expenses.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "balance": str(self.balance),
            "userId": self.userId,
            "expenseId": self.expenseId
        }
