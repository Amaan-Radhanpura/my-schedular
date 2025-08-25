from fastapi import FastAPI,Depends
from Routes.Event import event
from Routes.User import user



app=FastAPI()

app.include_router(event)
app.include_router(user)


# if __name__ == '__main__':
#     uvicorn.run(app,host='127.0.0.1',port=9000)