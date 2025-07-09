After clone the project install node modules and all other packages.
cd init -> node index.js for initialize database.
MVC-> model,view,controller

05/07/2025 
add starability from github.{re-styleing reviews}

adding image upload feature using free cloudinary account. create .env for save credentials.
create .env and add these:
CLOUD_NAME = your_cloud_name
CLOUD_API_KEY = your_api-key
CLOUD_API_SECRET = your_api_secret

start with maps
signup on mapbox 
and copy default public token and paste it in .env file
MAP_TOKEN = public key



use online db instead of local db so use mongodb atlas{cloud database service}
this is local system url for store info in app.js  {const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
}  replace it with new url and create dburl variable and store data from .env file.

we use online db for store data so in .env file create ATLASDB_URL = <cluster url> with ATLAS password.

and when we were host project ,.env file ki info yaha store nahi hogi jaha pr bhi cloud service lere honge deployment kr rhe honge waha store krynge.waha pr platform ke uper env variable ko store krynge.