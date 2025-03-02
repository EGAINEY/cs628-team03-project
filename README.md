# RecipeEx - A Dynamic Recipe Sharing Web Application

RecipeEx is a full-stack web application that allows users to share, browse, and manage recipes. Built using the **MERN stack** (MongoDB, Express, React, and Node.js), it provides an interactive and user-friendly experience for food enthusiasts.

&nbsp;

## **Architecture**

### **Web Application:**
- **Frontend:** Developed using **React**, providing a seamless and responsive user interface.
- **Backend:** Powered by **Node.js and Express.js**, handling user authentication, recipe management, and API interactions.
- **API Communication:** The frontend interacts with the backend via **RESTful API endpoints**.

### **Database:**
- **MongoDB Atlas** serves as the cloud-based NoSQL database for storing user profiles and recipes.
- **Authentication:** User credentials are securely stored using **bcrypt** for password hashing.

&nbsp;

## **Features**

### **User Profiles**
- Users can create an account, log in, and manage their recipes.
- Secure authentication system with password encryption.

### **Recipe Sharing**
- Users can submit their own recipes, including ingredients, instructions, and images.
- Recipes are stored in a structured database, making them easy to retrieve and display.

### **Recipe Browsing**
- Browse a collection of user-submitted recipes.

### **Recipe Viewing**
- Each recipe has a dedicated page displaying details such as ingredients, preparation steps, and a photo.

&nbsp;

# **Running the RecipeEx App in Codespaces**

1. **Open** this project in GitHub Codespaces.

2. **Open two bash terminals**:
   - **Terminal 1** (Backend - Express Server):  
     - `cd RecipeEx/server`  
     - `node server.mjs`  
     - *(This starts the Express backend on port 5050)*
   - **Terminal 2** (Frontend - React App):  
     - `cd RecipeEx/client`  
     - `npm start`  
     - *(This starts the React frontend on port 3000)*

3. **Navigate to the “Ports” tab** in your Codespace:
   - Set **both ports (3000 and 5050) to “Public”** visibility.  
     *(If you do not make both ports public, your browser will block the frontend from communicating with the backend, causing CORS issues.)*

4. **Open the port 3000 link** in the browser (the frontend), and begin using the app!