import express from "express";
import { TaskModel } from "../models/Task";

// Create an instance of the Express router
// The router method in this code is like setting up a map or a blueprint for handling different kinds of requests in a web application. It helps organize and define how the application should respond when someone visits different URLs. Think of it as creating a list of instructions for the app to follow when it receives specific requests, like "show me all tasks" or "register a new user." This makes the code neat and helps the app know what to do when someone interacts with it.
const router = express.Router();

// Define a route for handling GET requests to retrieve all tasks
router.get("/get", async (req, res) => {
  // Use the TaskModel to find all tasks in the database
  // Mongoose Method: TaskModel.find()
  // Description: This route handles HTTP GET requests and uses the TaskModel to find all tasks in the database. The find() method is a Mongoose method that retrieves all documents from the specified collection (in this case, the "tasks" collection). The found tasks are then responded to the client in JSON format.
  await TaskModel.find()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

// Define a route for handling POST requests to add a new task
router.post("/add", async (req, res) => {
  const task = req.body.task;
  // Use TaskModel to create a new task with the provided data
  // Mongoose Method: TaskModel.create({ task: task })
  // Description: This route handles HTTP POST requests and is used to add a new task to the database. It extracts the task data from the request body and then uses the create() method, which is a Mongoose method, to create a new task document with the provided data. The newly created task is then responded to the client in JSON format.
  await TaskModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

// Define a route for handling PUT requests to update a specific task by ID
router.put("/update/:id", async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use TaskModel to find and update a task by its ID, marking it as done
  // Mongoose Method: TaskModel.findByIdAndUpdate({ _id: id }, { done: true })
  // Description: This route handles HTTP PUT requests and is responsible for updating a specific task by its ID. It extracts the task ID from the request parameters, and then it uses the findByIdAndUpdate() method, which is a Mongoose method, to find and update a task by its ID. In this case, it marks the task as done by setting the done property to true. The updated task is then responded to the client in JSON format.
  await TaskModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result)) // Respond with the updated task in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// Define a route for handling DELETE requests to delete a specific task by ID
router.delete("/delete/:id", async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  // Use TaskModel to find and delete a task by its ID
  // Mongoose Method: TaskModel.findByIdAndDelete(id)
  // Description: This route handles HTTP DELETE requests and is responsible for deleting a specific task by its ID. It extracts the task ID from the request parameters and then uses the findByIdAndDelete() method, which is a Mongoose method, to find and delete the task by its ID. If the task is found and successfully deleted, it responds with a success message and the deleted task in JSON format. If the task is not found, it responds with a 404 error.
  await TaskModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.json({
          message: "Task deleted successfully",
          deletedTask: result,
        }); // Respond with a success message and the deleted task
      } else {
        res.status(404).json({ message: "Task not found" }); // Respond with a 404 error if the task is not found
      }
    })
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// Define a route for handling DELETE requests to delete all tasks
router.delete("/deleteAll", async (req, res) => {
  // Use TaskModel to delete all tasks in the database
  // Mongoose Method: TaskModel.deleteMany({})
  // Description: This route handles HTTP DELETE requests and is used to delete all tasks in the database. It uses the deleteMany() method, which is a Mongoose method, to delete all documents from the "tasks" collection. It responds with a success message and the count of deleted tasks in JSON format.
  await TaskModel.deleteMany({})
    .then((result) =>
      res.json({
        message: "All tasks deleted",
        deletedCount: result.deletedCount,
      })
    ) // Respond with a success message and the count of deleted tasks
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// Export the router for use in the main application
export default router;
