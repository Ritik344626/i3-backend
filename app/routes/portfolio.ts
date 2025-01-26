import { Router } from "express";
import * as portfolioController from "../controllers/portfolio";
import { validatePortfolioUpdate, authenticateUser } from "../validators/portfolio";
const router = Router();

router
  .post("/", authenticateUser, validatePortfolioUpdate,portfolioController.createOrUpdatePortfolio) // Add payment to portfolio
  .get("/:userId", authenticateUser, validatePortfolioUpdate, portfolioController.getPortfolio); // Get portfolio by userId

export default router;
