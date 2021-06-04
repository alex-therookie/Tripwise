from .db import db

class Friend(db.Model):
    __tablename__ = 'friends'

    id = db.Column(db.Integer, primary_key=True)
    userOneId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    userTwoId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    def to_dict(self):
        return {
            "id": self.id,
            "userOneId": self.userOneId,
            "userTwoId": self.userTwoId
        }
