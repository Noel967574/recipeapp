import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./config/dbConnection.js";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js";
import analyticsRoutes from "./routes/analytics.js";
import otpRoutes from "./routes/otp.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import {apiLimiter} from "./middleware/rateLimiter.js";
import logger from "./utils/logger.js";


// import logger from "./"

// creating an instance of express server
const app = express();
dotenv.config();

//defining PORT
const PORT = process.env.PORT || 3000;
if (process.env.ENV === "development") {
  app.use(morgan("dev"));
}

// integrate morgan into winston
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
}));


//defining the root route/endpoint
app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.use(express.json());

//CORS setup
app.use(cors());
// const allowedOrigins = ["http://localhost:5173"];

//configure server to serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//define routes
app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);

app.use("/api/analytics", analyticsRoutes);
app.use("/api", otpRoutes);



// call your app to listen to a PORT
dbConnection()
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`An error occurred while connecting to database: ${err}`);
  });



  