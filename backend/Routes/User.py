from fastapi import APIRouter,Depends,status
from Models.Table import Event
from Models import Table
import Models
from typing import Annotated
from Config.dataBase import sessionLocal,base,engine
from sqlalchemy.orm import Session
from Schemas.schema import Events,User
from Auth.Auth import getHashedPassword

user=APIRouter(tags=['User'],prefix='/User')
Table.base.metadata.create_all(bind=engine)
def getDb():
    db=sessionLocal()
    try:
        yield db
    finally:
        db.close()

db_Dependency=Annotated[Session,Depends(getDb)]


@user.post('/createUser')
def createUser(db:db_Dependency,user:User):
    db_User=Models.Table.User(user.dict())
    # user.dict["password"]=getHashedPassword(user.dict["password"])
    db.add(db_User)
    db.commit()
    return user