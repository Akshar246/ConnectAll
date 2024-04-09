// Import necessary modules
const express = require("express");
require("hbs");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

// MongoDB URL and database name
const mongoUrl =
  "mongodb+srv://sak246203:zK2CWa1fBmLwwiXs@cluster.y5dhwty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
const dbName = "ConnectAll";

app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(mongoUrl);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

async function connectDB() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  return db;
}

async function findDocuments(db, collectionName) {
  const collection = db.collection(collectionName);
  const findResult = await collection.find({}).toArray();
  console.log("Found documents:", findResult);
  return findResult;
}

// Main function to encapsulate the logic
async function main() {
  const db = await connectDB();

  // Example route to fetch documents from 'registration-data' collection
  app.get("/M00896814/Registration-data", async (req, res) => {
    try {
      const documents = await findDocuments(db, "registration-data");
      res.json(documents);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Error fetching documents.");
    }
  });

  // POST route to add a new user
  app.post("/M00896814/Registration-data", async (req, res) => {
    const { name, email, date, password } = req.body;

    if (!name || !email || !date || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const collection = db.collection("registration-data");
      // Check if email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const result = await collection.insertOne({
        name,
        email,
        date,
        password,
      });

      // Create JWT token after successful insertion
      const token = jwt.sign({ id: result.insertedId, email }, "shhh", {
        expiresIn: "1h",
      });

      await collection.updateOne(
        { _id: result.insertedId },
        { $set: { token: token } }
      );

      // Set the token in a HttpOnly cookie
      const option = {
        expires: new Date(new Date().getTime() + 36 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, option).json({
        message: `User added with id ${result.insertedId}`,
        token: token,
        user: {
          id: result.insertedId,
          name,
          email,
          date,
        },
      });
    } catch (error) {
      console.error("Failed to add user:", error);
      res.status(500).json({ message: "Failed to add user" });
    }
  });

  // PUT route to update an existing user's information
  app.put("/M00896814/Registration-data/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email, date, password } = req.body;

    try {
      const collection = db.collection("registration-data");

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, email, date, password } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).send("User not found or data not changed");
      }

      res.status(200).send(`User with id ${id} updated successfully`);
    } catch (error) {
      console.error("Failed to update user:", error);
      res.status(500).send("Failed to update user");
    }
  });

  app.delete("/M00896814/Registration-data/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const db = await connectDB();
      const collection = db.collection("registration-data");
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).send("User not found");
      }
      res.status(200).send(`User with id ${id} was deleted successfully`);
    } catch (error) {
      console.error("Failed to delete user:", error);
      res.status(500).send("Failed to delete user");
    }
  });

  // Login GET
  app.get("/M00896814/login", async (req, res) => {
    try {
      const documents = await findDocuments(db, "login-data");
      res.json(documents);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Error fetching documents.");
    }
  });

  app.post("/M00896814/login", async (req, res) => {
    console.log(
      "Login attempt started:",
      new Date().toISOString(),
      req.body.email
    ); // For debugging
    try {
      const { email, password } = req.body;
      const db = await connectDB();
      const usersCollection = db.collection("registration-data");
      const loginActivityCollection = db.collection("login-data");

      const user = await usersCollection.findOne({ email });

      if (!user) {
        console.log("User not found:", email);
      }

      // Correctly check the password against the stored password
      const validPassword = user.password === password; // This is a placeholder. Use password hashing in a real app
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Create token
      const token = jwt.sign({ id: user._id, email }, "shhh", {
        expiresIn: "1h",
      });

      const option = {
        expires: new Date(new Date().getTime() + 36 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      await usersCollection.updateOne(
        { _id: user._id },
        { $set: { token: token } }
      );

      await loginActivityCollection.insertOne({
        email,
        loginTime: new Date(),
        token,
        status: "Success",
      });

      // Send the cookie and the response
      res.cookie("token", token, option).json({
        success: true,
        token: token,
        user: { ...user, password: undefined },
      });
    } catch (error) {
      console.error("Failed to login:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // Logout post
  const logout = async (req, res) => {
    res.clearCookie("token");
    secure: "true";
    sameSite: "none";
    res.status(200).json({ message: "Successfully logged out" });
  };

  //Posting a message
  app.post("/post-message", upload.single("image"), async (req, res, next) => {
    try {
      const { message } = req.body;
      const image = req.file;

      if (typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ message: "Invalid message content." });
      }

      const collection = db.collection("posts");
      const result = await collection.insertOne({
        message,
        image: image ? image.path : null,
        createdAt: new Date(),
      });

      res
        .status(201)
        .json({ message: "Message posted successfully", result: result });
    } catch (err) {
      next(err);
    }
  });

  app.get("/post-message", async (req, res) => {
    try {
      const documents = await findDocuments(db, "posts");
      res.json(documents);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Error fetching documents.");
    }
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}
main().catch(console.error);
