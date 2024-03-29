"""empty message

Revision ID: e361db495d93
Revises: bc0ddd569033
Create Date: 2021-06-13 11:29:11.006319

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e361db495d93'
down_revision = 'bc0ddd569033'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('expenses', sa.Column('userId', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'expenses', 'users', ['userId'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'expenses', type_='foreignkey')
    op.drop_column('expenses', 'userId')
    # ### end Alembic commands ###
