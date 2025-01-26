import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriptionHistory {
  paymentId: mongoose.Types.ObjectId; // Link to Payment Schema
  amount: number; // Payment amount
  startDate: Date; // Subscription start date
  endDate: Date; // Subscription end date
}

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId; // Link to User Schema
  totalActiveAmount: number; // Total active subscription amount
  subscriptionStatus: "ACTIVE" | "EXPIRED"; // Current subscription status
  subscriptionHistory: ISubscriptionHistory[]; // Array of past subscription details
  expiryDate: Date; // Overall subscription expiration date
}

const PortfolioSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    totalActiveAmount: { type: Number, default: 0 },
    subscriptionStatus: {
      type: String,
      enum: ["ACTIVE", "EXPIRED"],
      default: "EXPIRED",
    },
    subscriptionHistory: [
      {
        paymentId: { type: Schema.Types.ObjectId, ref: "Payment", required: true },
        amount: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
    expiryDate: { type: Date }, // Overall subscription expiry date
  },
  { timestamps: true }
);

export default mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
