# python-multipart
# python-jose[cryptography]
# python-passlib[bcrypt]
from fastapi import Depends,FastAPI,HTTPException,status
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from datetime import datetime,timedelta
from jose import JWTError,jwt
# from passlib.context import CryptContext
from passlib.context import CryptContext
from Schemas.schema import User,userInDb,Token,tokenData
from Models.Table import Event,User
import Models
from typing import Annotated
from Config.dataBase import sessionLocal,base,engine
from sqlalchemy.orm import Session
from Schemas.schema import Events

def getDb():
    db=sessionLocal()
    try:
        yield db
    finally:
        db.close()

db_Dependency=Annotated[Session,Depends(getDb)]

secretKey='a9Fv#2kL8*ZqXt7@bR3n' 
Algorithm='HS256'
accessTokenExpiryTime=30

pwdContext=CryptContext(schemes=['bcrypt'],deprecated='auto')
oauth_2_Scheme=OAuth2PasswordBearer(tokenUrl='token')
  
def verifyPassword(plainPassword,hashedPassword):
    return pwdContext.verify(plainPassword,hashedPassword)

def getHashedPassword(password):
    return pwdContext.hash(password)

def getUser(db:db_Dependency,username:str):
    if username in db:
        userData=db[username]
        return db.query(Models.Table.User).filter(Models.Table.User.username==username).first()
    
def authenticateuser(db:db_Dependency,username:str,password:str):
    user=getUser(db,username)
    if not user:
        return False
    if not verifyPassword(password,user.hashedPassword):
        return False
    
    return user

def createAccessToken(data:dict,expires_delta:timedelta=None):
    toEncode=data.copy()
    if expires_delta:
        expire=datetime.utcnow()+expires_delta
    else:
        expire=datetime.utcnow()+timedelta(minutes=15)

    toEncode.update({"exp":expire})
    encodedJwt=jwt.encode(toEncode,secretKey,algorithm=Algorithm)
    return encodedJwt

async def getCurrentUser(db:db_Dependency,token:str=Depends(oauth_2_Scheme)):
    credentialException=HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate credential")
    try:
        payload=jwt.decode(token,secretKey,algorithms=[Algorithm])
        username:str=payload.get("sub")
        if username is None:
            raise credentialException
        token_Data=tokenData(username=username)
    except JWTError:
        raise credentialException 
    user=getUser(db,username=token_Data.username)
    if user in None:
        raise credentialException

    return user 


