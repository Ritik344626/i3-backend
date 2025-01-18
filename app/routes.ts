import express from "express";
import user from "./routes/user";


// routes
const router = express.Router();

router.use("/routes", user);

export default router;