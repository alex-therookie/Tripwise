from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)

trip_users = db.Table(
    "trip_users",
    db.Column(
        "userId",
        db.Integer,
        db.ForeignKey("users.id"), #ondelete="CASCADE"
        primary_key=True
    ),
    db.Column(
        "tripId",
        db.Integer,
        db.ForeignKey("trips.id"), #ondelete="CASCADE"
        primary_key=True
    )
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  expenses = db.relationship("Expense", backref="user", lazy="select")
  comments = db.relationship("Comment", backref="user", lazy="select")
  user_expenses = db.relationship("ExpenseUser", backref="user", lazy="select")
  followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followed_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

  trips = db.relationship("Trip", secondary=trip_users, back_populates="users", cascade="all, delete")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "user_expenses": {user_expense.id: str(user_expense.balance) for user_expense in self.user_expenses},
      "followers": [{"value": follower.id, "label": follower.username} for follower in self.followers],
      "following": [{"value": follow.id, "label": follow.username} for follow in self.follows],
      "trips": [{"id":trip.id, "name": trip.name} for trip in self.trips]
    }
