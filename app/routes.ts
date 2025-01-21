import express from "express";
import user from "./routes/user";
import payment from "./routes/payment";


// routes
const router = express.Router();

router.use("/routes", user);
router.use("/payments", payment);
export default router;