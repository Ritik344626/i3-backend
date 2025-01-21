import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../common/config/cloudinary.config";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as paymentController from "../controllers/payment";
import * as paymentValidator from "../validators/payment";

const router = Router();

interface ExtendedParams {
    folder?: string;
    allowed_formats?: string[];
}
// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "payments",
      allowed_formats: ["jpg", "png", "jpeg"],
    } as ExtendedParams,
  });
const upload = multer({ storage });

router
  .post(
    "/",
    upload.single("screenshot"),
    paymentValidator.createPayment,
    catchError,
    paymentController.uploadPayment
  )
  .patch(
    "/:id/status",
    paymentValidator.updatePaymentStatus,
    catchError,
    paymentController.updatePaymentStatus
  )
  .get("/", catchError, paymentController.getAllPayments)
  .get("/:id", catchError, paymentController.getPaymentById);

export default router;