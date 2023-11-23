// Import necessary libraries and modules
// Start Here....
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import mongoose from "mongoose"; // Import Mongoose, an ODM for MongoDB
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from the .env file
import taskRoutes from "./routes/taskRoutes";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 3000; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Use the routes for handling the API REquests!
// LATER
app.use(taskRoutes);
// ---
// ---
// ---

// Connection to the database through Mongoose (for local development)
const mongoUrl = process.env.MONGO_URL; // Get the MongoDB connection URL from environment variables
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }); // Connect to the MongoDB database
mongoose.Promise = Promise; // Set Mongoose to use ES6 Promises

// ---
// ---
// ---

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
