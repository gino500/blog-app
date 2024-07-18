require("dotenv").config();
const mongoose = require("mongoose");

const mongodb = process.env.MONGODB_URI;

// Set up mongoose connection
mongoose.set("strictQuery", false);
main().catch(err => console.log(err));

async function main() {
  // Connect to the correct environment database
  if (process.env.NODE_ENV === "production") {
    await mongoose.connect(mongodb);
    if (mongoose.STATES.connected) console.log("PROD DB connected");
  } else {
    await mongoose.connect(mongodb);
    if (mongoose.STATES.connected) console.log("DEV DB connected");
  }
}
