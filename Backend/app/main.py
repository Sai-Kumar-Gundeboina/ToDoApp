from fastapi import FastAPI

app = FastAPI(title="Todo API")


@app.get("/")
def home():
    return {"message": "Todo API Running"}