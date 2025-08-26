from fastapi import APIRouter,Depends,status,HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from Models.Table import Event
from Models import Table
import Models
from datetime import timedelta
from typing import Annotated
from Config.dataBase import sessionLocal,base,engine
from sqlalchemy.orm import Session
from Schemas.schema import Events,User,userInDb,Token,tokenData
from Auth.Auth import getHashedPassword,authenticateuser,createAccessToken,accessTokenExpiryTime

user=APIRouter(tags=['User'])
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
    hashedPassword=getHashedPassword(user.password)
    db_User=Models.Table.User(
        username=user.username,
        email=user.email,
        password=hashedPassword
    )
    db.add(db_User)
    db.commit()
    db.refresh(db_User)
    return db_User


@user.post('/token',response_model=Token)
async def login(form_data:Annotated[OAuth2PasswordRequestForm,Depends()],db:db_Dependency):
    user=authenticateuser(db,form_data.username,form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    accessToken_Expiry=timedelta(minutes=accessTokenExpiryTime)
    accessToken=createAccessToken(
        data={"sub":user.username}, expires_delta=accessToken_Expiry
    )
    return {"access_token":accessToken,"token_type":"bearer"}

@user.delete('/deleteUser')
def deleteUser(id:int,db:db_Dependency):
    USer=db.query(Models.Table.User).filter(Models.Table.User.id==id).first()
    db.delete(USer)
    db.commit()
    