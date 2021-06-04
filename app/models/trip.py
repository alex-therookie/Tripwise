from .db import db

class Trip(db.Model):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    photoUrl = db.Column(db.String(500), nullable=True)


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "photoUrl": self.photoUrl
        }
