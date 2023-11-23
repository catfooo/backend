import mongoose from "mongoose";

const { Schema } = mongoose;

export const taskSchema = new Schema({
  // Define the 'task' field with a String data type
  // Simple config
  // task: String, // PLEASE AVOID THIS SIMPLE CONFIG APPROACH
  // Complex Object Config
  task: {
    type: String, // Specifies that 'task' should be a string
    required: true, // Indicates that 'task' is a required field
    minlength: 5, // Sets a minimum length of 5 characters for 'task'
  },
  done: {
    type: Boolean, // Specifies that 'done' should be a Boolean
    default: false, // Sets a default value of 'false' for 'done'
  },
  createdAt: {
    type: Date, // Specifies that 'createdAt' should be a Date
    default: Date.now, // Sets a default value to the current date and time
  },
});

// Create a Mongoose model named 'TaskModel' based on the 'taskSchema' for the 'tasks' collection
// This model is used to interact with the "tasks" collection in the MongoDB database. It allows you to perform CRUD operations on documents in that collection and provides methods for data validation based on the schema.
export const TaskModel = mongoose.model("tasks", taskSchema);
