from .db import db
from datetime import datetime

class Activity(db.Model):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    photoUrl = db.Column(db.String(500), nullable=True)
    date = db.Column(db.Date, nullable=True)
    tripId = db.Column(db.Integer, db.ForeignKey('trips.id'), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)



    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "photoUrl": self.photoUrl,
            "date": self.date,
            "tripId": self.tripId,
            "createdAt": self.createdAt
        }
