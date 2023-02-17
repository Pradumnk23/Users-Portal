import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import https from "https";
import fs from "fs";
import userRoutes from "./routes/route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "POST",
    allowedHeaders: "Content-Type",
  })
);
app.use(express.json());
app.get("/", (req, res) => res.send({ msg: "Server is running..." }));
app.use("/create", userRoutes);

const PORT = 4001;
const CONNECTION_URL =
  "mongodb+srv://Pradumn:Reset$123@cluster0.mm8bmot.mongodb.net/synopsysDB?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);

const options = {
  key: fs.readFileSync("./config/cert.key"),
  cert: fs.readFileSync("./config/cert.crt"),
};

https.createServer(options, app).listen(8090, () => {
  console.log("HTTPs is running ");
});
