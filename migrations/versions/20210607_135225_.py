"""empty message

Revision ID: 8944d2a34c48
Revises: bf67de150069
Create Date: 2021-06-07 13:52:25.486547

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8944d2a34c48'
down_revision = 'bf67de150069'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('activities', 'date',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('activities', 'date',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               existing_nullable=True)
    # ### end Alembic commands ###
