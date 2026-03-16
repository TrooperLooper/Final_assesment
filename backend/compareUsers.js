import mongoose from "mongoose";
import fs from "fs";

// Load frontend users
const frontendUsers = JSON.parse(
  fs.readFileSync("./retrotimer.users.json", "utf8"),
);

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
  }),
);

async function compareUsers() {
  const backendUsers = await User.find({});
  frontendUsers.forEach((frontUser) => {
    const match = backendUsers.find(
      (backUser) => backUser.email === frontUser.email,
    );
    if (match) {
      console.log(
        `MATCH: ${frontUser.email} | Frontend: ${frontUser.firstName} ${frontUser.lastName} | Backend: ${match.firstName} ${match.lastName}`,
      );
    } else {
      console.log(
        `NOT FOUND IN BACKEND: ${frontUser.email} | ${frontUser.firstName} ${frontUser.lastName}`,
      );
    }
  });
  mongoose.disconnect();
}

compareUsers();
