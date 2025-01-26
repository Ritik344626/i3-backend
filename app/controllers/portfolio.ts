import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import * as portfolioService from "../services/portfolio";

export const createOrUpdatePortfolio = asyncHandler(async (req: Request, res: Response) => {
  const { userId, paymentId } = req.body;
  const portfolio = await portfolioService.createOrUpdatePortfolio(userId, paymentId);
  res.status(201).json({
    message: "Portfolio updated successfully",
    data: portfolio,
  });
});

export const getPortfolio = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const portfolio = await portfolioService.getPortfolioByUserId(userId);
  res.status(200).json({
    message: "Portfolio fetched successfully",
    data: portfolio,
  });
});
