import express from "express";
import user from "./routes/user";
import payment from "./routes/payment";
import portfolioRoutes from "./routes/portfolio";


// routes
const router = express.Router();

router.use("/routes", user);
router.use("/payments", payment);
router.use("/portfolios", portfolioRoutes); // Add portfolio routes
export default router;