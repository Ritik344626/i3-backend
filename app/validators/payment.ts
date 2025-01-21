import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const createPayment = [
  check("userId").notEmpty().withMessage("User ID is required"),
  check("amount").isNumeric().withMessage("Amount must be a number"),
  (req: Request, res: Response, next: NextFunction) => next(),
];

export const updatePaymentStatus = [
  check("status")
    .isIn(["Pending", "Approved", "Rejected"])
    .withMessage("Invalid payment status"),
  (req: Request, res: Response, next: NextFunction) => next(),
];