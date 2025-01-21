import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as paymentService from "../services/payment";

export const uploadPayment = asyncHandler(async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const screenshotUrl = req.file?.path;

  if (!userId || !amount || !screenshotUrl) {
    throw new Error("All fields are required");
  }

  const result = await paymentService.createPayment(userId, amount, screenshotUrl);
  res.status(201).send(createResponse(result, "Payment uploaded successfully"));
});

export const updatePaymentStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await paymentService.updatePaymentStatus(id, status);
  res.status(200).send(createResponse(result, "Payment status updated successfully"));
});

export const getAllPayments = asyncHandler(async (req: Request, res: Response) => {
  const result = await paymentService.getAllPayments();
  res.status(200).send(createResponse(result, "Payments retrieved successfully"));
});

export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await paymentService.getPaymentById(id);
  res.status(200).send(createResponse(result, "Payment retrieved successfully"));
});