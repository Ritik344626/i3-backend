import mongoose from "mongoose";
import PortfolioModel from "../schema/portfolio";
import PaymentModel from "../schema/payment";

export const createOrUpdatePortfolio = async (userId: string, paymentId: string) => {
  const payment = await PaymentModel.findById(paymentId);

  if (!payment) throw new Error("Payment not found");
  if (payment.status !== "Approved") throw new Error("Payment is not approved");

  const subscriptionDuration = 30; // Example: Each payment gives 30 days of subscription
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + subscriptionDuration);

  let portfolio = await PortfolioModel.findOne({ userId });

  if (!portfolio) {
    // Create a new portfolio if it doesn't exist
    portfolio = await PortfolioModel.create({
      userId : new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId,
      totalActiveAmount: payment.amount,
      subscriptionStatus: "ACTIVE",
      subscriptionHistory: [
        {
          paymentId : new mongoose.Types.ObjectId(paymentId), // Convert paymentId to ObjectId,
          amount: payment.amount,
          startDate,
          endDate,
        },
      ],
      expiryDate: endDate,
    });
  } else {
    // Update the existing portfolio
    portfolio.totalActiveAmount += payment.amount;
    portfolio.subscriptionHistory.push({
      paymentId : new mongoose.Types.ObjectId(paymentId), // Convert paymentId to ObjectId,
      amount: payment.amount,
      startDate,
      endDate,
    });
    portfolio.expiryDate = endDate; // Extend subscription
    portfolio.subscriptionStatus = "ACTIVE";
    await portfolio.save();
  }

  return portfolio;
};

export const getPortfolioByUserId = async (userId: string) => {
  const portfolio = await PortfolioModel.findOne({ userId }).populate("subscriptionHistory.paymentId");
  if (!portfolio) throw new Error("Portfolio not found for the user");
  return portfolio;
};
