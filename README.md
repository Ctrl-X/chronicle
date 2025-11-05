# **Chronicle: The Prediction Tracker**

**Track what people say. See who was right.**

Chronicle is a responsive web application that allows users to submit, track, and filter predictions. It creates a public, filterable timeline to see who predicted what, and when.

This application is designed as a single-page, real-time app using Firebase as the backend.

## **Core Features**

* **Submit Predictions:** Users can submit a prediction with fields for:  
  * Name  
  * Prediction Text  
  * Link/Source  
  * Location  
  * Prediction Date  
  * Category (Science, Environment, Politics, etc.)  
* **Real-time Timeline:** The main timeline updates in real-time as new predictions are submitted by any user.  
* **Filterable:** The timeline can be instantly filtered by:  
  * Name  
  * Location  
  * Category

## **Technology Stack**

* **Frontend:** HTML5, Tailwind CSS, and modern JavaScript (ES Modules)  
* **Backend:** Google Firebase  
  * **Firestore:** Used as the real-time, NoSQL database to store and retrieve all prediction data.  
  * **Firebase Authentication:** Uses anonymous or custom token-based authentication to secure database access.

## **How It Works**

This project is built as a single index.html file for simplicity and easy deployment.

1. **All-in-One File:** All HTML, CSS (via Tailwind CDN), and JavaScript logic are contained within index.html.  
2. **Firebase Backend:** The application connects to a Firebase Firestore database.  
3. **Data Storage:** When a user submits a prediction, it's saved as a new document in a public Firestore collection.  
4. **Real-time Updates:** The app uses an onSnapshot listener from Firestore to automatically fetch and display new predictions as soon as they are added to the database, without needing a page refresh.  
5. **Filtering:** Filters are applied by modifying the Firestore query in real-time, which then updates the snapshot listener to only return documents that match the filter criteria.

## **Project Setup**

To run this project yourself, you will need to:

1. **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.  
2. **Set up Firestore:** Initialize a Firestore database in your project.  
3. **Set up Authentication:** Enable Anonymous or a custom token-based sign-in method.  
4. **Configure Security Rules:** Set up Firestore security rules to allow read/write access. For this app's public model, the rules are set up to allow authenticated users to read and write to the /artifacts/{appId}/public/data/predictions collection.  
5. **Get Config Variables:** In your Firebase project settings, find your web app's Firebase configuration object.  
6. **Run the App:** This application is designed to be run in an environment (like Google's) that injects the following variables:  
   * \_\_firebase\_config: Your Firebase project's configuration object (as a JSON string).  
   * \_\_app\_id: A unique ID for the application instance.  
   * \_\_initial\_auth\_token: A custom Firebase auth token.

If running in a different environment, you would need to replace these variables in the \<script type="module"\> block with your own Firebase config and handle authentication manually.
