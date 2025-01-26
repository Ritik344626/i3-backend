import { check, validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { IUser } from "../schema/user";

export const validatePortfolioUpdate = [
  // Add validation rules
  check("paymentId").notEmpty().withMessage("Payment ID is required"),
  check("amount").isNumeric().withMessage("Amount must be a number"),

  // Handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
  
    if (!token) {
      throw createHttpError(401, { message: "Access Denied: No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Omit<IUser, "password">; ;
      req.user = decoded; // Add the user payload to the request object
      next();
    } catch (err) {
      throw createHttpError(401, { message: "Access Denied: Invalid token" });
    }
};