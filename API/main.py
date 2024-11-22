from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from API import models, schemas, crud
from API.database import SessionLocal, engine

# # Créer les tables dans la base de données
# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dépendance pour obtenir une session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/vehicules/", response_model=list[schemas.Vehicule])
def read_vehicules(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_vehicules(db, skip=skip, limit=limit)

@app.post("/vehicules/", response_model=schemas.Vehicule)
def create_vehicule(vehicule: schemas.VehiculeCreate, db: Session = Depends(get_db)):
    return crud.create_vehicule(db=db, vehicule=vehicule)

@app.put("/vehicules/{vehicule_id}", response_model=schemas.Vehicule)
def update_vehicule(vehicule_id: int, vehicule_update: schemas.VehiculeUpdate, db: Session = Depends(get_db)):
    db_vehicule = crud.update_vehicule(db=db, vehicule_id=vehicule_id, vehicule_update=vehicule_update)
    if db_vehicule is None:
        raise HTTPException(status_code=404, detail="Véhicule non trouvé")
    return db_vehicule

@app.delete("/vehicules/{vehicule_id}", response_model=schemas.Vehicule)
def delete_vehicule(vehicule_id: int, db: Session = Depends(get_db)):
    db_vehicule = crud.delete_vehicule(db=db, vehicule_id=vehicule_id)
    if db_vehicule is None:
        raise HTTPException(status_code=404, detail="Véhicule non trouvé")
    return db_vehicule


# # Routes pour les marques
# @app.post("/marques/", response_model=schemas.Marque)
# def create_marque(marque: schemas.MarqueCreate, db: Session = Depends(get_db)):
#     return crud.create_marque(db=db, marque=marque)

# @app.get("/marques/", response_model=list[schemas.Marque])
# def read_marques(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return crud.get_marques(db, skip=skip, limit=limit)

# # Routes pour les carburants
# @app.post("/carburants/", response_model=schemas.Carburant)
# def create_carburant(carburant: schemas.CarburantCreate, db: Session = Depends(get_db)):
#     return crud.create_carburant(db=db, carburant=carburant)

# @app.get("/carburants/", response_model=list[schemas.Carburant])
# def read_carburants(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return crud.get_carburants(db, skip=skip, limit=limit)

# # Routes pour les transmissions
# @app.post("/transmissions/", response_model=schemas.Transmission)
# def create_transmission(transmission: schemas.TransmissionCreate, db: Session = Depends(get_db)):
#     return crud.create_transmission(db=db, transmission=transmission)

# @app.get("/transmissions/", response_model=list[schemas.Transmission])
# def read_transmissions(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return crud.get_transmissions(db, skip=skip, limit=limit)