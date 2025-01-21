import PaymentModel, { IPayment } from "../schema/payment";

export const createPayment = async (
  userId: string,
  amount: number,
  screenshotUrl: string
): Promise<IPayment> => {
  const payment = await PaymentModel.create({
    userId,
    amount,
    screenshotUrl,
    status: "Pending",
  });
  return payment;
};

export const updatePaymentStatus = async (
  id: string,
  status: "Pending" | "Approved" | "Rejected"
): Promise<IPayment | null> => {
  const result = await PaymentModel.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  return result;
};

export const getAllPayments = async (): Promise<IPayment[]> => {
  const payments = await PaymentModel.find().lean();
  return payments;
};

export const getPaymentById = async (id: string): Promise<IPayment | null> => {
  const payment = await PaymentModel.findById(id).lean();
  return payment;
};