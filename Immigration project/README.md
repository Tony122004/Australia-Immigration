## Backend ##:
start: 
steps:
 pip install -r requirements.txt
python api.py

update database:
Without removing old database: 
python populate_database.py

Removing old database:
python populate_database.py --reset

## Frontend ##: 
start: 
steps:
npm install
npm run dev