const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  image: { type: String },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", BlogSchema);
