from .db import db
from datetime import datetime


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    expenseId = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)


    def to_dict(self):
        return {
            "id": self.id,
            "text":self.text,
            "expenseId": self.expenseId,
            "createdAt": self.createdAt
        }
