from pydantic import BaseModel
from datetime import date
from sqlalchemy import Boolean,String,Integer,Column
from Config.dataBase import base

class Event(base):
    __tablename__='Event'
    id=Column(Integer,primary_key=True,autoincrement=True)
    Start=Column(String(100),nullable=False)
    End=Column(String(100),nullable=False)
    Title=Column(String(100),nullable=False)
    Reason=Column(String(100),nullable=False)

class User(base):
    __tablename__='User'

    id=Column(Integer,primary_key=True,autoincrement=True)
    username=Column(String(50))
    email=Column(String(50))
    password=Column(String(100))


