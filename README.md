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


live project link :  https://wanderlust-visit.onrender.com
{i use render for deployment project with crossblaze email and github login};

--------------------------------------------------------------
🏡 Wanderlust — A MERN Stack Airbnb Clone
Live Demo: wanderlust-visit.onrender.com

Wanderlust is a full-stack web application inspired by Airbnb, built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The platform allows users to explore, list, and rent properties such as hotels, rooms, and vacation stays — ideal for tourists looking for comfortable accommodations during their travels.

🚀 Features:
🔍 Property Browsing: Tourists can explore various property listings with detailed descriptions and images.

🏘️ Add Your Own Listing: Hosts can upload new properties to rent, complete with image uploads, location, and pricing.

📸 Cloud Image Upload: Images are uploaded and stored using Cloudinary.

🌍 Responsive UI: Clean, responsive design for both desktop and mobile views.

🔐 User Authentication: Secure login and signup functionality using sessions or JWT.

🗺️ Map Integration (optional): Location of listings can be displayed via integrated maps.

📦 Full CRUD Support: Users can create, read, update, and delete listings.

📁 Modular Codebase: Well-structured backend and frontend code with MVC pattern.

🛠️ Tech Stack:
Frontend: React.js, JSX, TailwindCSS / Bootstrap / Custom CSS

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Image Storage: Cloudinary

Authentication: Express-session / JWT (based on your setup)

Hosting: Render (for both frontend & backend)

🎯 Purpose:
This project was built to simulate a real-world rental platform where tourists can find and book stays easily. It’s ideal for showcasing full-stack development skills, especially in CRUD operations, authentication, third-party integrations, and responsive design.