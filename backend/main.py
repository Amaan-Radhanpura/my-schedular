from fastapi import FastAPI,Depends
from Routes.Event import event
from Routes.User import user
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI()

app.include_router(event)
app.include_router(user)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# if __name__ == '__main__':
#     uvicorn.run(app,host='127.0.0.1',port=9000)