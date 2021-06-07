from .db import db
from datetime import datetime

class Expense(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(30), nullable=False)
    amount = db.Column(db.Numeric(10,2), nullable=False)
    photoUrl = db.Column(db.String(500), nullable=True)
    tripId = db.Column(db.Integer, db.ForeignKey('expenses.id'), nullable=False)
    activityId = db.Column(db.Integer, db.ForeignKey('activities.id'), nullable=True)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)

    comments = db.relationship("Comment", backref="expense", lazy="joined")
    expense_users = db.relationship("ExpenseUser", backref="expense", lazy="select")

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "amount": self.amount,
            "photoUrl": self.photoUrl,
            "tripId": self.tripId,
            "activityId": self.activityId,
            "createdAt": self.createdAt,
            "comments": self.comments,
            "expense_users": self.expense_users
        }