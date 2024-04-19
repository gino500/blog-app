require("dotenv").config();
const mongoose = require("mongoose");

const devConnection = process.env.MONGODB_DEV;
const prodConnection = process.env.MONGODB_PROD;

// Set up mongoose connection
mongoose.set("strictQuery", false);
main().catch(err => console.log(err));

async function main() {
  // Connect to the correct environment database
  if (process.env.NODE_ENV === "production") {
    await mongoose.connect(prodConnection);
    if (mongoose.STATES.connected) console.log("PROD Database connected");
  } else {
    await mongoose.connect(devConnection);
    if (mongoose.STATES.connected) console.log("DEV Database connected");
  }
}
