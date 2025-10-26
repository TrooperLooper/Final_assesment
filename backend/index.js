import express from "express";
import mongoose from "mongoose";
import { start } from "repl";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myfirstdatabase", {});
useNewUrlParser: true;
useUnifiedTopology: true;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  profilePictureUrl: String, //skriv filepath här - optional!
  createdAt: Date,
  updatedAt: Date,
});

const gameSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  category: String,
  createdAt: Date,
});

const gameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  playedSeconds: { type: Number },
  isActive: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

/* const Item = mongoose.model("Item", itemSchema);

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(updatedItem);
});

app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const deletedItem = await Item.findByIdAndDelete(id);
  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json({ message: "Item deleted successfully" });
});

*/

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
