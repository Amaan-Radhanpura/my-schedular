from sqlalchemy import create_engine #creates an engine to commuicate between our application and database
from sqlalchemy.orm import sessionmaker,Session
from sqlalchemy.ext.declarative import declarative_base


urlDatabase='mysql+pymysql://root:root@localhost:3306/event'

engine = create_engine(urlDatabase)

sessionLocal=sessionmaker(autoflush=False,autocommit=False,bind=engine)

base=declarative_base()

