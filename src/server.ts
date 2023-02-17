import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/users";
import { connectDB } from "./services/mongodb";
import { consumer } from "./services/consumer";
import { publisher } from "./services/publisher";

require("dotenv/config");

const router: Express = express();

router.use(morgan("dev"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

router.use((req, res, next) => {
  // CORS api rules
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

router.use("/", routes);

router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

router.listen(3030, () => {
  console.log("Server started!");
  connectDB();
  consumer("Temperature");
  publisher("Temperature");
});
