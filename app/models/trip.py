from .db import db
from .user import trip_users

class Trip(db.Model):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    photoUrl = db.Column(db.String(500), nullable=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    activities = db.relationship("Activity", backref="trip", lazy="dynamic", cascade="all, delete")

    users = db.relationship("User", secondary=trip_users, back_populates="trips")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "photoUrl": self.photoUrl,
            "userId": self.userId,
        }

    def to_dict_detail(self):
        return {
            "id": self.id,
            "name": self.name,
            "photoUrl": self.photoUrl,
            "userId": self.userId,
            "activities": {activity.id: activity.to_dict() for activity in self.activities},
            "users": {user.id: user.username for user in self.users},
        }
