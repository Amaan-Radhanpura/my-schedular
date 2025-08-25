from pydantic import BaseModel
from datetime import date

class Events(BaseModel):
    Start:date
    End:date
    Title:str
    Reason:str


class Token(BaseModel):
    accessToken:str
    tokenType:str

class tokenData(BaseModel):
    username:str

class User(BaseModel):
    username:str
    email:str
    password:str

class userInDb(User):
    hashedPassword:str