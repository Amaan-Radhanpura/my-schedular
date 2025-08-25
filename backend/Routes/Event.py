from fastapi import APIRouter,Depends,status
from Models.Table import Event
from Models import Table
import Models
from typing import Annotated
from Config.dataBase import sessionLocal,base,engine
from sqlalchemy.orm import Session
from Schemas.schema import Events

event=APIRouter()
Table.base.metadata.create_all(bind=engine)
def getDb():
    db=sessionLocal()
    try:
        yield db
    finally:
        db.close()
db_Dependency=Annotated[Session,Depends(getDb)]

@event.post('/add_event')
def addEvent(event:Events,db:db_Dependency,status_code=status.HTTP_201_CREATED):
    db_event=Models.Table.Event(event.dict())
    db.add(db_event)
    db.commit()
    return event

@event.get('/get_events')
def fetchEvent(db:db_Dependency):
    Event=db.query(Models.Table.Event).all()
    return Event

@event.delete('/deleteEvent')
def deleteEvent(id:int,db:db_Dependency):
    Event=db.query(Models.Table.Event).filter(Models.Table.Event.id==id).first()
    db.delete(Event)
    db.commit()
    return Event

