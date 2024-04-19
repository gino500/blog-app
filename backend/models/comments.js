const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  text: { type: String, required: true },
  like_count: { type: Number, default: 0 },
  date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);
